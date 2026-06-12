class LoginPage {
  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  userDropdown = ".oxd-userdropdown-tab";

  visit(url) {
    cy.visit(url);
  }

  enterUsername(username) {
    cy.get(this.usernameField).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordField).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  clickUserDropdown() {
    cy.get(this.userDropdown).click();
  }

  clickLogout() {
    cy.contains("Logout").click();
  }
}

export default LoginPage;
