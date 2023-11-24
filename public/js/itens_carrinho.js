const adicionar_carrinho = document.querySelectorAll("#adicionar_carrinho")

adicionar_carrinho.forEach((botao) => {
    botao.addEventListener("click", () => {
      const nome = botao.getAttribute("data-nome")
      const qtde = Number(botao.getAttribute("data-qtde"))
      const preco = Number(botao.getAttribute("data-preco"))
      const item = {nome, qtde, preco };

      // Recupere o carrinho atual do Local Storage
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

      // Adicione o item ao carrinho
      carrinho.push(item)
      console.log(carrinho)

      // Atualize o carrinho no Local Storage
      localStorage.setItem("carrinho", JSON.stringify(carrinho))

    })
})
