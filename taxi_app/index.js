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



const express = require('express')
const app = express()

app.get('/cars', function (req, res) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://testUser:YX4JWiDr0vy17tHO@cluster0-htgzm.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(async (err) => {
      const collection = client.db("taxi_app").collection("cars");
      // perform actions on the collection object
      const cars = await collection.find().toArray();
      res.send(cars)
      client.close();
    });
})
 
app.listen(3000)