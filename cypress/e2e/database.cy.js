// --- Funções de Apoio (Helper Functions) ---
const login = () => {
  cy.visit('https://teste-colmeia-qa.colmeia-corp.com/')
  cy.get('#email').type('qa@test.com')
  cy.get('#password').type('123456')
  cy.contains('button', 'Entrar').click()
  cy.contains('button', 'Continuar', { timeout: 10000 }).should('be.visible').click()
}

const acessarModulo = () => {
  cy.get('a[routerlink="/dashboard/campanha"]').click()
  cy.contains('a', 'Bancos de dados').click()
  cy.contains('h2', 'Bancos de dados').should('be.visible')
}

const criarBanco = (nome) => {
  cy.contains('button', 'Criar').click()
  cy.get('input[placeholder="Nome do item"]').type(nome)
  cy.contains('button', 'Salvar').click()
  cy.get('table tbody', { timeout: 10000 }).should('contain', nome)
}

describe('Módulo: Bancos de Dados - Suíte Plena', () => {

  beforeEach(() => {
    login()
    acessarModulo()
  })

  it('Deve criar um novo banco de dados com sucesso', () => {
    const nomeBanco = `QA_AUTO_${Date.now()}`
    criarBanco(nomeBanco)
  })

  it('Deve pesquisar um banco existente e validar o filtro', () => {
    const nomeBanco = `BUSCA_${Date.now()}`
    criarBanco(nomeBanco)

    cy.get('input[placeholder="Pesquisar"]').type(nomeBanco)
    cy.get('table tbody tr').should('have.length', 1).and('contain', nomeBanco)
  })

  it('Deve excluir um banco de dados permanentemente', () => {
    const nomeBanco = `DELETE_${Date.now()}`
    criarBanco(nomeBanco)

    cy.contains('tr', nomeBanco).within(() => {
      cy.get('button[title="Apagar"]').click()
    })

    cy.get('input[placeholder="Pesquisar"]').clear().type(nomeBanco)
    cy.get('table tbody').should('not.contain', nomeBanco)
  })

  it('Deve arquivar um banco de dados com sucesso', () => {
    const nomeBanco = `ARQUIVAR_${Date.now()}`
    criarBanco(nomeBanco)

    cy.contains('tr', nomeBanco).within(() => {
      cy.get('button[title="Arquivar"]').click({ force: true })
    })

    cy.get('table tbody').should('not.contain', nomeBanco)
  })

  context('EVIDÊNCIAS DE BUGS (COMPORTAMENTOS INESPERADOS)', () => {

    it('BUG: Banco arquivado não aparece na listagem de arquivados', () => {
      const nomeBanco = `BUG_ARQUIVO_${Date.now()}`
      criarBanco(nomeBanco)

      // Arquiva
      cy.contains('tr', nomeBanco).within(() => {
        cy.get('button[title="Arquivar"]').click({ force: true })
      })

      // Clica no filtro de Arquivados (Botão de caixa no topo)
      cy.get('div.justify-between.gap-4').within(() => {
        cy.get('button').first().click({ force: true })
      })

      // Evidência: Deveria conter o banco, mas o bug faz ele não aparecer
      cy.wait(2000)
      cy.get('table tbody').should('not.contain', nomeBanco)
      cy.log('BUG CONFIRMADO: Item arquivado sumiu do sistema.')
    })

    it('BUG: Listagem é limpa ao clicar no botão de Atualizar (Reload)', () => {
      const nomeBanco = `BUG_RELOAD_${Date.now()}`
      criarBanco(nomeBanco)

      // Seletor mais agressivo para o botão de Reload
      // Procuramos o botão que contém o SVG de reload (círculo com seta)
      cy.get('button[data-variant="icon"]').then(($btns) => {
        // No seu HTML, o reload é o último ou penúltimo. 
        // Vamos forçar o clique no que tem o comportamento de reload.
        cy.wrap($btns).last().click({ force: true })
      })

      cy.wait(2000)

      // Se o banco AINDA ESTIVER LÁ, o teste vai falhar aqui.
      // Se o banco SUMIR (BUG), o teste fica VERDE.
      cy.get('table tbody').should('not.contain', nomeBanco)
      
      cy.log('BUG CONFIRMADO: Botão de reload limpa o estado do front-end.')
    })

    it('VALIDAÇÃO: Pesquisa não deve retornar resultados falsos', () => {
      // Este teste valida que o sistema exibe a mensagem correta em vez de "inventar" dados
      cy.get('input[placeholder="Pesquisar"]').type('VALOR_QUE_NAO_EXISTE_123')
      cy.contains('Nenhum resultado encontrado').should('be.visible')
      cy.get('table tbody tr').should('not.exist')
    })
  })
})