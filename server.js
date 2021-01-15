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

    // CANT SEEM TO HANDLE ERRORS
    // HOW TO CHECK IF THE TITLE IS CORRECT
    // HOW TO LOOP THROUGH THE DATA ARRAY
    if(!response){
        console.log(2)
        res.render('error')
    } else {
        const data = await response.json() 
        const poster = data.Search[0].Poster
        const imdbId = data.Search[0].imdbID
        res.render('result', {
            title: filmTitle,
            year: filmYear,
            poster: poster,
            imdbId: imdbId
        })
    }
})

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))