const fs = require('fs')
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const {convert} = require('geojson2shp')
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("index"));

app.use("/", router);

app.post("/geojson2shp",async (req, res) => {
  console.log(req.body.data);
  let fileName=uuidv4()
  const options = {
    layer: 'my-layer',
    targetCrs: 26191,
  }
  const features = req.body.data
  const dataConvert=await convert(features, __dirname + `/public/path/${fileName}.zip`, options)
  res.json({success:true,file:fileName})
})  


app.get("/download/:id",async (req, res) => {
  let downald_shp=req.params.id
  console.log('get file;',__dirname + `/path/${downald_shp}.zip`);
  
  res.download(`${__dirname}/public/path/${downald_shp}.zip`);
})  



app.listen(process.env.PORT || 5700);

