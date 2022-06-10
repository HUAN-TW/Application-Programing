const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
  res.sendfile(__dirname + '/index.html');
})

app.post('/',function(req,res){
  console.log("Post request received");

  const querycity = req.body.CityName;
  const apiKey = "6e9aa16bdd920599fb3b616da0334561";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ querycity +"&limit=5&appid="+ apiKey +"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherdata =JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      //console.log(weatherdescription); 測試用
      res.write("<h1>The temperature in "+ querycity+" is "+ temp + " degrees Celcius</h1>");
      res.write("<h2>The weather in "+ querycity +" is currently "+ weatherdescription +"<h2>");
      res.write("<img src="+ imgURL +">");
      res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
