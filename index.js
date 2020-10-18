const express = require('express')

const bodyParser=require('body-parser')
const cors=require('cors')

require('dotenv').config()
const port = 4000

   
const app = express()
app.use(cors())
app.use(bodyParser.json())




var MongoClient = require('mongodb').MongoClient;


var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.wwsul.mongodb.net:27017,cluster0-shard-00-01.wwsul.mongodb.net:27017,cluster0-shard-00-02.wwsul.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-kv6gzo-shard-0&authSource=admin&retryWrites=true&w=majority`;

MongoClient.connect(uri, function(err, client) {
  const collection = client.db("creative").collection("service");
  
  const collectionReview = client.db("creative").collection("review")
  const userDetail = client.db("creative").collection("details")
  // perform actions on the collection object
  // app.post('/service',(req,res)=>{
  //   const newService=req.body
  //   collectionReview.insertMany(newService)
  //   .then(result=>{
  //     res.send(result.insertedCount>0)
  //   })
  //   console.log(newService);
  // })
  app.get('/getReview',(req,res)=>{
    collectionReview.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.get('/getService',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.post('/addService',(req,res)=>{
    const detail=req.body
    userDetail.insertOne(detail)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
    console.log()
  })
  app.get('/getServiceInfo',(req,res)=>{
    userDetail.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

});







app.listen(process.env.PORT || port)