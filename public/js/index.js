const input = document.getElementById('filmTitle')

const searchFilms = async (searchText) => {
    const url = '../data/films.json'
    const res = await fetch(url)
    const films = await res.json()

    /*films.forEach(film => {
        console.log(film.imdb250)
    }); */

    // Get matches of input
    let matches = films.filter(film => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        const title = new String(film.imdb250)
        return title.match(regex)
    })

    if(searchText.length === 0){
        matches = []
    }

    console.log(matches)
    //outputHtml(matches)
}

//const outputHtml = (matches) => {


input.addEventListener('input', () => searchFilms(input.value))