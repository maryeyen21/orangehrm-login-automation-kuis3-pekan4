Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Cannot read properties of undefined")) {
    return false;
  }
});

describe("OrangeHRM Login Feature", () => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const validUsername = "Admin";
  const validPassword = "admin123";

  beforeEach(() => {
    cy.visit(url);
    cy.get('input[name="username"]').should("be.visible");
  });

  it("TC01 - Login with valid username and valid password", () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");
  });

  it("TC02 - Login with valid username and invalid password", () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type("wrongPassword");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC03 - Login with invalid username and valid password", () => {
    cy.get('input[name="username"]').type("WrongAdmin");
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC04 - Login with empty username", () => {
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC05 - Login with empty password", () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC06 - Login with empty username and password", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC07 - Verify dashboard URL after successful login", () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should(
      "eq",
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
  });

  it("TC08 - Logout after successful login", () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("Logout").click();

    cy.url().should("include", "/auth/login");
  });
});
