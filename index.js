const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Tourist server is running...");
})
// GreenExcursion 
// 9LppdiqyTziXrJyW

const uri = "mongodb+srv://GreenExcursion:9LppdiqyTziXrJyW@cluster0.yatfw0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db("tourServiceDB").collection("tourService");

    // POST(CREATE/Insert Operation)
    app.post('/addSpots', async(req, res)=>{
        const tourSpot = req.body;
        const result = await serviceCollection.insertOne(tourSpot);
        res.send(result);
    })










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=>{
    console.log(`Tourist server is running on port: ${port}`);
})