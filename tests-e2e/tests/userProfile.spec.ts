import { test, expect } from '@playwright/test'
import path from 'path';

const FRONTEND_URL = "http://localhost:5173";

const expectedImg = "https://res.cloudinary.com/dl77ic1lh/image/upload/v1714472761/kravinsAvatars/selfloveorange_mhs2sb.jpg"


test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator("[name='email']").fill("eminem@email.com");
    await page.locator("[name='password']").fill("Pass@123");
    await page.getByRole('button', { name: 'Login' }).click();
})

test.afterEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']//ancestor::li//following-sibling::li").click();
    page.close();
})


test('should allow user to update their profile info', async ({ page }) => {

    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();
    await expect(page.getByText("Eminem jamal")).toBeVisible();
    await page.locator("[name='firstname']").fill('Eminem');

    await page.locator("[name='lastname']").fill("jamal");
    await page.locator("[name='email']").fill('eminem@email.com');
    await page.locator("[name='username']").fill('amy&nem');
    page.getByRole('button', { name: 'Update' }).click(),

        await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();

    await expect(page.getByText("Eminem jamal")).toBeVisible();
    await expect(page.getByText("amy&nem")).toBeVisible();
    const firstname = await page.locator("[name='firstname']").inputValue();
    await expect(firstname).toBe('Eminem')
    const lastname = await page.locator("[name='lastname']").inputValue();
    await expect(lastname).toBe('jamal')
    const email = await page.locator("[name='email']").inputValue();
    await expect(email).toBe('eminem@email.com')
    const username = await page.locator("[name='username']").inputValue();
    await expect(username).toBe('amy&nem')

})


test('should allow user to change their avatar', async ({ page }) => {
    await page.getByAltText('user profile avatar').click();
    await page.locator("//*[@href='/myProfile']").click();
    await expect(page.getByText("Eminem jamal")).toBeVisible();

    await page.locator("//*[text()='Change Avatar']//parent::div/img//parent::div").click();
    await expect(page.getByText("Choose Your Avatar")).toBeVisible();

    // const num = Math.floor(Math.random() * 10) + 1;

    await page.locator(`//h3[text()='Choose Your Avatar']//following-sibling::div/div/img[6]`).click();
    await page.locator("//*[text()='Update Avatar']").click();

    const actualImg = await page.locator("//*[text()='Change Avatar']//parent::div/img").getAttribute('src');

    await expect(actualImg).toBe(expectedImg);

})