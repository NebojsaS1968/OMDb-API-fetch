const input = document.getElementById('filmTitle')
const matchList = document.getElementById('match-list')

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

    // Clear HTML and array when text in the input reaches 0
    if(searchText.length === 0){
        matchList.style.visibility = 'hidden'
    }

    // Filling up the input field with clicked autosuggested paragraph
    matchList.addEventListener('click', (event) => {
        const clickedPara = event.target.innerHTML
        input.value = clickedPara
        //console.log(x)
        matchList.innerHTML = ''
        matchList.style.visibility = 'hidden'
    })

    //console.log(matches)

    // Turn matches into HTML and output on the page
    outputHtml(matches)
}

const outputHtml = (matches) => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="auto">
                <p>${match.imdb250}</p>
            </div>
        `).join('')
        matchList.innerHTML = html
    }

}

input.addEventListener('input', () => {
    searchFilms(input.value)
    matchList.style.visibility = 'visible'
})
