import AuthPage from "../../pages/AuthPage";

describe("OrangeHRM Login Feature", () => {
  let data;

  before(() => {
    cy.fixture("orangehrmData").then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(() => {
    AuthPage.visit();

    cy.get('input[name="username"]', {
      timeout: 10000,
    }).should("be.visible");
  });

  it("TC01 - Login with valid username and password", () => {
    cy.intercept("POST", "**/auth/validate").as("loginValid");

    AuthPage.login(data.validUsername, data.validPassword);

    cy.wait("@loginValid");

    cy.url().should("include", "/dashboard");
  });

  it("TC02 - Login with invalid password", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidPassword");

    AuthPage.login(data.validUsername, data.invalidPassword);

    cy.wait("@invalidPassword");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC03 - Login with invalid username", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidUsername");

    AuthPage.login(data.invalidUsername, data.validPassword);

    cy.wait("@invalidUsername");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC04 - Login with empty username", () => {
    cy.get('input[name="password"]').type(data.validPassword);

    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC05 - Login with empty password", () => {
    cy.get('input[name="username"]').type(data.validUsername);

    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC06 - Login with empty username and password", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC07 - Verify dashboard URL after successful login", () => {
    AuthPage.login(data.validUsername, data.validPassword);

    cy.url().should("include", "/dashboard");
  });

  it("TC08 - Logout after successful login", () => {
    AuthPage.login(data.validUsername, data.validPassword);

    cy.get(".oxd-userdropdown-tab", {
      timeout: 10000,
    }).click();

    cy.contains("Logout").click();

    cy.url({
      timeout: 15000,
    }).should("include", "/auth/login");
  });
});
