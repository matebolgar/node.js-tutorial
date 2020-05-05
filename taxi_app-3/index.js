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
    res.send({ id: req.params.id });
    client.close();
  });
});

const bodyParser = require("body-parser");

app.put("/cars/:id", bodyParser.json(), function (req, res) {
  const updatedCar = {
    name: req.body.name,
    licenseNumber: req.body.licenseNumber,
    hourlyRate: req.body.hourlyRate,
  };

  const id = getId(req.params.id);
  if (!id) {
    res.send({ error: "invalid id" });
    return;
  }

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("taxi_app").collection("cars");
    const result = await collection.findOneAndUpdate({ _id: id }, {$set: updatedCar});
    
    if (!result.ok) {
      res.send({ error: "not found" });
      return;
    }
    res.send(result.value);
    client.close();
  });
});

app.post("/cars", bodyParser.json(), function (req, res) {
  const newCar = {
    name: req.body.name,
    licenseNumber: req.body.licenseNumber,
    hourlyRate: req.body.hourlyRate,
    trips: []
  };

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("taxi_app").collection("cars");
    const result = await collection.insertOne(newCar);
    if (!result.insertedCount) {
      res.send({ error: "insert error" });
      return;
    }
    res.send(newCar);
    client.close();
  });
});

app.listen(3000);
