const botao = document.querySelector('.switch')
botao.addEventListener('click', modoNoturno)

const head = document.querySelector('header')
const title = document.querySelector('h1')
const checkbox = document.getElementById('mode')
const body = document.querySelector('body')
let links = document.querySelectorAll('.links')
const footer = document.querySelector('footer')
let creators = document.querySelectorAll('.github')

const logo = document.querySelector('.Logo_D')
const logoSol = document.querySelector('.sol')
const logoLua = document.querySelector('.lua')
const logoReg = document.querySelector('.reg')
const logoCons = document.querySelector('.cons')
const logoRelat = document.querySelector('.relat')

function verifyTheme() {
    const temaSalvo = localStorage.getItem('tema')
}

function modoNoturno() {
    title.classList.toggle('dark_mode')
    head.classList.toggle('light_head')
    body.classList.toggle('dark_body')
    footer.classList.toggle('light_footer')
    
    creators.forEach(creator => {
        creator.classList.toggle('git_dark')
    })
    

    links.forEach(link => {
        link.classList.toggle('link-dark')
    })

    if (checkbox.checked) {
        lightMode()  
    } else {
        darkMode()
    }  
}

function lightMode() {
    logo.src = "../img/letra-d.png"
    logoSol.src = "../img/sun.png"
    logoLua.src = "../img/lua-crescente.png"
    logoReg.src = "../img/editar.png"
    logoCons.src = "../img/pesquisa-de-lupa.png"
    logoRelat.src = "../img/relatorio.png"
}

function darkMode() {
    logo.src = "../img/letra-d-dark.png"
    logoSol.src = "../img/sun-dark.png"
    logoLua.src = "../img/lua-crescente-dark.png"
    logoReg.src = "../img/editar-dark.png"
    logoCons.src = "../img/pesquisa-de-lupa-dark.png"
    logoRelat.src = "../img/relatorio-dark.png"
}