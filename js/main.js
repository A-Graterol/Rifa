// js/main.js

import { initTermsModal } from './modal.js';

// === Configuración editable ===
const USD_PRICE_PER_TICKET = 10;
const TOTAL_NUMBERS = 100;
const SOLD_NUMBERS = 23; // Simulación (más adelante desde backend)

// === Elementos del DOM ===
const priceDisplay = document.getElementById('price-display');
const progressBar = document.getElementById('progress-bar');
const availabilityEl = document.getElementById('availability');
const selectedQtyInput = document.getElementById('selected-qty');

// === Función para obtener la tasa del BCV ===
async function fetchTasaBCV() {
  try {
    const response = await fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/monitor');
    const data = await response.json();
    
    // Extraer la tasa del BCV
    const bcvRate = data?.monitors?.bcv?.price;
    
    if (!bcvRate || isNaN(bcvRate)) {
      throw new Error('Tasa BCV no disponible');
    }
    
    return parseFloat(bcvRate);
  } catch (error) {
    console.warn('⚠️ No se pudo obtener la tasa del BCV. Usando valor predeterminado.');
    return 36.50; // Valor de respaldo
  }
}

// === Inicializar la página ===
async function initPage() {
  // Iniciar modal
  initTermsModal();

  // Obtener tasa automática
  const TASA_BCV = await fetchTasaBCV();
  const priceBs = USD_PRICE_PER_TICKET * TASA_BCV;
  const available = TOTAL_NUMBERS - SOLD_NUMBERS;
  const percentSold = Math.round((SOLD_NUMBERS / TOTAL_NUMBERS) * 100);

  // Actualizar UI
  priceDisplay.textContent = `Bs. ${priceBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  progressBar.style.width = `${percentSold}%`;
  progressBar.textContent = `${percentSold}%`;
  availabilityEl.textContent = `${available} números disponibles`;

  // Eventos de botones
  document.querySelectorAll('.btn-ticket').forEach(btn => {
    btn.addEventListener('click', () => {
      const qty = parseInt(btn.getAttribute('data-qty'));
      selectedQtyInput.value = qty;
      document.querySelectorAll('.btn-ticket').forEach(b => b.classList.remove('btn-primary', 'text-white'));
      btn.classList.add('btn-primary', 'text-white');
    });
  });

  document.getElementById('btn-comprar')?.addEventListener('click', () => {
    const qty = parseInt(selectedQtyInput.value);
    if (qty > available) {
      alert(`Solo quedan ${available} números disponibles.`);
      return;
    }
    localStorage.setItem('rifa_qty', qty);
    localStorage.setItem('rifa_price_bs', priceBs);
    localStorage.setItem('rifa_price_usd', USD_PRICE_PER_TICKET);
    window.location.href = 'paso1.html';
  });

  document.getElementById('btn-verificar')?.addEventListener('click', () => {
    window.location.href = 'verificar.html';
  });

  // Fallback logo
  const logo = document.getElementById('logo');
  if (logo) {
    logo.onerror = () => {
      logo.src = 'https://via.placeholder.com/150x60?text=LOGO';
    };
  }
}

// === Ejecutar cuando el DOM esté listo ===
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
