const getidPokePagina = () => {
    const urlSearchParam = new URLSearchParams(window.location.search)
    return urlSearchParam.get("id")
}

const GetInforPoke = async (id) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const date = await res.json()
    return date
}
