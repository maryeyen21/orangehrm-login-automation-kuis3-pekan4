class RecruitmentPage {
  openRecruitment() {
    cy.contains("Recruitment", {
      timeout: 15000,
    })
      .should("be.visible")
      .click();

    cy.url({
      timeout: 15000,
    }).should("include", "/recruitment");
  }

  searchCandidate(name) {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 15000,
    })
      .first()
      .clear()
      .type(name);
  }

  clickSearch() {
    cy.contains("Search", {
      timeout: 10000,
    })
      .should("be.visible")
      .click();
  }

  clickReset() {
    cy.contains("Reset", {
      timeout: 10000,
    })
      .should("be.visible")
      .click();
  }

  verifyTable() {
    cy.get(".oxd-table", {
      timeout: 15000,
    }).should("exist");
  }
}

export default new RecruitmentPage();
