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
        sectionListpoke.appendChild(articleCardPokemom)
    })
}

creatListPoke()