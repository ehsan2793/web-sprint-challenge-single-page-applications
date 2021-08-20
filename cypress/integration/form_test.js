describe("testing the inout on the pizza form",()=>{
beforeEach(()=>{
cy.visit('http://localhost:3000/pizza')

})
it("add test to inputs",()=>{
   
    cy.visit('http://localhost:3000/pizza')

    cy.get('[data-cy=sauce]').check().should('be.checked')
    cy.get('[data-cy=name-input]').type('name').should("have.value",'name')
    cy.get('[data-cy=instructions]').type('i want my order to be ...').should("have.value",'i want my order to be ...')

    cy.get('[data-cy="size"]').select('Large')



    cy.get('[data-cy="topping1"]').check().should('be.checked')
    cy.get('[data-cy="topping2"]').check().should('be.checked')
    cy.get('[data-cy="topping3"]').check().should('be.checked')
    cy.get('[data-cy="topping4"]').check().should('be.checked')


    cy.get('[data-cy="submit"]').click()
})

})