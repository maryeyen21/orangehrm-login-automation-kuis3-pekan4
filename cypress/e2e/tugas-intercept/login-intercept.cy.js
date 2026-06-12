Cypress.on("uncaught:exception", () => {
  return false;
});

describe("OrangeHRM Login Feature - Intercept", () => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  const username = "Admin";
  const password = "admin123";

  beforeEach(() => {
    cy.visit(url);
  });

  it("TC01 - Login valid", () => {
    cy.intercept("POST", "**/auth/validate").as("loginRequest");

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 302);

    cy.url().should("include", "/dashboard");
  });

  it("TC02 - Invalid password", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidPassword");

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type("wrong123");
    cy.get('button[type="submit"]').click();

    cy.wait("@invalidPassword");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC03 - Invalid username", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidUsername");

    cy.get('input[name="username"]').type("WrongAdmin");
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@invalidUsername");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC04 - Empty username", () => {
    cy.intercept("POST", "**/auth/validate").as("emptyUsername");

    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC05 - Empty password", () => {
    cy.intercept("POST", "**/auth/validate").as("emptyPassword");

    cy.get('input[name="username"]').type(username);
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC06 - Empty username and password", () => {
    cy.intercept("POST", "**/auth/validate").as("emptyBoth");

    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC07 - Verify Dashboard API", () => {
    cy.intercept("GET", "**/dashboard/**").as("dashboardApi");

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@dashboardApi");

    cy.url().should("include", "/dashboard");
  });

  it("TC08 - Logout", () => {
    cy.intercept("GET", "**").as("dashboardLoaded");

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@dashboardLoaded");

    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("Logout").click();

    cy.url().should("include", "/auth/login");
  });
});
