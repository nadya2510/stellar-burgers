
describe('Интеграционные тесты для страницы конструктора бургера', () => {
  beforeEach(() => {   
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });    
    cy.visit('http://localhost:4000');    
  });

  it('Список ингредиентов загружен', () => {
    cy.get('[data-testid="burgerIngredient_bun"]').should('have.length.at.least', 1);
    cy.get('[data-testid="burgerIngredient_main"]').should('have.length.at.least', 1);
    cy.get('[data-testid="burgerIngredient_sauce"]').should('have.length.at.least', 1);
  });

  it('Добавление начинок из списка в конструктор', () => {
    cy.get('[data-testid="burgerIngredient_main"]:first button').click();
    cy.get('[data-testid="burgerConstructor_main"]').should('have.length', 1);
    cy.get('[data-testid="burgerIngredient_sauce"]:first button').click();
    cy.get('[data-testid="burgerConstructor_sauce"]').should('have.length', 1);
  });

  it('Добавление булки из списка в конструктор', () => {
    //Добавление
    cy.get('[data-testid="burgerIngredient_bun"]:first button').click();
    cy.get('[data-testid="burgerConstructor_bun"]').should('have.length', 2); 
    //Замена
    cy.get('[data-testid="burgerIngredient_bun"]:last button').click();
    cy.get('[data-testid="burgerConstructor_bun"]').should('have.length', 2); 
  }); 
    
  it('Открытие/ закрытие по крестику модального окна ингредиента', () => {
    //Открыли
    cy.get('[data-testid="burgerIngredient_bun"]:first a ').click();
    cy.get('[data-testid="modal"]').should('have.length', 1); 
    //Закрыли   
    cy.get('[data-testid="modalClose"]').click();
    cy.get('[data-testid="modal"]').should('have.length', 0); 
  });
 
  it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик', () => {
   // const text: string = cy.get('[data-testid="burgerIngredient_text"]:first').title;
    cy.get('[data-testid="burgerIngredient_bun"]:first a').click(); 
    cy.get('[data-testid="burgerIngredient_text"]:first').then((p) => {          
      cy.get('[data-testid="modal"]').contains(p.text())
    });    
  });

  it('Добавление начинок из списка в конструктор', () => {
    cy.get('[data-testid="burgerIngredient_main"]:first button').click();
    
  });
});  

describe('Создание заказа', () => {
    beforeEach(() => {   
      //Созданы моковые данные  
      cy.setCookie('accessToken', 'accessTokenTest');
      localStorage.setItem('refreshToken', 'refreshTokenTest');
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });    
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });     

      cy.visit('http://localhost:4000');    
    });

    it('Нельзя оформить пустой заказ', () => {
      cy.get('[data-testid="burgerConstructor"] button').should('be.disabled'); 
    });

    it('Оформить заказ', () => {
      cy.get('[data-testid="burgerIngredient_bun"]:first button').click();
      cy.get('[data-testid="burgerIngredient_main"]:first button').click();
      cy.get('[data-testid="burgerConstructor"] button').should('be.enabled'); 
      cy.get('[data-testid="burgerConstructor"] button').contains('Оформить заказ').click();
      cy.wait(1000);
      //Номер заказа проверяем
      cy.get('[data-testid="modal"] h2').contains('89557');
      cy.get('[data-testid="modalClose"]').click();
      //Конструктор пустой
      cy.get('[data-testid="burgerConstructor"]').contains('Выберите булки');
      cy.get('[data-testid="burgerConstructor"]').contains('Выберите начинку');
    
    });
    
    afterEach(() => {      
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  })

