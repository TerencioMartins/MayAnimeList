/* API por Titulo. */
const getAnime = async (anime) => {
    try {
        const url = `https://api.jikan.moe/v3/search/anime?q=${anime}`
        const api = await fetch(url)
        const apiJSON = await api.json()
        console.log(apiJSON.results);
        return apiJSON.results;
    }
    catch (error) {
        console.log("erro");
    }

}

/* API por Popularidade. */
const getPop = async () => {
    try {
        const url = `https://api.jikan.moe/v3/top/anime`
        const api = await fetch(url);
        const apiJSON = await api.json();
        return apiJSON.top;
    } catch (error) {
        console.log("erro");
    }
}

/* Lista Popular. */
const createPop = async () => {
    const array = await getPop();
    const results = array.slice(0, 5);
    results.forEach((aux) => {
        const { title: titulo, image_url: imagem, mal_id: id, url: malUrl } = aux;
        let a = " "
        if (titulo.length > 25) {
            a = titulo.substr(0, 25) + "...";
        } else {
            a = titulo;
        }
        createElement('div', '', 'list', 'container animate__animated animate__fadeIn', `div-${id}`);
        createElement('button', `${a}`, `div-${id}`, 'titulo animate__animated animate__fadeIn', `better${id}`);
        createImg('img', `${imagem}`, `div-${id}`, 'imagem animate__animated animate__fadeIn', id);

        /* Adicionando Link Externo na Imagem */
        const elementoImagem = document.getElementById(id);
        elementoImagem.addEventListener('click', () => {
            window.location.href = malUrl;
        });
        const elementoBotao = document.getElementById(`better${id}`);
        elementoBotao.addEventListener('click', () => {
            window.location.href = malUrl;
        });
    });

}

/* Lista da Busca. */
const createList = async (x) => {
    const array = await getAnime(x);
    const results = array.slice(0, 20);
    results.forEach((aux) => {
        const { title: titulo, image_url: imagem, mal_id: id, url: malUrl } = aux;
        let a = " "
        if (titulo.length > 25) {
            a = titulo.substr(0, 25) + "...";
        } else {
            a = titulo;
        }
        createElement('div', '', 'list', 'container', `div-${id}`);
        createElement('button', `${a}`, `div-${id}`, 'titulo animate__animated animate__fadeIn', `better${id}`);
        createImg('img', `${imagem}`, `div-${id}`, 'imagem animate__animated animate__fadeIn', id);

        /* Adicionando Link Externo na Imagem */
        const elementoImagem = document.getElementById(id);
        elementoImagem.addEventListener('click', () => {
            window.location.href = malUrl;
        });
        const elementoBotao = document.getElementById(`better${id}`);
        elementoBotao.addEventListener('click', () => {
            window.location.href = malUrl;
        });
        /* Check Favorito. */
        const checkStatus = localStorage.getItem(id);

        /* Encher Local Storage Vazio. */
        if (localStorage.getItem("favItems") === null) {
            localStorage.setItem('favItems', '0')
        }

        /* Pegar Local Storage. */
        let currentStorageString = localStorage.getItem('favItems');
        let currentStorage = currentStorageString.split(',');

        /* Criando Botão de Favoritar.*/
        const favButton = document.createElement('button');
        const buttonFather = document.getElementById(`div-${id}`);
        favButton.innerHTML = '🖤'
        favButton.id = `favButton-${id}`
        favButton.className = 'favButton unchecked'
        buttonFather.appendChild(favButton);

        /* Criando Botão de Desfavoritar. */
        const unFavButton = document.createElement('button');
        unFavButton.innerHTML = '❤'
        unFavButton.id = `unFavButton-${id}`
        unFavButton.className = 'favButton unchecked'
        buttonFather.appendChild(unFavButton);
        unFavButton.style.display = 'none';


        /* Colocando Favoritos no Local Storage. */
        favButton.addEventListener('click', () => {
            updaterStorage('favItems', id);

            currentStorageString = localStorage.getItem('favItems');
            currentStorage = currentStorageString.split(',');

            localStorage.setItem(id, 'checked');
            favButton.style.display = 'none'
            unFavButton.style.display = 'inline-block'

            /* Remover o fill do Storage. */
            currentStorage.forEach((i, j) => {
                if (i == '0') {
                    currentStorage.splice(j, 1);
                }
            });

            /* Atualizador de Storage. */
            const StorageString = currentStorage.toString();
            localStorage.setItem('favItems', StorageString);

        });

        /* Removendo desfavoritados do Local Storage. */
        unFavButton.addEventListener('click', () => {

            localStorage.setItem(id, 'unchecked');
            favButton.style.display = 'inline-block'
            unFavButton.style.display = 'none'

            currentStorageString = localStorage.getItem('favItems');
            currentStorage = currentStorageString.split(',');

            /* Remover um item favoritado. */
            currentStorage.forEach((i, j) => {
                if (i == id) {
                    currentStorage.splice(j, 1);
                }
            });

            /* Atualizador de Storage. */
            const StorageString = currentStorage.toString();
            localStorage.setItem('favItems', StorageString);
        });

        /* Mudando visibilidade dos botões.*/
        if (checkStatus === 'checked') {
            favButton.style.display = 'none'
            unFavButton.style.display = 'inline-block'

        }
        if (checkStatus === 'unchecked') {
            favButton.style.display = 'inline-block'
            unFavButton.style.display = 'none'
        }

    });

}

/* Atualizador de Storage. */
const updaterStorage = (chave, valor) => {
    const oldStorage = localStorage.getItem(chave);
    const newStorage = [oldStorage, valor]
    localStorage.setItem(chave, newStorage);
}

/* Botão procura. */
const searchButton = document.querySelector('.searchButton');
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const botaoPop = document.querySelector('.popButton')
    const searchInput = document.querySelector('.searchInput');
            const input = searchInput.value;
    switch (input.length > 1) {
        case false:
            console.log("recarregou");
            location.reload();
            botaoPop.style.display = 'flex'
        case true:
            /* Limpando tela */
            const animList = document.getElementById('list');
            animList.innerHTML = '';
            /* Buscando animes. */
            botaoPop.style.display = 'none'
            const searchInput = document.querySelector('.searchInput');
            const input = searchInput.value;
            createList(input);
    }

});

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

/* Botão scroll pra cima */
const botaoSubir = document.querySelector('.botaoSubir2')
botaoSubir.addEventListener('click', () => {
    window.scrollTo(0, 0);
})
window.onload = () => {
    createPop();
    getAnime();
}