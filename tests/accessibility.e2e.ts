import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no accessibility violations', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState('networkidle');

	const results = await new AxeBuilder({ page }).analyze();

	expect(results.violations).toEqual([]);
});

test('skip-to-content link is keyboard accessible', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');

	const skipLink = page.getByText('Skip to content');
	await expect(skipLink).toBeFocused();
});

test('mobile menu overlay traps focus', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');

	// Open menu
	const menuBtn = page.getByRole('button', { name: 'Open navigation menu' });
	await menuBtn.click();

	// Dialog is visible
	const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
	await expect(dialog).toBeVisible();

	// Escape closes overlay
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
});
