let ulVitrine = document.querySelector(".vitrine ul")

// Vitrine
function renderizarVitrine(produtos) {
    ulVitrine.innerHTML = ""

    produtos.forEach((element) => {
        let card = cardVitrine(element)
        ulVitrine.appendChild(card)
    })
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

        produtos.forEach((element) => {
            let card = cardCarrinho(element)
            ul.appendChild(card)
        })
    
        divCarrinho.appendChild(ul)
    
        let tabelaPreco = valorCarrinho(produtos)
        divCarrinho.appendChild(tabelaPreco)
    }
}

renderizarCarrinhoDeCompras(carrinho)


function cardCarrinho(produto) {
    let li = document.createElement("li")

    li.innerHTML = `
        <figure>
            <img src="${produto.img}" alt="${produto.nameItem}">
        </figure>

        <div>
            <p>${produto.nameItem}</p>
            <p class="preco">R$ ${produto.value},00</p>
            <button id="${produto.id}">Remover produto</button>
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


