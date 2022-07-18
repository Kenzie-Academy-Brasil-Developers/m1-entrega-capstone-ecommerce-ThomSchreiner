let ulVitrine = document.querySelector(".vitrine ul")

// Vitrine
function renderizarVitrine(produtos, categoria = "Todos") {
    ulVitrine.innerHTML = ""
    let contador = 0

    produtos.forEach((element) => {
        if(categoria !== "Todos") {
            if(element.tag[0] == categoria) {
                let card = cardVitrine(element)
                ulVitrine.appendChild(card)
                contador++
            }
        } else {
            let card = cardVitrine(element)
            ulVitrine.appendChild(card)
            contador++
        }
    })
    if(contador == 0) {
        ulVitrine.innerHTML = `
            <p>ESTA CATEGORIA NÃO POSSUI ITENS ANUNCIADOS</p>
        `
    }
}

renderizarVitrine(data)


function cardVitrine(produto) {
    let li = document.createElement("li")

    li.innerHTML = `
    <figure>
        <img src="${produto.img}" alt="${produto.nameItem}">
    </figure>
    <article>
        <p>${produto.tag[0]}</p>
        <p>${produto.nameItem}</p>
        <span>${produto.description}</span>
        <p class="preco">R$ ${produto.value.toFixed(2).replace(".", ",")}</p>
        <button id="${produto.id}">${produto.addCart}</button>
    </article>
    `
    return li
}


// Carrinho de compras
let divCarrinho = document.querySelector(".section-carrinho div")
let carrinho = []

function renderizarCarrinhoDeCompras(produtos) {
    divCarrinho.innerHTML = ""

    if(produtos.length == 0) {
        divCarrinho.innerHTML = `
            <span>Carrinho vazio</span>
            <span>Adicione itens</span>
        `
        
    } else {
        let ul = document.createElement("ul")

        produtos.forEach((element, i) => {
            let card = cardCarrinho(element, i)
            ul.appendChild(card)
        })
    
        divCarrinho.appendChild(ul)
    
        let tabelaPreco = valorCarrinho(produtos)
        divCarrinho.appendChild(tabelaPreco)
    }
}

renderizarCarrinhoDeCompras(carrinho)


function cardCarrinho(produto, index) {
    let li = document.createElement("li")

    li.innerHTML = `
        <figure>
            <img src="${produto.img}" alt="${produto.nameItem}">
        </figure>

        <div>
            <p>${produto.nameItem}</p>
            <p class="preco">R$ ${produto.value},00</p>
            <button id="${index}">Remover produto</button>
        </div>
    `
    return li
}


function valorCarrinho(produtos) {
    let table = document.createElement("table")
    let valorTotal = 0
    produtos.forEach((element) => {
        valorTotal += element.value
    })

    table.innerHTML = `
        <tr>
            <th>Quantidade: </th>
            <td>${produtos.length}</td>
        </tr>
        <tr>
            <th>Total: </th>
            <td>R$ ${valorTotal.toFixed(2).replace(".", ",")}</td>
        </tr>
    `
    return table
}

// Botão Adicionar ao Carrinho
ulVitrine.addEventListener("click", adicionarAoCarrinho)

function adicionarAoCarrinho(event) {
    if(event.target.tagName == "BUTTON") {
        carrinho.push(data[event.target.id - 1])
        renderizarCarrinhoDeCompras(carrinho)
    }
}

// Botão Remover do Carrinho
divCarrinho.addEventListener("click", removerDoCarrinho)

function removerDoCarrinho(event) {
    if(event.target.tagName == "BUTTON") {
        carrinho.splice(event.target.id, 1)
        renderizarCarrinhoDeCompras(carrinho)
    }
}

// Menu de Navegação
let tagNav = document.querySelector("header nav")
tagNav.addEventListener("click", categorias)

function categorias(event) {
    if(event.target.tagName == "BUTTON") {
        estiloCategorias(event.target)
        renderizarVitrine(data, event.target.innerText)
    }
}

function estiloCategorias(btn = tagNav.firstElementChild) {
    for(let i = 0; i < tagNav.children.length; i++) {
        tagNav.children[i].classList.remove("btn-atual")
    }
    btn.className = "btn-atual"
}

// Barra de Pesquisa
let sectionPesquisa = document.querySelector(".section-pesquisa")
let input = sectionPesquisa.children[0]

sectionPesquisa.addEventListener("click", (event) => {
    if(event.target.tagName == "BUTTON") {
        pesquisarProduto()
    }
})

input.addEventListener("keyup", (event) => {
    if(event.key == "Enter") {
        pesquisarProduto()
    }
})

function pesquisarProduto() {
    estiloCategorias()
    let produtosFiltrados = []

    produtosFiltrados = data.filter((element) => {
        let inputTratado = input.value.toLowerCase().trim()
        let produto = element.nameItem.toLowerCase()
        let categoria = element.tag[0].toLowerCase()
        
        if(produto.includes(inputTratado) || categoria.includes(inputTratado)) {
            return element
        }
    })

    input.value = ""
    renderizarVitrine(produtosFiltrados)
}
