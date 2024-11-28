import { test, expect } from '@playwright/test'

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

test("should allow user to comment on the post", async ({ page }) => {
    await page.locator("//*[@aria-label='Toggle comments']").click();
    await expect(page.getByPlaceholder('Enter your comment here')).toBeVisible();
    await page.getByPlaceholder('Enter your comment here').fill("This is first comment");
    await page.getByRole('button', { name: 'Comment', exact: true }).click();
    await expect(
        page.locator("//*[text()='gmaster3']//parent::div//parent::div//parent::div/div[3]/div[last()]/div[1]/div[last()]/p")
    ).toBeVisible();
});


test("should allow user to update comment on the post", async ({ page }) => {
    await page.locator("//*[@aria-label='Toggle comments']").click();
    await page.locator("//*[text()='gmaster3']//parent::div//parent::div//parent::div/div[3]/div[last()]/div[1]/div[last()]/div[2]/div[2]/div/*[local-name()='svg']").click();
    await page.getByRole("button", {name: 'Edit'}).click();

    await expect(page.locator("//dialog/form//following-sibling::div/div/textarea")).toHaveText("This is first comment");
    await page.locator("//dialog/form//following-sibling::div/div/textarea").clear();
    await page.locator("//dialog/form//following-sibling::div/div/textarea").fill("This is updated comment");
    await page.getByRole("button", {name: 'Update'}).click();

    await expect(
        page.locator("//*[text()='gmaster3']//parent::div//parent::div//parent::div/div[3]/div[last()]/div[1]/div[last()]/p")
    ).toHaveText("This is updated comment");
});



test("should allow user to delete comment on the post", async ({ page }) => {
    await page.locator("//*[@aria-label='Toggle comments']").click();
    await page.locator("//*[text()='gmaster3']//parent::div//parent::div//parent::div/div[3]/div[last()]/div[1]/div[last()]/div[2]/div[2]/div/*[local-name()='svg']").click();
    await page.getByRole("button", {name: 'Delete'}).click();
});
