Cypress.Commands.add('loginColmeia', (email, password) => {
  cy.visit('https://teste-colmeia-qa.colmeia-corp.com/')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.contains('button', 'Entrar').click()
  
  // Lida com o bug do login (aquele modal de erro falso)
  cy.contains('button', 'Continuar', { timeout: 10000 }).should('be.visible').click()
  
  // Garante que estamos no dashboard antes de começar o teste
  cy.url().should('include', '/dashboard')
})