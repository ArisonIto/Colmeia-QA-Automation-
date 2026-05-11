describe('Módulo: Perfil', () => {
  beforeEach(() => {
    // Agora você usa apenas uma linha!
    cy.loginColmeia('qa@test.com', '123456')
  })

  it('BUG: Deve evidenciar que o dropdown do perfil não abre', () => {
    cy.get('header div:nth-child(2) button').click({ force: true })
    cy.wait(1000)
    cy.contains('Sair').should('be.visible')
  })
})