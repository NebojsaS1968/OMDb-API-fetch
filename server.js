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
//app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// FORM
app.get('/', (req, res) => {
    res.render('index')
})

// RESULT
app.post('/film', async (req, res) => {
    console.log("/film route called")
    const filmTitle = req.body.title
    const filmYear = req.body.year

    const api_url = `http://www.omdbapi.com/?apikey=${api_key}&s=${filmTitle}&y=${filmYear}`
    const response = await fetch(api_url)
    const data = await response.json()
    const poster = data.Search[0].Poster

    res.render('result', {
        title: filmTitle,
        year: filmYear,
        poster: poster
    })
})

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))