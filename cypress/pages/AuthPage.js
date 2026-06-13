class AuthPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('input[name="username"]', {
      timeout: 10000,
    }).should("be.visible");
  }

  inputUsername(username) {
    cy.get('input[name="username"]')
      .should("be.visible")
      .clear()
      .type(username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]')
      .should("be.visible")
      .clear()
      .type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  login(username, password) {
    this.inputUsername(username);
    this.inputPassword(password);
    this.clickLogin();
  }

  logout() {
    cy.get(".oxd-userdropdown-tab", {
      timeout: 10000,
    }).click();

    cy.contains("Logout").click();
  }
}

export default new AuthPage();
