class DirectoryPage {
  openDirectory() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory",
    );

    cy.url().should("include", "/directory");
  }

  searchEmployee(employeeName) {
    cy.get('input[placeholder="Type for hints..."]', {
      timeout: 10000,
    })
      .should("be.visible")
      .clear()
      .type(employeeName);

    cy.contains("Search").click();
  }

  resetSearch() {
    cy.contains("Reset").click();
  }
}

export default new DirectoryPage();
