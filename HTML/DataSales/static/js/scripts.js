//Objeto que guarda vários elementos do site
const elements = {
    botao: document.querySelector('.switch'),
    head: document.querySelector('header'),
    title: document.querySelector('h1'),
    checkbox: document.getElementById('mode'),
    body: document.querySelector('body'),
    footer: document.querySelector('footer'),

    backButton: document.querySelector('.back'),
    logo: document.querySelector('.Logo_D'),
    logoSol: document.querySelector('.sol'),
    logoLua: document.querySelector('.lua'),
    logoReg: document.querySelector('.reg'),
    logoCons: document.querySelector('.cons'),
    logoRelat: document.querySelector('.relat'),
    logoVenda: document.querySelector('.venda'),
    logoRegis: document.querySelector('.regis'),
    logoProd: document.querySelector('.prod'),
    logoSell: document.querySelector('.sell')
}

//Lista de elementos com o mesmo nome
const links = document.querySelectorAll('.links')
const creators = document.querySelectorAll('.github')

//Função que verifica o tema atual do site
function verifyTheme() {
    //verifica se o tema salvo atualmente está guardado no banco de dados do navegador
    const temaSalvo = localStorage.getItem('tema')

    //Verifica se o botão está ativo no modo escuro ou não
    if (temaSalvo === 'escuro') {
        if (elements.checkbox) { 
            elements.checkbox.checked = true
            mudarTema(true)
        }
    } else {
        if (elements.checkbox) {
            elements.checkbox.checked = false
            mudarTema(false)
        }
    }
}

//Adiciona evento ao clicar no botão de modo
//Dentro de EventListener, pode-se usar function ou usar () =>
if (elements.botao) {
    elements.botao.addEventListener('click', function verify() {
        const newState = !elements.body.classList.contains('dark_body')
        
        //Verifica o estado atual do site
        let temaText
        if (newState === true) {
            temaText = 'escuro'
        } else {
            temaText = 'claro'
        }

        //Outra forma de usar o newState
        //localStorage.setItem('tema', newState ? 'escuro' : 'claro')
        localStorage.setItem('tema', temaText)
        mudarTema(newState)
    })
}


//Função que centraliza as mudanças na tela
function mudarTema(isDark) {
    //Alterações de cor no modo escuro
    if (elements.title) elements.title.classList.toggle('dark_mode',isDark)
    if (elements.head) elements.head.classList.toggle('light_head',isDark)
    if (elements.body) elements.body.classList.toggle('dark_body',isDark)
    if (elements.footer) elements.footer.classList.toggle('light_footer',isDark)
    if (elements.backButton) elements.backButton.classList.toggle('dark_back',isDark)
    
    //Verifica se os links estão no modo escuro ou não
    if (isDark) {
        links.forEach(link => link.classList.add('link_dark'))
        creators.forEach(creator => creator.classList.add('git_dark'))
        //Chama as imagens de modo escuro
        darkMode()
    } else {
        links.forEach(link => link.classList.remove('link_dark'))
        creators.forEach(creator => creator.classList.remove('git_dark'))
        //Chama as imagens de modo claro
        lightMode()
    }

}

//Função para trocar imagens para o modo claro
function lightMode() {
    if (elements.logo) elements.logo.src = "../../static/img/letra-d.png"
    if (elements.logoSol) elements.logoSol.src = "../../static/img/sun.png"
    if (elements.logoLua) elements.logoLua.src = "../../static/img/lua-crescente.png"
    if (elements.logoReg) elements.logoReg.src = "../../static/img/editar.png"
    if (elements.logoCons) elements.logoCons.src = "../../static/img/pesquisa-de-lupa.png"
    if (elements.logoRelat) elements.logoRelat.src = "../../static/img/relatorio.png"
    if (elements.logoVenda) elements.logoVenda.src = "../../static/img/carrinho.png"
    if (elements.logoRegis) elements.logoRegis.src = "../../static/img/registro.png"
    if (elements.logoProd) elements.logoProd.src = "../../static/img/produtos.png"
    if (elements.logoSell) elements.logoSell.src = "../../static/img/venda.png"
}

//Função para trocar imagens para o modo escuro
function darkMode() {
    if (elements.logo) elements.logo.src = "../../static/img/letra-d-dark.png"
    if (elements.logoSol) elements.logoSol.src = "../../static/img/sun-dark.png"
    if (elements.logoLua) elements.logoLua.src = "../../static/img/lua-crescente-dark.png"
    if (elements.logoReg) elements.logoReg.src = "../../static/img/editar-dark.png"
    if (elements.logoCons) elements.logoCons.src = "../../static/img/pesquisa-de-lupa-dark.png"
    if (elements.logoRelat) elements.logoRelat.src = "../../static/img/relatorio-dark.png"
    if (elements.logoVenda) elements.logoVenda.src = "../../static/img/carrinho-dark.png"
    if (elements.logoRegis) elements.logoRegis.src = "../../static/img/registro-dark.png"
    if (elements.logoProd) elements.logoProd.src = "../../static/img/produtos-dark.png"
    if (elements.logoSell) elements.logoSell.src = "../../static/img/venda-dark.png"
}

//Chama a função para verificar o tema do site
verifyTheme()