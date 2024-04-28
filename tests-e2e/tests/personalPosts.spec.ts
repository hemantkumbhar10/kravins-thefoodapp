import { test, expect } from '@playwright/test'
import path from 'path';

const FRONTEND_URL = "http://localhost:5173";


test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator("[name='email']").fill("testFirstName5767@email.com");
    await page.locator("[name='password']").fill("Test@123");
    await page.getByRole('button', { name: 'Login' }).click();
})

test.afterEach(async({page})=>{
    await page.goto(FRONTEND_URL);
    await page.getByRole('button', { name: 'Log out' }).click();
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

    await page.getByRole('button', {name: 'Create Post'}).click();
    await expect(page.getByText("Nom, Nom! Yummy post!")).toBeVisible();

})