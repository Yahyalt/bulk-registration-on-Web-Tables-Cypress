class DroppablePage {
  draggableSelector = "#simpleDropContainer #draggable";
  droppableSelector = "#simpleDropContainer #droppable";

  get draggable() {
    return cy.get(this.draggableSelector);
  }
  get droppable() {
    return cy.get(this.droppableSelector);
  }

  visit() {
    cy.visit("/droppable");
  }

  dragToTarget() {
    this.draggable.invoke("attr", "style").as("styleBefore");
    this.draggable.realMouseDown({ position: "center" });
    this.droppable.realMouseMove(10, 10);
    this.droppable.realMouseMove(20, 20);
    this.droppable.realMouseUp();
  }

  verifyDropped() {
    this.droppable.should("contain.text", "Dropped!");
    this.draggable.invoke("attr", "style").then((after) => {
      cy.get("@styleBefore").should("not.eq", after);
    });
  }
}

export default new DroppablePage();
