function calcularTotal() {
  let total = 0;

  document.querySelectorAll('.pedido-card').forEach(function(card) {
    if (!card.dataset.cancelado) {
      total += parseFloat(card.dataset.preco || 0);
    }
  });

  document.getElementById('total-valor').textContent = total.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

document.addEventListener('DOMContentLoaded', calcularTotal);