import { test, expect } from '@playwright/test';

const baseURL = process.env.TEST_BASE_URL || 'https://queue-management-taupe.vercel.app/';

test('Business Owner Login and Check Profile', async ({ page }) => {
  await page.goto(`${baseURL}`);
  
  // Click on Business Owner button
  await page.getByRole('button', { name: 'Business Owner' }).click();

  // Login
  await page.getByPlaceholder('Username').fill('PwTest');
  await page.getByPlaceholder('Password').fill('hackme11');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(`${baseURL}business`);
  await expect(page).toHaveURL(`${baseURL}business`);

  // Go to the profile page
  await page.getByText('Account').click();
  await page.getByRole('link', { name: 'Profile' }).click();

  await page.waitForURL(`${baseURL}business/profile`);
  await expect(page).toHaveURL(`${baseURL}business/profile`);

  // Have correct business name
  const element = page.locator('text="PwRestaurant"');
  await expect(element).toBeVisible();
  await expect(element).toHaveText('PwRestaurant');

});
