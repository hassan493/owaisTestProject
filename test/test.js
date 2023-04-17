const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const mongoose = require("mongoose");
const Item = require("../models/items");
require("dotenv").config();

chai.use(chaiHttp);
chai.should();

describe("Items API", () => {
  before((done) => {
    mongoose
      .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  describe("POST /api/items", () => {
    it("should create a new item", (done) => {
      const newItem = {
        name: "Test Item",
        description: "This is a test item",
        price: 10.0,
      };
      chai
        .request(server)
        .post("/api/items")
        .send(newItem)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("Test Item");
          res.body.should.have.property("description").eq("This is a test item");
          res.body.should.have.property("price").eq(10.0);
          done();
        });
    });

    it("should return an error when name is missing", (done) => {
      const newItem = {
        description: "This is a test item",
        price: 10.0,
      };
      chai
        .request(server)
        .post("/api/items")
        .send(newItem)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Item validation failed: name: Path `name` is required.");
          done();
        });
    });
  });

  describe("GET /api/items", () => {
    it("should return a list of items", (done) => {
      chai
        .request(server)
        .get("/api/items")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });
  });

  describe("GET /api/item/:id", () => {
    it("should return an item by id", (done) => {
      const newItem = new Item({
        name: "Test Item",
        description: "This is a test item",
        price: 10.0,
      });
      newItem.save((err, item) => {
        chai
          .request(server)
          .get("/api/items/" + item._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name").eq("Test Item");
          });
          done();
      });
    });
  });

  describe("PUT /api/item/:id", () => {
    it("should update an item by id", (done) => {
      const newItem = new Item({
        name: "New Test Item",
        description: "This is a New test item",
        price: 10.0,
      });
      newItem.save((err, item) => {
        chai
          .request(server)
          .put("/api/items/" + item._id)
          .send({ name: "Updated Item" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name").eq("Updated Item");
          });
          done();
      });
    });
  });

  describe("DELETE /api/items/:id", () => {
    it("should delete an item by id", (done) => {
      const newItem = new Item({
        name: "New Test Item",
        description: "This is a new test item",
        price: 10.0,
      });
      newItem.save((err, item) => {
        chai
          .request(server)
          .delete("/api/items/" + item._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eq("Item deleted successfully");
          });
          done();
      });
    });
  });
  
});