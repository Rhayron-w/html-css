const botaoNavegacao = document.querySelectorAll(".navegacao-container button"),
containerFormulario = document.querySelector(".container-formulario .formularios"),
barraAtiva = document.querySelector(".barra-ativa"),
containerInfoInterno = document.querySelector(".container-info-interno");

const selectView = (view) => {
    for (let button of botaoNavegacao) {
        button.classList.remove("ativo");
    
    if (button.classList.contains(view)) {
      button.classList.add("ativo");
    }
  }

  if (view === "entrar") {
    containerFormulario.style.top = "0";
    barraAtiva.style.top = "33.33%";
    containerInfoInterno.style.top = "0";
  } else {
    containerFormulario.style.top = "-100%";
    barraAtiva.style.top = "66.66%";
    containerInfoInterno.style.top = "-100%";
  }
};
