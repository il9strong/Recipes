const request = require('supertest');
const server = require('../app');

describe('POST /categories', () => {
  test('responds with 200 and category data when category is created', async () => {
    const response = await request(server)
      .post('/categories')
      .send({ name: "New Category" });
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Категория успешно создана');
    expect(response.body.requestBody).toBeDefined();
  });

  test('responds with 404 when category creation fails', async () => {
    const response = await request(server)
      .post('/categories')
      .send({ name: "" });
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

describe('GET /categories/:id', () => {
  test('responds with 200 and category data when category is found', async () => {
    const categoryId = 1;
    const response = await request(server)
      .get(`/categories/${categoryId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Категория успешно найдена');
    expect(response.body.requestBody).toBeDefined();
  });

  test('responds with 404 when category is not found', async () => {
    const categoryId = 9999;
    const response = await request(server)
      .get(`/categories/${categoryId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

describe('GET /ingredients/:id', () => {
  test('responds with 200 and ingredient data when ingredient is found', async () => {
    const ingredientId = 1;
    const response = await request(server)
      .get(`/ingredients/${ingredientId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Ингредиент успешно найден');
    expect(response.body.requestBody).toBeDefined();
  });

  test('responds with 404 when ingredient is not found', async () => {
    const ingredientId = 9999;
    const response = await request(server)
      .get(`/ingredients/${ingredientId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

describe('GET /ingredients', () => {
  test('responds with 200 and ingredient data when ingredient is found', async () => {
    const response = await request(server)
      .get(`/ingredients`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Ингредиенты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1,Ингредиент_2');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1*3000*10');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 404 when recipes is not found', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1*2000*10');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
			expect(response.statusCode).toBe(404);
			expect(response.body.successful).toBeFalsy();
		});
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1*null*10');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1*3000');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('Ингредиент_4');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 200 and recipe data when recipes are found by ingredients', async () => {
    const ingredients = encodeURIComponent('');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.successful).toBeTruthy();
    expect(response.body.message).toBe('Рецепты успешно получены');
    expect(response.body.requestBody).toBeDefined();
  });
});

describe('GET /recipes', () => {
  test('responds with 404 when recipes is not found', async () => {
    const ingredients = encodeURIComponent('Ингредиент_1,Ингредиент_9999');
    const response = await request(server)
      .get(`/recipes/?ingredients=${ingredients}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.successful).toBeFalsy();
  });
});

afterAll(() => {
  server.close();
});