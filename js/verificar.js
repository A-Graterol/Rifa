// js/verificar.js

// === Generar o recuperar código único ===
function generarCodigoUnico() {
  return 'RIFA-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// === Guardar código si hay compra ===
if (localStorage.getItem('rifa_compra_exitosa') === 'true') {
  let codigo = localStorage.getItem('rifa_codigo_compra');
  if (!codigo) {
    codigo = generarCodigoUnico();
    localStorage.setItem('rifa_codigo_compra', codigo);
  }
  localStorage.setItem('rifa_fecha_compra', new Date().toLocaleString('es-VE'));
}

// === Verificar al enviar ===
document.getElementById('verificar-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const cedulaInput = document.getElementById('cedula-verificar').value.trim();
  const cedulaGuardada = localStorage.getItem('rifa_cedula');

  const noEncontrado = document.getElementById('no-encontrado');
  const ticketInfo = document.getElementById('ticket-info');

  noEncontrado.classList.add('hidden');
  ticketInfo.classList.add('hidden');

  if (
    cedulaInput === cedulaGuardada &&
    localStorage.getItem('rifa_compra_exitosa') === 'true'
  ) {
    document.getElementById('v-nombre').textContent = localStorage.getItem('rifa_nombre') || '—';
    document.getElementById('v-cedula').textContent = cedulaGuardada;
    document.getElementById('v-cantidad').textContent = localStorage.getItem('rifa_qty') || '1';
    document.getElementById('v-codigo').textContent = localStorage.getItem('rifa_codigo_compra') || '—';
    document.getElementById('v-fecha').textContent = localStorage.getItem('rifa_fecha_compra') || '—';

    const metodo = localStorage.getItem('rifa_metodo_pago');
    const metodos = {
      mercantil: 'Pago Móvil Mercantil',
      zelle: 'Zelle',
      binance: 'Binance'
    };
    document.getElementById('v-metodo').textContent = metodos[metodo] || metodo || '—';

    const totalBs = parseFloat(localStorage.getItem('rifa_total_bs')) || 0;
    document.getElementById('v-monto').textContent = 
      totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2 }) + ' Bs.';

    ticketInfo.classList.remove('hidden');
  } else {
    noEncontrado.classList.remove('hidden');
  }
});
