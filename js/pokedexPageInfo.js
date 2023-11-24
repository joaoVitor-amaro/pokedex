const h1NamePokemom = document.querySelector('#NamePokemom')
const containerImgPokeInfor = document.querySelector('#containerImgPokeInfor')
const heightPoke = document.querySelector("#heightPoke")
const weightPoke = document.querySelector("#weightPoke")
const typesPoke = document.querySelector('#typesPoke')

const getidPokePagina = () => {
    const urlSearchParam = new URLSearchParams(window.location.search)
    return urlSearchParam.get("id")
}

const GetInforPoke = async (id) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const date = await res.json()
    console.log(date)
    return date
}

const infoPoke = (id) => {
    GetInforPoke(id)
        .then((pokemom) => {
            const imgPokeInfo = document.createElement('img') 
            h1NamePokemom.innerHTML = pokemom.name
            imgPokeInfo.src = pokemom.sprites.front_default
            imgPokeInfo.alt = `${pokemom.name}`
            heightPoke.innerHTML = `${pokemom.height}cm`
            weightPoke.innerHTML = `${pokemom.weight}g`
            imgPokeInfo.setAttribute('width', '300')
            imgPokeInfo.setAttribute('height', '300')
            imgPokeInfo.setAttribute('id', "imagePoke")
            containerImgPokeInfor.appendChild(imgPokeInfo)
        })
}

infoPoke(getidPokePagina())