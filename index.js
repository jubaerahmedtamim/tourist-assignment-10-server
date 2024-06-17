const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send("Tourist server is running...");
})



app.listen(port, ()=>{
    console.log(`Tourist server is running on port: ${port}`);
})