describe("Platzi API Automation", () => {
  const baseUrl = "https://api.escuelajs.co/api/v1";

  it("TC01 - Get All Categories", () => {
    cy.request(`${baseUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it("TC02 - Get Category By ID", () => {
    cy.request(`${baseUrl}/categories/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
    });
  });

  it("TC03 - Get All Products", () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it("TC04 - Verify First Product Has ID", () => {
    cy.request(`${baseUrl}/products?offset=0&limit=1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].id).to.exist;
    });
  });

  it("TC05 - Get Users", () => {
    cy.request(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it("TC06 - Get User By ID", () => {
    cy.request(`${baseUrl}/users/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
    });
  });

  it("TC07 - Create Category", () => {
    const randomName = `QA-${Date.now()}`;

    cy.request("POST", `${baseUrl}/categories`, {
      name: randomName,
      image: "https://picsum.photos/200",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(randomName);
    });
  });

  it("TC08 - Update Category", () => {
    cy.request("PUT", `${baseUrl}/categories/1`, {
      name: "Updated Category",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("TC09 - Verify Categories Response Type", () => {
    cy.request(`${baseUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("TC10 - Verify Category Has Name", () => {
    cy.request(`${baseUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].name).to.exist;
    });
  });

  it("TC11 - Get Products With Offset", () => {
    cy.request(`${baseUrl}/products?offset=0&limit=5`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.eq(5);
    });
  });

  it("TC12 - Get Products By Category", () => {
    cy.request(`${baseUrl}/categories/1/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});
