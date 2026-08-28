# Pokédex

Aplicação web simples que consome a [PokéAPI](https://pokeapi.co/) para listar Pokémon, pesquisar por nome ou ID e exibir uma página de detalhes com altura, peso, tipos, variações (sprites) e lista de movimentos. Construída com **HTML, CSS e JavaScript puro (Vanilla JS)**, sem frameworks ou build tools.

## ✨ Funcionalidades

- Listagem inicial dos primeiros 25 Pokémon
- Busca por **nome ou ID** (tecla Enter ou botão de pesquisa)
- Cartão de cada Pokémon com número, imagem, nome e tipos (com cor de fundo específica por tipo)
- Página de detalhes (`pageInfoPoke.html`) com:
  - Nome, altura e peso
  - Tipo(s)
  - Variações de sprite (normal, fêmea, shiny, shiny fêmea)
  - Lista de movimentos
  - Navegação entre Pokémon (anterior/próximo) via query string `?id=`
- Layout responsivo com Bootstrap 5 e ícones Material Icons/Bootstrap Icons

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+, `fetch`, `async/await`)
- [Bootstrap 5](https://getbootstrap.com/) (via CDN)
- [Material Icons](https://fonts.google.com/icons) (via CDN)
- [PokéAPI](https://pokeapi.co/) — fonte dos dados dos Pokémon

Não há dependências de build (sem npm/bundler): o projeto roda diretamente abrindo os arquivos HTML ou via um servidor estático simples.

## 📁 Estrutura do projeto

```
pokedex/
├── index.html              # Página inicial (listagem e busca)
├── pageInfoPoke.html        # Página de detalhes do Pokémon
├── css/
│   ├── style.css            # Estilos globais/compartilhados
│   ├── home.css              # Estilos da página inicial
│   └── stylePageInfo.css     # Estilos da página de detalhes
├── js/
│   ├── pokedexHome.js        # Lógica da listagem e busca (consome a PokéAPI)
│   └── pokedexPageInfo.js    # Lógica da página de detalhes (info, variações, movimentos, navegação)
└── image/
    ├── logo_Pokemom.webp
    └── faviconPoke.png
```

## 🚀 Como executar

Como é um projeto estático, basta servir os arquivos HTML. Algumas opções:

**Abrir diretamente no navegador**
```bash
git clone https://github.com/joaoVitor-amaro/pokedex.git
cd pokedex
```
Abra o arquivo `index.html` no navegador.

**Usando a extensão Live Server (VS Code)**
1. Instale a extensão "Live Server"
2. Clique com o botão direito em `index.html` → "Open with Live Server"

**Usando um servidor HTTP simples**
```bash
# Python 3
python3 -m http.server 5500

# Node.js (http-server)
npx http-server -p 5500
```
Depois acesse `http://localhost:5500`.

> ⚠️ Como o projeto faz requisições `fetch` para uma API externa, é recomendado servir os arquivos por um servidor HTTP (em vez de abrir via `file://`) para evitar eventuais bloqueios de CORS/segurança do navegador.

## 🔍 Como funciona

- Na página inicial, `pokedexHome.js` busca uma lista de 25 Pokémon na PokéAPI e, para cada um, faz uma segunda requisição para obter seus detalhes (sprite, tipos etc.), montando os cartões dinamicamente.
- O campo de busca permite localizar um Pokémon específico por nome ou número; se não encontrado, exibe um alerta e restaura a listagem padrão.
- Cada cartão linka para `pageInfoPoke.html?id=<id>`, onde `pokedexPageInfo.js` lê o parâmetro `id` da URL, busca os dados completos do Pokémon e monta a seção de detalhes, incluindo variações de sprite e lista de movimentos.
- Os botões de "anterior" e "próximo" atualizam o parâmetro `id` na URL e recarregam as informações do Pokémon correspondente.

## 📄 Licença

Este projeto não possui licença definida no repositório. Caso pretenda reutilizá-lo, entre em contato com o autor.

## 👤 Autor

[João Vitor Amaro](https://github.com/joaoVitor-amaro)
