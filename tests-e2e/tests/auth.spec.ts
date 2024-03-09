import { test, expect } from '@playwright/test'

const FRONTEND_URL = "http://localhost:5173";


test('should allow user to sign up', async ({ page }) => {

    await page.goto(FRONTEND_URL);

    const testEmail = `testFirstName${Math.floor(Math.random() * 8000) +1000}@email.com`
    const testUsername = `test${Math.floor(Math.random() * 8000) +1000}`

    await page.getByRole('link', { name: 'Login' }).click();

    await expect(page.getByText('Login').first()).toBeVisible();

    await page.locator("//span[text()='Register']").click();

    await page.locator("[name='firstname']").fill('testFirstName');

    await page.locator("[name='lastname']").fill("testLastName");

    await page.locator("[name='email']").fill(testEmail);

    await page.locator("[name='username']").fill(testUsername);

    await page.locator("[name='password']").fill("Test@123");

    await page.locator("[name='confirmPassword']").fill("Test@123");

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Registration Successfull!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Post' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kravins' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible();
})

test('should allow user to log in', async ({ page }) => {

    await page.goto(FRONTEND_URL);

    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByText('Login').first()).toBeVisible();
    await page.locator("[name='email']").fill("testFirstName@testLastName.com");
    await page.locator("[name='password']").fill("Test@123");
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Welcome to Kravins!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Post' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kravins' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible();
})

