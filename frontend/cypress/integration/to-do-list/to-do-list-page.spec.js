describe('To do liist IU', () => {
    it('Deve adicionar uma nova tarefa', () => {
        cy.visit('/');
        cy.get('[data-cy=task-add]').type('Tarefa de teste');
        cy.get('[data-cy=task-category]').select('Criatividade');
        cy.get('[data-cy=btn-add-task]').click();
    });
});

/*
Cypress.Commands.add('visitPage', (page) => {
        cy.visit(page);       
    });

    Cypress.Commands.add('addTask', (task, category) => {
        cy.get('[data-cy=task-add]').type(task);
        cy.get('[data-cy=task-category]').select(category);
        cy.get('[data-cy=btn-add-task]').click();       
    });

    it('Deve adicionar uma nova tarefa', () => {
        cy.visitPage('/');
        cy.addTask('Teste Um', 'Dinheiro');
        cy.addTask('Teste dois', 'Padrão');
    });
*/