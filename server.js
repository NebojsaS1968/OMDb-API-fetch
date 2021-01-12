const express = require('express')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

const api_key = process.env.API_KEY


const app = express()

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// FORM
app.get('/', (req, res) => {
    res.render('index.html')
})

// RESULT
app.post('/film', async (req, res) => {
    console.log("/post route called")
    const filmTitle = req.body.movie
    const filmYear = req.body.year
    const api_url = `http://www.omdbapi.com/?apikey=${api_key}&s=${filmTitle}&y=${filmYear}`
    const options = {
        "method": "POST"
    }
    const response = await fetch(api_url, options)
    .then(res => res.json())
    .catch(e => console.log(e))
    res.json(response)
})

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))