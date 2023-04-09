

const fetch =require('node-fetch');
// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=
const express = require('express')
// const express=require("express")
const bodyParser=require('body-parser')
const app = express()
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json()); 
const port = 3001
require("dotenv").config()
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000","https://newsapppppp.netlify.app"],
credentials: true, //access-control-allow-credentials:true
optionSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send(process.env.EXP_PORT)
 
})
app.get("/general",async(req,res)=>{
let arr=[]
  await fetch (` https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${process.env.API_KEY}`)
.then((data)=>data.json())
.catch((err)=>console.log(err))
.then((data)=>arr=data)
if(arr===undefined)
return res.json({stat:404 ,message:"Site not found"})   
console.log(arr) 
    res.json({result:arr,stat:200,message:"site loaded successfully"}) 
})

// app.post("/topic",async(req,res)=>{
//   // console.log(JSON.parse(req.body.Topic))
//   const {Topic}=await req.body;
//   // const topic=await(req.body.topics)
//   console.log(Topic,"hii topic")

//   res.send((Topic))
// })
app.post("/topic", async (req, res) => {
  const topic = req.body.title;
  if (topic === undefined) {
    return res.json({ stat: 404, message: "Site not found" });
  }
  let arr = [];
  await fetch(
    // `https://newsapi.org/v2/everything?sortBy=popularity&q=${topic}&pageSize=10&language=en&apiKey=64fca12e4bed424e9c1b9118b8a2da9f`
    `https://newsapi.org/v2/everything?sortBy=popularity&q=${topic}&pageSize=10&language=en&apiKey=${process.env.API_KEY}`
    )
    .then((data) => data.json())
    .catch((err) => console.log(err))
    .then((data) => (arr = data));
  res.json({ stat: 200, result: arr, message: "site loaded successfully" });
});
app.post("/subject", async (req, res) => {
  const subject = req.body.searchsubject;
  console.log(subject , "hello");
  if (!subject) {
    return res.json({ stat: 404, message: "Site not found" });
  }
  let arr = [];
  await fetch(
    // `https://newsapi.org/v2/everything?sortBy=popularity&q=${subject}&pageSize=10&language=en&apiKey=64fca12e4bed424e9c1b9118b8a2da9f`
    `https://newsapi.org/v2/everything?sortBy=popularity&q=${subject}&pageSize=10&language=en&apiKey=${process.env.API_KEY}`
    )
    .then((data) => data.json())
    .catch((err) => console.log(err))
    .then((data) => (arr = data));
  res.json({ stat: 200, result: arr, message: "site loaded successfully" });
});

app.get("/recommendation" , async(req , res) => {
  let arr = [];
  await fetch(
    // ` https://newsapi.org/v2/top-headlines?q=latest&pageSize=3&apiKey=64fca12e4bed424e9c1b9118b8a2da9f`
      ` https://newsapi.org/v2/top-headlines?q=latest&pageSize=3&apiKey=${process.env.API_KEY}`
    )
    .then((data) => data.json())
    .catch((err) => console.log(err))
    .then((data) => (arr = data));
  if (arr === undefined)
    return res.json({ stat: 404, message: "Site not found" });
  console.log(arr);
  res.json({ result: arr, stat: 200, message: "site loaded successfully" });
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})