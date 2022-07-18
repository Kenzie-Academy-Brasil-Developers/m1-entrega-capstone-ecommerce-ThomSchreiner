let ulVitrine = document.querySelector(".vitrine ul")

// Vitrine
function renderizarVitrine(produtos) {
    ulVitrine.innerHTML = ""

    produtos.forEach((element) => {
        let card = criarCard(element)
        ulVitrine.appendChild(card)
    })
}

renderizarVitrine(data)


function criarCard(produto) {
    let li = document.createElement("li")

    li.innerHTML = `
    <figure>
        <img src="${produto.img}" alt="${produto.nameItem}">
    </figure>
    <article>
        <p>${produto.tag[0]}</p>
        <p>${produto.nameItem}</p>
        <span>${produto.description}</span>
        <p class="preco">R$ ${produto.value},00</p>
        <button id="${produto.id}">${produto.addCart}</button>
    </article>
    `
    return li
}

