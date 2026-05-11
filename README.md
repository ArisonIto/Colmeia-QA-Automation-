# 🐝 QA Automation Challenge - Colmeia

Este repositório contém a suíte de testes automatizados desenvolvida para o processo seletivo de **Analista de Testes**. O objetivo foi explorar a aplicação Colmeia, validar funcionalidades críticas e documentar bugs utilizando **Cypress**.

## 🛠️ Tecnologias e Boas Práticas
* **Framework:** Cypress 15.x
* **Linguagem:** JavaScript (ES6+)
* **Padrões:** Custom Commands e Hooks para otimização de testes.

## 🐛 Bugs Identificados e Automatizados
Durante a análise, foram detectadas e cobertas as seguintes falhas:
1. **Falha na Autenticação:** Mensagem de erro "Login incorreto" permitindo acesso via botão "Continuar".
<img width="1090" height="503" alt="image" src="https://github.com/user-attachments/assets/af7e8d44-8f10-42e0-9086-46d46a9ce01f" />

2. **Regressão de Dados (Reload):** Perda de persistência na listagem ao atualizar a página.

<img width="1586" height="275" alt="image" src="https://github.com/user-attachments/assets/a4b02486-90c3-46e1-9958-be9c027698b3" />
<img width="1595" height="266" alt="image" src="https://github.com/user-attachments/assets/040e857f-1f72-4213-8285-f088f7b48701" />

3. **Falha de UI (Dropdown):** Menu de perfil não expande, impossibilitando o logout.
<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/e3faa2b7-b0f7-430a-8b0e-232451068815" />

4. **Inconsistência de Filtro:** Itens arquivados não aparecem corretamente na listagem filtrada.

<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/b6684461-10bc-4dfe-9260-540760a575cd" />
<img width="1568" height="309" alt="image" src="https://github.com/user-attachments/assets/7da2b4b0-be1c-498d-909a-edf299079f9e" />
<img width="1581" height="420" alt="image" src="https://github.com/user-attachments/assets/99aa598e-e059-45a9-81cd-2862de785fbb" />


## 🚀 Como Executar
1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Use `npx cypress open` para abrir a interface ou `npx cypress run` para modo headless.
