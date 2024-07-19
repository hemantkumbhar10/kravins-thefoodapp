
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


test('should allow user to search friends', async ({ page }) => {
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();
    await page.locator("//li[text()='Friends']").click();

    await page.getByText('Find People').click();
    await page.getByPlaceholder('Search for friends by name or email').fill('john');
    await page.locator("//button[text()='Search']").click();
    const user = await page.getByText('John Doe');
    await expect(user).toBeVisible();
});



test('should allow user to add a friend', async ({ page }) => {
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();
    await page.locator("//li[text()='Friends']").click();

    await page.getByText('Find People').click();
    await page.getByPlaceholder('Search for friends by name or email').fill('john');
    await page.locator("//button[text()='Search']").click();
    const user = await page.getByText('John Doe');
    await expect(user).toBeVisible();
    await page.getByText('Add friend').click();
    await expect(await page.getByText('@jdoe1 is your friend now!')).toBeVisible();
})


test('should allow user to unfriend a friend', async ({ page }) => {
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();
    await page.locator("//li[text()='Friends']").click();

    await page.getByText('Find People').click();
    await page.getByPlaceholder('Search for friends by name or email').fill('john');
    await page.locator("//button[text()='Search']").click();
    const user = await page.getByText('John Doe');
    await expect(user).toBeVisible();

    await page.locator("//button[@aria-label='Delete Friend']").click();
    await expect(await page.getByText('Add friend')).toBeVisible();
})


