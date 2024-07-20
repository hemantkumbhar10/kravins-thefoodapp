import { test, expect } from '@playwright/test'
import path from 'path';

const FRONTEND_URL = "http://localhost:5173";


test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator("[name='email']").fill("gmaster3@grubhub.com");
    await page.locator("[name='password']").fill("Pass@123");
    await page.getByRole('button', { name: 'Login' }).click();
})

test.afterEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']//ancestor::li//following-sibling::li").click();
    page.close();
})


test('should allow user to create post', async ({ page }) => {

    await page.getByText('Create Post').click();
    await page.locator("[name=title]").fill("This is personal test post title");
    await page.locator("[name=recipe]").fill("This is personal test post recipe or description whatever you call it");

    await page.setInputFiles("[name=postImages]", [
        path.join(__dirname, "files", "test1.jpg"),
        path.join(__dirname, "files", "test2.jpg"),
    ])

    await page.getByRole('button', { name: 'Create Post' }).click();
    await expect(page.getByText("Nom, Nom! Yummy post!")).toBeVisible();

})


test('should allow user to update post', async ({ page }) => {
    await expect(page.getByAltText('gmaster3')).toBeVisible();
    expect(page.locator("//*[@alt='gmaster3']//parent::div//parent::div/h2")).toHaveText("This is updated personal test post title");

    await page.locator("//*[@alt='gmaster3']//parent::div//parent::div/h2//following-sibling::div/p").click(); //See more button

    await page.locator("//*[contains(text(), 'This is updated personal test post recipe')]//parent::div/div/div/*[name()='svg']").click();

    await page.getByText('Edit').click();

    expect(page.locator("//form//preceding::h3")).toHaveText("Edit Post");

    await page.locator("[name=title]").fill("This is personal test post title");
    await page.locator("[name=recipe]").fill("This is personal test post recipe or description whatever you call it");
    await page.locator("//*[@alt='Post 1']//following-sibling::button").click();
    await page.getByRole('button', { name: 'Update Post' }).click();
    await expect(page.getByText("Post Updated!")).toBeVisible();
})


test('should allow user to delete post', async ({ page }) => {

    await expect(page.getByAltText('gmaster3')).toBeVisible();
    await page.locator("//*[@alt='gmaster3']//parent::div//parent::div/h2//following-sibling::div/p").click(); //See more button

    await page.locator("//*[contains(text(), 'dghdgdfgdfg')]//parent::div/div/div/*[name()='svg']").click();

    await page.locator("//*[text()='Edit']//parent::li//following-sibling::button").click();

    await page.locator("//*[text()='Are you sure you want to delete this post?']//following-sibling::button").click();


    await expect(page.getByText("Post Deleted!")).toBeVisible();
})



