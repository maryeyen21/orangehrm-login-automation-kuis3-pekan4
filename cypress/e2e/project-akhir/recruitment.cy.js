Cypress.on("uncaught:exception", () => {
  return false;
});

import AuthPage from "../../pages/AuthPage";
import RecruitmentPage from "../../pages/RecruitmentPage";

describe("OrangeHRM Recruitment Feature", () => {
  let data;

  before(() => {
    cy.fixture("orangehrmData").then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(() => {
    cy.clearCookies();

    cy.clearLocalStorage();

    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      {
        timeout: 30000,
      },
    );

    cy.get('input[name="username"]', {
      timeout: 20000,
    }).should("be.visible");

    AuthPage.login(data.validUsername, data.validPassword);

    cy.url({
      timeout: 20000,
    }).should("include", "/dashboard");

    RecruitmentPage.openRecruitment();
  });

  // TC01
  it("TC01 - Open Recruitment Menu", () => {
    cy.url().should("include", "/recruitment");
  });

  // TC02
  it("TC02 - Verify Candidate Search Field", () => {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 15000,
    })
      .first()
      .should("be.visible");
  });

  // TC03
  it("TC03 - Search Candidate", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**").as(
      "searchCandidate",
    );

    RecruitmentPage.searchCandidate("a");

    RecruitmentPage.clickSearch();

    cy.wait("@searchCandidate").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/recruitment");
  });

  // TC04
  it("TC04 - Reset Candidate Search", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates**").as(
      "resetCandidate",
    );

    RecruitmentPage.searchCandidate("Admin");

    RecruitmentPage.clickReset();

    cy.wait("@resetCandidate").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/recruitment");
  });

  // TC05
  it("TC05 - Verify Search Button", () => {
    cy.contains("Search").should("be.visible");
  });

  // TC06
  it("TC06 - Verify Reset Button", () => {
    cy.contains("Reset").should("be.visible");
  });

  // TC07
  it("TC07 - Verify Candidate Table Display", () => {
    RecruitmentPage.verifyTable();
  });

  // TC08
  it("TC08 - Verify Recruitment URL", () => {
    cy.url().should("include", "/recruitment/viewCandidates");
  });
});
