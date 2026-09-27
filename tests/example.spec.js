const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await loginPage.expectSuccessfulLogin();
});

test('user cannot log in with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('tomsmith', 'wrongpassword');
  await loginPage.expectFailedLogin('Your password is invalid!');
});

test('user cannot log in with invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wronguser', 'SuperSecretPassword!');
  await loginPage.expectFailedLogin('Your username is invalid!');
});
