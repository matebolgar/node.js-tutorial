/*
    Taxi App

    Car {
        id: string
        name: string
        licenseNumber: string
        hourlyRate: number,
        trips: Array<Trip>
    }

    Trip {
        numberOfMinutes: number
        date: number
    }
*/

const express = require("express");
const app = express();
const ObjectId = require("mongodb").ObjectID;

function getClient() {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://testUser:YX4JWiDr0vy17tHO@cluster0-htgzm.mongodb.net/test?retryWrites=true&w=majority";
  return new MongoClient(uri, { useNewUrlParser: true });
}

app.get("/cars", function (req, res) {
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("taxi_app").collection("cars");
    const cars = await collection.find().toArray();
    res.send(cars);
    client.close();
  });
});

function getId(raw) {
  try {
    return new ObjectId(raw);
  } catch (err) {
    return "";
  }
}

app.get("/cars/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("taxi_app").collection("cars");
    const car = await collection.findOne({ _id: id });
    if (!car) {
      res.send({ error: "not found" });
      return;
    }
    res.send(car);
    client.close();
  });
});

app.delete("/cars/:id", function (req, res) {
  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("taxi_app").collection("cars");
    const result = await collection.deleteOne({ _id: id });
    if (!result.deletedCount) {
      res.send({ error: "not found" });
      return;
    }
    res.send({id: req.params.id});
    client.close();
  });
});

app.put("/cars/:id", function (req, res) {});

app.post("/cars", function (req, res) {});

app.listen(3000);
