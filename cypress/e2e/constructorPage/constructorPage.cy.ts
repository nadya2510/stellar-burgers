const burgerConstructor = '[data-testid="burgerConstructor"]';
const burgerConstructorBun = '[data-testid="burgerConstructor_bun"]';
const burgerConstructorMain = '[data-testid="burgerConstructor_main"]';
const burgerConstructorSauce = '[data-testid="burgerConstructor_sauce"]';

const ingredient_bun = '[data-testid="burgerIngredient_bun"]';
const ingredient_main = '[data-testid="burgerIngredient_main"]';
const ingredient_sauce = '[data-testid="burgerIngredient_sauce"]';
const modalClose = '[data-testid="modalClose"]';
const modal = '[data-testid="modal"]';
describe('Интеграционные тесты для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список ингредиентов загружен', () => {
    cy.get(ingredient_bun).should('have.length.at.least', 1);
    cy.get(ingredient_main).should('have.length.at.least', 1);
    cy.get(ingredient_sauce).should('have.length.at.least', 1);
  });

  it('Добавление начинок из списка в конструктор', () => {
    cy.get(`${ingredient_main}:first button`).click();
    cy.get(burgerConstructorMain).should('have.length', 1);
    cy.get(`${ingredient_sauce}:first button`).click();
    cy.get(burgerConstructorSauce).should('have.length', 1);
  });

  it('Добавление булки из списка в конструктор', () => {
    //Добавление
    cy.get(`${ingredient_bun}:first button`).click();
    cy.get(burgerConstructorBun).should('have.length', 2);
    //Замена
    cy.get(`${ingredient_bun}:last button`).click();
    cy.get(burgerConstructorBun).should('have.length', 2);
  });

  it('Открытие/ закрытие по крестику модального окна ингредиента', () => {
    //Открыли
    cy.get(`${ingredient_bun}:first a`).click();
    cy.get(modal).should('have.length', 1);
    //Закрыли
    cy.get(modalClose).click();
    cy.get(modal).should('have.length', 0);
  });

  it('Закрытие по клику на оверлей модального окна ингредиента', () => {
    cy.get(`${ingredient_bun}:first a`).click();
    cy.get('#modals div').last().click({ force: true });    
    cy.get(modal).should('have.length', 0);
  });

  it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик', () => {
    // const text: string = cy.get('[data-testid="burgerIngredient_text"]:first').title;
    cy.get(`${ingredient_bun}:first a`).click();
    cy.get('[data-testid="burgerIngredient_text"]:first').then((p) => {
      cy.get(modal).contains(p.text());
    });
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

    cy.visit('/');
  });

  it('Нельзя оформить пустой заказ', () => {
    cy.get(`${burgerConstructor} button`).should('be.disabled');
  });

  it('Оформить заказ', () => {
    cy.get(`${ingredient_bun}:first button`).click();
    cy.get(`${ingredient_main}:first button`).click();
    cy.get(`${burgerConstructor} button`).should('be.enabled');
    cy.get(`${burgerConstructor} button`).contains('Оформить заказ').click();
    cy.wait(1000);
    //Номер заказа проверяем
    cy.get(`${modal} h2`).contains('89557');
    cy.get(modalClose).click();
    //Конструктор пустой
    cy.get(burgerConstructor).contains('Выберите булки');
    cy.get(burgerConstructor).contains('Выберите начинку');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
