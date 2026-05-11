describe('Colmeia Forms', () => {

  it('Deve acessar a tela do Colmeia Forms', () => {

    cy.visit('https://teste-colmeia-qa.colmeia-corp.com/')

    cy.get('#email').type('qa@test.com')
    cy.get('#password').type('123456')

    cy.contains('button', 'Entrar').click()
    cy.contains('button', 'Continuar').click()

    cy.get('a[routerlink="/dashboard/campanha"]').click()

    cy.contains('a', 'Colmeia Forms').click()

    cy.url().should('include', 'forms')
  })

})