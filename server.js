projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`Running on localhost: ${port}.`);
  };

// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// POST route
app.post('/add', addWeatherInfo);

function addWeatherInfo(req, res) {
    const weatherInfo = {
        temperature: req.body.main.temp,
        date: new Date(),
        userResponse: req.body.userFeelings
    };
    projectData = weatherInfo;
    console.log(projectData);
    res.send(weatherInfo);
};