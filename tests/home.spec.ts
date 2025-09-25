import { test, expect } from '@playwright/test';

// Basic end-to-end test for the homepage

test.describe('Homepage', () => {
  test('should search for the term "gang" and display Ganglands', async ({ page }) => {
    await page.goto('http://localhost:8080');
    const searchInput = page.locator('#searchInput');
    await expect(searchInput).toBeVisible();
  await searchInput.fill('gang');
  await searchInput.press('Enter');
  // Wait for the results to update
  await page.waitForTimeout(1000); // Adjust if debounce or network delay is longer
  // Check for Ganglands movie card
  const ganglandsCard = page.locator('.movie-title', { hasText: 'Ganglands' });
  await expect(ganglandsCard).toBeVisible();
  });
});
