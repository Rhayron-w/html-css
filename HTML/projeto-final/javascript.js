// ========================================
// DADOS INICIAIS
// ========================================

const products = [
    {
        name: "Dipirona Sódica 1g Genérico Medley 10 Comprimidos",
        originalPrice: 4.99,
        finalPrice: 4.47,
        image: "dipirona-medley.webp",
        brand: "Medley"
    },
    {
        name: "Omeprazol 20mg 30 Cápsulas",
        originalPrice: 9.99,
        finalPrice: 8.99,
        image: "omeprazol.webp",
        brand: "Genérico"
    },
    {
        name: "Paracetamol Genérico 500mg",
        originalPrice: 5.99,
        finalPrice: 3.99,
        image: "paracetamol.webp",
        brand: "Genérico"
    },
    {
        name: "Antigripal Genérico",
        originalPrice: 7.99,
        finalPrice: 5.99,
        image: "cimegripe.webp",
        brand: "Genérico"
    },
    {
        name: "Neosaldina 20 Comprimidos",
        originalPrice: 15.99,
        finalPrice: 14.99,
        image: "neosaldina.webp",
        brand: "Neosaldina"
    },
    {
        name: "Soro Fisiológico Sanfar 500ml",
        originalPrice: 5.99,
        finalPrice: 5.47,
        image: "soro-fisiologico.webp",
        brand: "Sanfar"
    }
];

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Escapa caracteres HTML para prevenir XSS
 */
const escapeHtml = (text) => {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

/**
 * Calcula a porcentagem de desconto
 */
const calculateDiscount = (original, final) => {
    return Math.round(((original - final) / original) * 100);
};

// ========================================
// RENDERIZAÇÃO
// ========================================

/**
 * Renderiza os cards de produtos na página
 */
const renderProducts = (productList = []) => {
    const productGrid = document.getElementById("productGrid");
    
    if (!productGrid) {
        console.error("Elemento #productGrid não encontrado!");
        return;
    }

    productGrid.innerHTML = "";

    if (!productList.length) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
                <p style="color: #999; font-size: 1.1rem;">Nenhum produto encontrado.</p>
            </div>
        `;
        return;
    }

    const productHtml = productList.map(product => {
        const discount = calculateDiscount(product.originalPrice, product.finalPrice);
        const escapedName = escapeHtml(product.name);
        
        return `
            <article class="product-card">
                <button class="favorite-icon" aria-label="Adicionar aos favoritos" data-product-id="${escapedName}" title="Favoritar">
                    <i class="fa-regular fa-heart"></i>
                </button>
                
                ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
                
                <div class="product-thumb">
                    <img src="./images/${escapeHtml(product.image)}" alt="${escapedName}" loading="lazy" onerror="this.src='./images/placeholder.jpg'" />
                </div>
                
                <h3>${escapedName}</h3>
                <span class="product-brand">${escapeHtml(product.brand || 'Marca')}</span>
                
                <div class="price-row">
                    <span class="price-original">De: R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>
                    <span class="price-final">Por: R$ ${product.finalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <button class="btn-add" aria-label="Adicionar ${escapedName} ao carrinho" data-product-name="${escapedName}">
                    Adicionar
                </button>
            </article>
        `;
    }).join('');

    productGrid.innerHTML = productHtml;
    
    // Adiciona eventos aos botões
    productGrid.querySelectorAll(".btn-add").forEach(button => {
        const productName = button.dataset.productName;
        const product = productList.find(p => escapeHtml(p.name) === productName);
        if (product) {
            button.addEventListener("click", () => handleAddToCart(button, product));
        }
    });
    
    productGrid.querySelectorAll(".favorite-icon").forEach(button => {
        button.addEventListener("click", () => handleToggleFavorite(button));
    });
};

// ========================================
// FILTROS E ORDENAÇÃO
// ========================================

/**
 * Aplica todos os filtros e ordenação aos produtos
 */
const applyFilters = () => {
    let filtered = [...products];
    
    // 1. Filtro de busca
    const searchBar = document.getElementById("searchBar");
    const query = searchBar ? searchBar.value.trim().toLowerCase() : "";
    
    if (query) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) || 
            (product.brand && product.brand.toLowerCase().includes(query))
        );
    }

    // 2. Filtro de faixa de preço
    const selectedPriceRadio = document.querySelector("input[name='price']:checked");
    
    if (selectedPriceRadio && selectedPriceRadio.dataset.min && selectedPriceRadio.dataset.max) {
        const minPrice = parseFloat(selectedPriceRadio.dataset.min);
        const maxPrice = parseFloat(selectedPriceRadio.dataset.max);
        
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filtered = filtered.filter(product => 
                product.finalPrice >= minPrice && product.finalPrice <= maxPrice
            );
        }
    }

    // 3. Ordenação
    const sortSelect = document.getElementById("sortSelect");
    const sortValue = sortSelect ? sortSelect.value : "popularidade";
    
    switch (sortValue) {
        case "precoAsc":
            filtered.sort((a, b) => a.finalPrice - b.finalPrice);
            break;
        case "precoDesc":
            filtered.sort((a, b) => b.finalPrice - a.finalPrice);
            break;
        case "popularidade":
        default:
            break;
    }

    renderProducts(filtered);
};

// ========================================
// HANDLERS DE EVENTOS
// ========================================

/**
 * Manipula a adição de produto ao carrinho
 */
const handleAddToCart = (button, product) => {
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
    button.disabled = true;
    button.style.background = "#00c853";
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = "";
    }, 1500);
    
    console.log(`Produto adicionado: ${product.name}`);
};

/**
 * Manipula o toggle de favorito
 */
const handleToggleFavorite = (button) => {
    const icon = button.querySelector("i");
    if (!icon) return;
    
    const isFavorited = icon.classList.contains("fa-solid");
    
    if (isFavorited) {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        button.style.color = "";
    } else {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        button.style.color = "#ff4081";
    }
};

/**
 * Manipula o envio do formulário de newsletter
 */
const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    
    if (!name || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }
    
    alert(`Obrigado, ${name}! Você receberá nossas novidades em ${email}.`);
    e.target.reset();
};

// ========================================
// INICIALIZAÇÃO DOS EVENT LISTENERS
// ========================================

const initEventListeners = () => {
    const searchBar = document.getElementById("searchBar");
    const sortSelect = document.getElementById("sortSelect");
    const priceRadios = document.querySelectorAll("input[name='price']");
    const newsletterForm = document.getElementById("newsletterForm");

    if (searchBar) {
        searchBar.addEventListener("input", applyFilters);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", applyFilters);
    }

    priceRadios.forEach(radio => {
        radio.addEventListener("change", applyFilters);
    });

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", handleNewsletterSubmit);
    }
};

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

const init = () => {
    console.log("Inicializando aplicação...");
    console.log("Produtos carregados:", products.length);
    
    initEventListeners();
    renderProducts(products);
};

// Aguarda o DOM estar completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}