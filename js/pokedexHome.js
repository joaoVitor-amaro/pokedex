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
        const linkPoke = document.createElement('a')
        articleCardPokemom.setAttribute('id', 'cardPoke')
        divIdPoke.setAttribute("id", 'idPoke')
        imagePoke.setAttribute('id', 'imgPoke')
        titleNamePoke.setAttribute('id', 'titleNamePoke')
        linkPoke.setAttribute('href', `pageInfoPoke.html?id=${pokemom.id}`)
        divIdPoke.innerHTML = `N° ${pokemom.id}`
        imagePoke.src = pokemom.sprites.front_default
        imagePoke.setAttribute('alt', `${pokemom.name}`)
        titleNamePoke.innerHTML = pokemom.name
        articleCardPokemom.appendChild(divIdPoke)
        articleCardPokemom.appendChild(imagePoke)
        articleCardPokemom.appendChild(titleNamePoke)
        articleCardPokemom.appendChild(typesPoke(pokemom.types))
        articleCardPokemom.translate = "no"
        linkPoke.appendChild(articleCardPokemom)
        sectionListpoke.appendChild(linkPoke)
    })
}

const getPokemomSearch = async (pokemom) => {
    const endpointSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemom}/`)
    const dataSearchPoke = await endpointSearch.json()
    console.log(dataSearchPoke)
    return dataSearchPoke
}

const fetchPokemomSearch = (pokemomSearch) => {
    const dataSearchPoke = getPokemomSearch(pokemomSearch);
    dataSearchPoke.then((pokemom) => {
            const articleCardPokemom = document.createElement("article")
            const divIdPoke = document.createElement('div')
            const imagePoke = document.createElement('img')
            const titleNamePoke = document.createElement('h2')
            const linkPoke = document.createElement('a')
            articleCardPokemom.setAttribute('id', 'cardPoke')
            divIdPoke.setAttribute("id", 'idPoke')
            imagePoke.setAttribute('id', 'imgPoke')
            titleNamePoke.setAttribute('id', 'titleNamePoke')
            linkPoke.setAttribute('href', `pageInfoPoke.html?id=${pokemom.id}`)
            divIdPoke.innerHTML = `N° ${pokemom.id}`
            imagePoke.src = pokemom.sprites.front_default
            imagePoke.setAttribute('alt', `${pokemom.name}`)
            titleNamePoke.innerHTML = pokemom.name
            articleCardPokemom.appendChild(divIdPoke)
            articleCardPokemom.appendChild(imagePoke)
            articleCardPokemom.appendChild(titleNamePoke)
            articleCardPokemom.appendChild(typesPoke(pokemom.types))
            linkPoke.appendChild(articleCardPokemom)
            sectionListpoke.appendChild(linkPoke)
    }).catch(erro => {
        alert('Pokemom inexistente');
        creatListPoke()
    });
}

var searchInput = document.getElementById('searchInput')

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        pesquisarPoke();
    }
});

function pesquisarPoke() {
    const cardPoke = document.querySelectorAll("#cardPoke")
    if (searchInput.value.toLocaleLowerCase() != "") {
        cardPoke.forEach((card) => {
            card.style.display = 'none'
        })
        fetchPokemomSearch(searchInput.value.toLocaleLowerCase())
    } else {
        alert('erro')
    }
}


creatListPoke()