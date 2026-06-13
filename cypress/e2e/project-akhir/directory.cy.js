Cypress.on("uncaught:exception", () => {
  return false;
});

import AuthPage from "../../pages/AuthPage";
import DirectoryPage from "../../pages/DirectoryPage";

describe("OrangeHRM Directory Feature", () => {
  let data;

  before(() => {
    cy.fixture("orangehrmData").then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    AuthPage.visit();

    AuthPage.login(data.validUsername, data.validPassword);

    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    DirectoryPage.openDirectory();

    cy.url({ timeout: 10000 }).should("include", "/directory");

    cy.wait(3000);
  });

  it("TC01 - Open Directory Menu", () => {
    cy.url().should("include", "/directory");
  });

  it("TC02 - Verify Employee Search Field", () => {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 10000,
    }).should("be.visible");
  });

  it("TC03 - Search Employee", () => {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 10000,
    })
      .clear()
      .type("John");

    cy.contains("Search").click();

    cy.wait(3000);

    cy.contains("Records Found").should("be.visible");
  });

  it("TC04 - Reset Search", () => {
    cy.intercept("GET", "**/api/v2/directory/employees?limit=14&offset=0").as(
      "resetDirectory",
    );

    cy.get('input[placeholder="Type for hints..."]').type("John");

    cy.contains("Reset").click();

    cy.wait("@resetDirectory");

    cy.url().should("include", "/directory");
  });

  it("TC05 - Verify Employee Cards Display", () => {
    cy.contains("Records Found").should("be.visible");
  });

  it("TC06 - Search Invalid Employee", () => {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 10000,
    })
      .clear()
      .type("ABCDEFGXYZ123");

    cy.contains("Search").click();

    cy.wait(3000);

    cy.url().should("include", "/directory");
  });

  it("TC07 - Verify Job Title Dropdown", () => {
    cy.get(".oxd-select-text").first().click();

    cy.get(".oxd-select-dropdown").should("be.visible");
  });

  it("TC08 - Verify Directory URL", () => {
    cy.url().should("include", "/directory/viewDirectory");
  });
});
