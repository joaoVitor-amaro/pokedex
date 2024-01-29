const h1NamePokemom = document.querySelector('#NamePokemom')
const containerImgPokeInfor = document.querySelector('#containerImgPokeInfor')
const heightPoke = document.querySelector("#heightPoke")
const weightPoke = document.querySelector("#weightPoke")
const typesPoke = document.querySelector('#typesPoke')
const variacaoPokemon = document.querySelector("#varicaoPokemom")
const movimentosPoke = document.querySelector("#movimentosPoke")


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
const typesPokemon = (typesPoke) => {
    const spanType = document.createElement('span') 
    typesPoke.forEach((tiposPoke, index) => {
        spanType.innerHTML +=`${tiposPoke.type.name} `
        if(index < typesPoke.length - 1) {
            spanType.innerHTML += "| "
        }
    })
    return spanType
}

const ImgvariacaoPoke = (pokeVariacao, namePokemom) => {
    const listVariacaoPoke = ["front_default", "front_female", "front_shiny","front_shiny_female"]
    const imgFigurePokeVaria = document.createElement('figure')
    for (var valoresVaricao of listVariacaoPoke) {
            if (pokeVariacao[valoresVaricao] != null) {
                const imgVariacaoPoke = document.createElement('img')
                imgVariacaoPoke.src = pokeVariacao[valoresVaricao]
                imgVariacaoPoke.alt = namePokemom
                imgVariacaoPoke.setAttribute("width", "180")
                imgVariacaoPoke.setAttribute('height', '180')
                imgFigurePokeVaria.appendChild(imgVariacaoPoke)
            }
    }
    return imgFigurePokeVaria
}

const movesPokemon = (moves) => {
    const containerMoves = document.createElement('div')
    containerMoves.setAttribute("id", "divMove")
    moves.forEach((movimentos) => {
        const spanMove = document.createElement("span")
        spanMove.innerHTML = movimentos.move.name
        spanMove.setAttribute("id", 'spanMove')
        containerMoves.appendChild(spanMove)
    })
    return containerMoves
}

const infoPoke = (id) => {
    GetInforPoke(id)
        .then((pokemom) => {
            const imgPokeInfo = document.createElement('img') 
            document.title = pokemom.name
            h1NamePokemom.innerHTML = pokemom.name
            imgPokeInfo.src = pokemom.sprites.front_default
            imgPokeInfo.alt = `${pokemom.name}`
            heightPoke.innerHTML = `${pokemom.height}cm`
            weightPoke.innerHTML = `${pokemom.weight}g`
            imgPokeInfo.setAttribute('width', '300')
            imgPokeInfo.setAttribute('height', '300')
            imgPokeInfo.setAttribute('id', "imagePoke")
            containerImgPokeInfor.appendChild(imgPokeInfo)
            typesPoke.appendChild(typesPokemon(pokemom.types))
            variacaoPokemon.appendChild(ImgvariacaoPoke(pokemom.sprites, pokemom.name))
            movimentosPoke.appendChild(movesPokemon(pokemom.moves))
           console.log(movesPokemon(pokemom.moves))
        })
}

const togglePrevDisplayByID = (id) => {
    const prev = document.querySelector('.prev')
    if (id == 1) {
        prev.style.display = "none"
    } else {
        prev.style.display = "block"
    }
}

const resetInfoPoke = () => {
    h1NamePokemom.innerHTML = ""
    heightPoke.innerHTML = ""
    weightPoke.innerHTML = ""
    typesPoke.innerHTML = ""
    containerImgPokeInfor.innerHTML = ''
    variacaoPokemon.innerHTML = ""
    movimentosPoke.innerHTML = ''
}

const NextIdPoke = (postId) => {
    const novoId = Number(postId) + 1;
    const novoSearchParams = new URLSearchParams(window.location.search);
    novoSearchParams.set("id", novoId);
    const novaURL = `${window.location.pathname}?${novoSearchParams.toString()}`;
    window.history.replaceState(null, null, novaURL);   
    return novoId
}

document.getElementById("nextPokemom").addEventListener("click", ()=> {
    const postId = getidPokePagina()
    const novoId = NextIdPoke(postId)
    togglePrevDisplayByID(novoId)
    resetInfoPoke()
    location.reload()
    infoPoke(novoId)
    
})

const PrevIdPoke = (postId) => {
    const novoId = Number(postId) - 1;
    const novoSearchParams = new URLSearchParams(window.location.search);
    novoSearchParams.set("id", novoId);
    const novaURL = `${window.location.pathname}?${novoSearchParams.toString()}`;
    window.history.replaceState(null, null, novaURL);   
    return novoId
}

document.getElementById("prevPokemom").addEventListener("click", ()=>{
    const postId = getidPokePagina()
    const novoId = PrevIdPoke(postId)
    togglePrevDisplayByID(novoId)
    resetInfoPoke()
    location.reload()
    infoPoke(novoId)
    
})

infoPoke(getidPokePagina())
togglePrevDisplayByID(getidPokePagina())