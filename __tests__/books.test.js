const { MongoClient } = require("mongodb");

describe("MongoDB CRUD Operations", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    // Teste de Criação (Create)
    it("should insert a document into the collection", async () => {
        const users = db.collection("users");
        const mockUser = { _id: "some-user-id", name: "John" };
        await users.insertOne(mockUser);
        const insertedUser = await users.findOne({ _id: "some-user-id" });
        expect(insertedUser).toEqual(mockUser);
    });

    // Teste de Leitura (Read)
    it("should find a document by _id in the collection", async () => {
        const users = db.collection("users");
        const foundUser = await users.findOne({ _id: "some-user-id" });
        expect(foundUser.name).toBe("John");
    });

    // Teste de Atualização (Update)
    it("should update a document in the collection", async () => {
        const users = db.collection("users");
        await users.updateOne({ _id: "some-user-id" }, { $set: { name: "John Updated" } });
        const updatedUser = await users.findOne({ _id: "some-user-id" });
        expect(updatedUser.name).toBe("John Updated");
    });

    // Teste de Exclusão (Delete)
    it("should delete a document from the collection", async () => {
        const users = db.collection("users");
        await users.deleteOne({ _id: "some-user-id" });
        const deletedUser = await users.findOne({ _id: "some-user-id" });
        expect(deletedUser).toBeNull();
    });
});