const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.successMessage = page.locator('.flash.success');
    this.errorMessage = page.locator('.flash.error');
    this.heading = page.locator('h2');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/\/secure$/);
    await expect(this.heading).toContainText('Secure Area');
    await expect(this.successMessage).toContainText('You logged into a secure area!');
  }

  async expectFailedLogin(message = 'Your password is invalid!') {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.errorMessage).toContainText(message);
  }
}

module.exports = { LoginPage };
