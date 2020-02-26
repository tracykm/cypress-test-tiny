import {
  collectionStub,
  fakeCollectionData,
  visitStubbedPortal
} from "../support/utils.js";

describe("Portal", () => {
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });

  it("works when connected to a collection", () => {
    visitStubbedPortal();
    cy.route({
      url: "api/v/3/allcollections/*",
      response: [
        {
          name: fakeCollectionData.collectionName,
          collectionID: "fakeAppleCollId"
        }
      ]
    });
    collectionStub();
    cy.wait(500);
    cy.get('[data-cy="addDS"]').click({ force: true });
    cy.get('[data-cy="selectDatasourceType"')
      .clear()
      .type("Coll");
    cy.get(`[data-cy="typeOption"]:eq(0)`).click();
    cy.get('[data-cy="save-ds"]')
      .first()
      .click();
    cy.wait(100);
  });

  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
  it("blank", () => {
    visitStubbedPortal();
    cy.get('[data-cy="addDS"]');
  });
});
