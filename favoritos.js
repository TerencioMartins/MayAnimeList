/* API por ID. */
const getAnime = async (id) => {
    try {
        const url = `https://api.jikan.moe/v3/anime/${id}`
        const api = await fetch(url)
        const apiJSON = await api.json()
        return apiJSON;
    }
    catch (error) {
        console.log("erro");
    }
}

/* Recuperar Storage. */
const getStorage = () => {
    let currentStorageString = localStorage.getItem('favItems');
    let currentStorage = currentStorageString.split(',');
    return currentStorage;
}

/* Criar Favoritos. */
const createList = () => {
    const Storage = getStorage();

    Storage.forEach((aux) => {
        createItem(aux);
    });
}

/* Limpar Lista. */
const deleteButton = document.querySelector('.deleteButton')
    deleteButton.addEventListener('click', () => {
        const favoriteList = document.getElementById('favoritos')
        favoriteList.innerHTML = ''
        localStorage.clear();
});

/* Criar Item dos Favoritos. */
const createItem = async (x) => {
    const element = await getAnime(x);

    const { title: titulo, image_url: imagem, mal_id: id } = element;

    createElement('div', '', 'favoritos', 'container', `div-${id}`);
    createElement('p', `${titulo}`, `div-${id}`, 'titulo');
    createImg('img', `${imagem}`, `div-${id}`, 'imagem');
}

/* Funções Auxiliares. */
const createElement = (element, inner, father, className, idName) => {
    const elemento = document.createElement(element)
    const elementoPai = document.getElementById(father)
    elemento.id = idName;
    elemento.className = className;
    elemento.innerHTML = inner;
    elementoPai.appendChild(elemento);
}

const createImg = (element, src, father, className, idName) => {
    const imagem = document.createElement(element)
    const imagemPai = document.getElementById(father)
    imagem.id = idName;
    imagem.className = className;
    imagem.src = src;
    imagemPai.appendChild(imagem)
}

/* Ao carregar. */
window.onload = () => {
    /* Encher Local Storage Vazio. */
    if(localStorage.getItem("favItems") === '0'){
        localStorage.removeItem('favItems')
    }
    createList();
}