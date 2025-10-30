// js/paso1.js

// === Cargar datos desde localStorage ===
const qty = parseInt(localStorage.getItem('rifa_qty')) || 1;
const priceBs = parseFloat(localStorage.getItem('rifa_price_bs')) || 0;
const priceUsd = parseFloat(localStorage.getItem('rifa_price_usd')) || 0;

if (!qty || !priceBs) {
  alert('No se encontró información de compra. Regresando al inicio...');
  window.location.href = '../index.html';
}

// Calcular montos
const totalBs = qty * priceBs;
const totalUsd = qty * priceUsd;

// Mostrar monto
document.getElementById('monto-total').innerHTML = `
  <strong>Monto:</strong> ${totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs.
  <br><small>(≈ ${totalUsd.toFixed(2)} USD)</small>
`;

// === Manejar selección de método de pago ===
let selectedMethod = '';
document.querySelectorAll('.payment-method').forEach(method => {
  method.addEventListener('click', () => {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
    selectedMethod = method.getAttribute('data-method');
    document.getElementById('selected-method').value = selectedMethod;
  });
});

// === Enviar formulario ===
document.getElementById('datos-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const cedula = document.getElementById('cedula').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!cedula || !nombre || !correo || !telefono) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (!selectedMethod) {
    alert('Por favor, selecciona un método de pago.');
    return;
  }

  // Guardar en localStorage
  localStorage.setItem('rifa_cedula', cedula);
  localStorage.setItem('rifa_nombre', nombre);
  localStorage.setItem('rifa_correo', correo);
  localStorage.setItem('rifa_telefono', telefono);
  localStorage.setItem('rifa_metodo_pago', selectedMethod);
  localStorage.setItem('rifa_total_bs', totalBs);
  localStorage.setItem('rifa_total_usd', totalUsd);

  window.location.href = 'paso2.html';
});
