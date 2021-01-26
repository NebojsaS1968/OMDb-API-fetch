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

    const api_url = `http://www.omdbapi.com/?apikey=${api_key}&t=${filmTitle}&y=${filmYear}`
    const response = await fetch(api_url)

    const data = await response.json()

    if(data.Response === 'False'){
        return res.render('error', {
            error: data.Error
        })
    }

    const title = data.Title 
    const year = data.Year
    const dir = data.Director
    const poster = data.Poster
    const imdbId = data.imdbID
    const rating = data.imdbRating
    const metascore = data.Metascore
    const country = data.Country
    const plot = data.Plot
    const votes = data.imdbVotes
    res.render('result', {
        title,
        year,
        poster,
        imdbId,
        dir,
        rating,
        metascore,
        country,
        plot,
        votes
    })
})


// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))