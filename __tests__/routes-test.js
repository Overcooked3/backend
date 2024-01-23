const request = require("supertest");
const app = require("../src/index.js");

describe("Testing routes distribution", () => {
  test("should register the user", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: "Bernardette",
        email: "barmandu92@hotmail.com",
        password: "labise123456",
      });

    // Vous vous attendez probablement à un code 201 (Created) après une inscription réussie
    // expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(201);
  });

  test("should login the user", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "barmandu92@hotmail.com",
        password: "labise123456",
      });

    // Vous vous attendez probablement à un code 201 (Created) ou 200 (OK) après une connexion réussie
    expect(response.statusCode).toBe(200);
  });

  test("should update the user", async () => {
    // Supposons que vous avez un ID utilisateur valide à utiliser dans le chemin
    const userId = 1;
    const response = await request(app)
      .put(`/${userId}`)
      .send({
        // Les données que vous souhaitez mettre à jour
        // Assurez-vous de fournir des données valides pour votre cas d'utilisation
        username: "NouveauNom",
        email: "nouveauemail@example.com",
      });

    // Vous vous attendez probablement à un code 200 (OK) après une mise à jour réussie
    expect(response.statusCode).toBe(200);
  });

  test("should delete the user", async () => {
    const response = await request(app)
      .delete("/")
      .send({
        // Les données que vous pourriez inclure (peut-être un jeton JWT) pour autoriser la suppression
        // Assurez-vous de fournir des données valides pour votre cas d'utilisation
      });

    // Vous vous attendez probablement à un code 204 (No Content) après une suppression réussie
    expect(response.statusCode).toBe(204);
  });
});
