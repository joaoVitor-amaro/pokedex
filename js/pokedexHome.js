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