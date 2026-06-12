import LoginPage from "../../pages/LoginPage";

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("OrangeHRM Login Feature - POM", () => {
  const loginPage = new LoginPage();

  let data;

  before(() => {
    cy.fixture("loginData").then((loginData) => {
      data = loginData;
    });
  });

  beforeEach(() => {
    loginPage.visit(data.url);
  });

  it("TC01 - Login with valid username and valid password", () => {
    loginPage.login(data.validUsername, data.validPassword);

    cy.url().should("include", "/dashboard");
  });

  it("TC02 - Login with valid username and invalid password", () => {
    loginPage.login(data.validUsername, data.invalidPassword);

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC03 - Login with invalid username and valid password", () => {
    loginPage.login(data.invalidUsername, data.validPassword);

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC04 - Login with empty username", () => {
    loginPage.enterPassword(data.validPassword);

    loginPage.clickLogin();

    cy.contains("Required").should("be.visible");
  });

  it("TC05 - Login with empty password", () => {
    loginPage.enterUsername(data.validUsername);

    loginPage.clickLogin();

    cy.contains("Required").should("be.visible");
  });

  it("TC06 - Login with empty username and password", () => {
    loginPage.clickLogin();

    cy.contains("Required").should("be.visible");
  });

  it("TC07 - Verify dashboard URL after successful login", () => {
    loginPage.login(data.validUsername, data.validPassword);

    cy.url().should(
      "eq",
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
  });

  it("TC08 - Logout after successful login", () => {
    loginPage.login(data.validUsername, data.validPassword);

    loginPage.clickUserDropdown();
    loginPage.clickLogout();

    cy.url().should("include", "/auth/login");
  });
});
