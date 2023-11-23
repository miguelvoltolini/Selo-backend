let btn_btn= document.querySelector('.btn_btn')
let navbar_ativo = document.querySelector('.navbar')

btn_btn.addEventListener('click', ()=>{
    navbar_ativo.classList.toggle('navbar_ativo')
})


//testee 

document.addEventListener("DOMContentLoaded", function() {
    const quantidadeCarrinho = localStorage.getItem("quantidadeCarrinho");
    atualizarContador(quantidadeCarrinho || 0);
  });
  
  let contador = 0;
  
  function adicionarItem() {
    contador++;
    atualizarContador(contador);
  }
  
  function atualizarContador(valor) {
    const contadorElement = document.getElementById("contadorItens");
    contadorElement.innerText = valor > 0 ? valor : "";
  
    localStorage.setItem("quantidadeCarrinho", valor);
  }
  


  document.getElementById('carrinhoBtn').addEventListener('click', function() {
    // Aqui você pode adicionar lógica adicional, se necessário,
    // antes de redirecionar para a rota /carrinho.
    window.location.href = '/carrinho';
  });