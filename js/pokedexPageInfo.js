const getidPokePagina = () => {
    const urlSearchParam = new URLSearchParams(window.location.search)
    return urlSearchParam.get("id")
}
