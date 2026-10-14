import droppablePage from "../../support/pages/DroppablePage";

Cypress.on("uncaught:exception", () => false);

describe("Droppable", () => {
  beforeEach(() => {
    droppablePage.visit();
  });

  it("drags the element into the drop target", () => {
    droppablePage.droppable.should("contain.text", "Drop Here");
    droppablePage.dragToTarget();
    droppablePage.verifyDropped();
  });
});
