/*
    Taxi App

    Car {
        id: string
        name: string
        licenseNumber: string
        hourlyRate: number,
    }

    Trip {
        numberOfMinutes: number
        date: number
        carId: number
    }
*/

// Data Definition Language (DDL)
// Data Query Language (DQL)
// Data Manipulation Language (DML)

const express = require("express");
const app = express();
const ObjectId = require("mongodb").ObjectID;

function getClient() {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://testUser:QdCRKLNwvTfuKr07@cluster0-htgzm.mongodb.net/test?retryWrites=true&w=majority";
  return new MongoClient(uri, { useNewUrlParser: true });
}

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.use(express.static(__dirname + "/public"));

const mysql = require("mysql");

function getConnection() {
  return mysql.createConnection({
    host: "mysql_host",
    user: "user",
    password: "password",
    database: "test_db",
  });
}

function getTrips(id) {  
  return new Promise((res, rej) => {
    var connection = getConnection();
    connection.connect();
    connection.query("SELECT * FROM `trips` WHERE carId = " + id, function (
      error,
      results,
      fields
    ) {      
      res(results);
    });
    connection.end();
  });
}


app.get("/cars", function (req, res) {
  var connection = getConnection();
  connection.connect();

  connection.query("SELECT * FROM `cars`", async function (error, results, fields) {
    for (let result of results) {
      result._id = String(result.id);
      result.trips = await getTrips(result.id);
    }
    res.send(results);
  });
  connection.end();
});

function getId(raw) {
  try {
    return new ObjectId(raw);
  } catch (err) {
    return "";
  }
}

app.get("/cars/:id", function (req, res) {
  // req.params.id
  var connection = getConnection();
  connection.connect();

  // escape

  connection.query(
    "SELECT * FROM cars WHERE id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (results[0]) {
        res.send(results[0]);
      } else {
        res.send({ error: "not found" });
      }
    }
  );
  connection.end();
});

app.delete("/cars/:id", function (req, res) {
  var connection = getConnection();
  connection.connect();

  connection.query(
    "DELETE FROM `cars` WHERE `cars`.`id` = ?",
    [req.params.id],
    function (error, result, fields) {
      if (result.affectedRows) {
        res.send({ id: req.params.id });
      } else {
        res.send({ error: "not found" });
      }
    }
  );
  connection.end();
});

const bodyParser = require("body-parser");

app.put("/cars/:id", bodyParser.json(), function (req, res) {
  const updatedCar = {
    name: req.body.name,
    licenseNumber: req.body.licenseNumber,
    hourlyRate: req.body.hourlyRate,
  };

  var connection = getConnection();
  connection.connect();

  connection.query(
    `UPDATE cars SET 
    name = ?, 
    licenseNumber = ?, 
    hourlyRate = ? 
    WHERE cars.id = ?;`,
    [
      updatedCar.name,
      updatedCar.licenseNumber,
      updatedCar.hourlyRate,
      req.params.id,
    ],
    function (error, result, fields) {
      console.log(result);

      if (result.affectedRows) {
        updatedCar.id = req.params.id;
        res.send(updatedCar);
      } else {
        res.send({ error: "insert failed" });
      }
    }
  );
  connection.end();
});

app.post("/cars", bodyParser.json(), function (req, res) {
  const newCar = {
    name: req.body.name,
    licenseNumber: req.body.licenseNumber,
    hourlyRate: req.body.hourlyRate,
  };

  var connection = getConnection();
  connection.connect();

  connection.query(
    `INSERT INTO cars 
    (name, licenseNumber, hourlyRate) VALUES 
    (?, ?, ?);`,
    [newCar.name, newCar.licenseNumber, newCar.hourlyRate],
    function (error, result, fields) {
      console.log(result);

      if (result.affectedRows) {
        newCar.id = result.insertId;
        res.send(newCar);
      } else {
        res.send({ error: "insert failed" });
      }
    }
  );
  connection.end();
});

app.post("/trips", bodyParser.json(), function (req, res) {
  const newTrip = {
    numberOfMinutes: req.body.numberOfMinutes,
    date: Math.floor(Date.now() / 1000),
  };

  
});

app.listen(3000);
