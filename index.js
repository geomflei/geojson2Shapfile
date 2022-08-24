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
  const dataConvert=await convert(features, `/public/path/${fileName}.zip`, options)
  res.json({file:fileName,url:__dirname + `/public/path/${fileName}.zip`})
})  


app.get("/download",async (req, res) => {
  console.log('get file;',__dirname + `/path/test.zip`);
  res.download(__dirname + `/public/path/e74db214-465f-4137-bf3a-5321f6e6ff50.zip`);
})  



app.listen(process.env.PORT || 5700);

