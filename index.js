const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
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

    const touristSpotsCollection = client.db("tourServiceDB").collection("tourService");
    const countriesCollection = client.db("tourServiceDB").collection('countriesTour');


    // GET (Single data using id)
    app.get(`/spot/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await touristSpotsCollection.findOne(query)
      res.send(result)
    })

    // GET (user email)
    app.get(`/touristspots/:email`, async(req, res)=>{
      const email = req.params.email;
      const query = {email:email}
      const result = await touristSpotsCollection.find(query).toArray()
      res.send(result)

    })


    // GET(READ ALL)
    app.get('/allTouristSpots', async (req, res) => {
      const result = await touristSpotsCollection.find().toArray();
      res.send(result);
    })

    // POST(CREATE/Insert Operation)
    app.post('/addSpots', async (req, res) => {
      const tourSpot = req.body;
      const result = await touristSpotsCollection.insertOne(tourSpot);
      res.send(result);
    })

    // PUT (UPDATE one)
    app.put('/spot/:id', async (req, res) => {
      const id = req.params.id;
      const touristSpot = req.body;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateTouristSpot = {
        $set: {
          imageURL:touristSpot.imageURL,
          description:touristSpot.description,
          spot_name:touristSpot.spot_name,
          average_cost:touristSpot.average_cost,
          seasonality:touristSpot.seasonality,
          country_name:touristSpot.country_name,
          location:touristSpot.location,
          travel_time:touristSpot.travel_time,
          total_Visitor_Year:touristSpot.total_Visitor_Year,
        }
      }
      const result = await touristSpotsCollection.updateOne(filter, updateTouristSpot, options)
      res.send(result)
    })

    // delete(DELETE ONE)
    app.delete('/spot/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await touristSpotsCollection.deleteOne(query)
      res.send(result)
    })

    // countries Collection
    // READ ALL 
    app.get('/countries', async(req, res)=>{
      const result = await countriesCollection.find().toArray();
      res.send(result)
    })

    // READ by country name 
    app.get('/allTouristSpotsByCountry', async(req, res)=>{
      let query = {}
      if(req.query?.country_name){
        query = { country_name: req.query.country_name}
      }
      const result = await touristSpotsCollection.find(query).toArray();
      res.send(result)
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



app.listen(port, () => {
  console.log(`Tourist server is running on port: ${port}`);
})