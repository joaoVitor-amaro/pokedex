const sectionListpoke = document.querySelector("#ListPoke")

const getPokemom = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=$0")
    const data = await response.json()
    const pokemonDataPromise = data.results.map(async(pokemom) => {
        const pokemomEndpoint = await fetch(pokemom.url)
        return pokemomEndpoint.json()
    })
    const pokeData = Promise.all(pokemonDataPromise)
    console.log(pokeData)
    return pokeData
}

const backgroundType = (typePoke) => {
    const backgroundTypePokeOne = {
        fire: "#ff5e00",
        water: "#065c96",
        poison: "#bf3ce4",
        bug: "#6abe09",
        rock: "#A38C21",
        fighting: "#D56723",
        psychic: "#F366B9",
        ghost: "#544F5B",
        dragon: '#F16E57',
        dark: '#707070'
    }
    const backgroundTypePokeTwo = {
        grass: "#9BCC50",
        flying: "#BDB9B8",
        normal: "#A4ACAF",
        electric: "#EED535",
        ground: "#AB9842",
        fairy: "#FDB9E9",
        steel: "#A4ACAF",
        ice: "#51C4E7"
    }
    let colorTypePoke = ""
    if(typePoke in backgroundTypePokeOne) {
        colorTypePoke = "#ffffff"
        return [backgroundTypePokeOne[typePoke], colorTypePoke]
    }
    if(typePoke in backgroundTypePokeTwo) {
        colorTypePoke = '#000000'
        return [backgroundTypePokeTwo[typePoke], colorTypePoke]
    }
}

const typesPoke = (pokemo) => {
    const div_types = document.createElement("div")
    div_types.setAttribute("id", "typesPokemons")
    for (var i in pokemo) {
        let spanTypePoke = document.createElement("span")
        spanTypePoke.innerHTML = pokemo[i].type.name
        const [bgColorType, colorTypePok] = backgroundType(pokemo[i].type.name)
        spanTypePoke.style.background = bgColorType
        spanTypePoke.style.color = colorTypePok
        div_types.appendChild(spanTypePoke)
    }
    return div_types
}

const creatListPoke = async () => {
    const data = await getPokemom()
    data.forEach((pokemom) => {
        const articleCardPokemom = document.createElement("article")
        const divIdPoke = document.createElement('div')
        const imagePoke = document.createElement('img')
        const titleNamePoke = document.createElement('h2')
        articleCardPokemom.setAttribute('id', 'cardPoke')
        divIdPoke.setAttribute("id", 'idPoke')
        imagePoke.setAttribute('id', 'imgPoke')
        titleNamePoke.setAttribute('id', 'titleNamePoke')
        divIdPoke.innerHTML = `N° ${pokemom.id}`
        imagePoke.src = pokemom.sprites.front_default
        titleNamePoke.innerHTML = pokemom.name
        articleCardPokemom.appendChild(divIdPoke)
        articleCardPokemom.appendChild(imagePoke)
        articleCardPokemom.appendChild(titleNamePoke)
        articleCardPokemom.appendChild(typesPoke(pokemom.types))
        sectionListpoke.appendChild(articleCardPokemom)
    })
}

function pesquisarPoke() {
    const cardPoke = document.querySelectorAll("#cardPoke")
    searchInput = searchInput.value.toLocaleLowerCase()
    if (searchInput != "") {
        cardPoke.forEach((card) => {
            card.style.display = 'none'
        })
        fetchPokemomSearch(searchInput)
    } else {
        alert('erro')
    }
}


creatListPoke()