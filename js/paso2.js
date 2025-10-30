// js/paso2.js

// === Configuración de datos de pago (EDITA ESTOS VALORES) ===
const DATOS_PAGO = {
  mercantil: {
    titulo: "Pago Móvil Mercantil",
    datos: "Titular: María López\nCédula: V-12345678\nTeléfono: 0412-1234567"
  },
  zelle: {
    titulo: "Zelle",
    datos: "Email: rifasoficial@gmail.com\nTitular: María López"
  },
  binance: {
    titulo: "Binance (USDT - TRC20)",
    datos: "Wallet: TABC1234567890XYZ\nRed: TRC20\nTitular: María López"
  }
};

// === Validar datos previos ===
const metodo = localStorage.getItem('rifa_metodo_pago');
const totalBs = parseFloat(localStorage.getItem('rifa_total_bs')) || 0;
const totalUsd = parseFloat(localStorage.getItem('rifa_total_usd')) || 0;

if (!metodo || !totalBs) {
  alert('No se encontró información de pago. Regresando...');
  window.location.href = '../paso1.html';
}

// Mostrar monto
document.getElementById('monto-display').textContent = 
  `Monto a pagar: ${totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs. (${totalUsd.toFixed(2)} USD)`;

// Mostrar datos de pago
const info = DATOS_PAGO[metodo];
const wrapper = document.getElementById('datos-pago-wrapper');
if (info) {
  wrapper.innerHTML = `
    <h5>${info.titulo}</h5>
    <p style="white-space: pre-line; margin: 0.8rem 0;">${info.datos}</p>
    <button class="btn btn-sm btn-outline-success btn-copy">📋 Copiar Datos</button>
  `;
  
  // Añadir evento al botón copiar
  wrapper.querySelector('.btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(info.datos).then(() => {
      const btn = wrapper.querySelector('.btn-copy');
      const original = btn.textContent;
      btn.textContent = '✔ Copiado!';
      setTimeout(() => btn.textContent = original, 2000);
    });
  });
} else {
  wrapper.textContent = "Método de pago no disponible.";
}

// === Vista previa del comprobante ===
document.getElementById('comprobante').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none';
  }
});

// === Enviar comprobante ===
document.getElementById('btn-enviar').addEventListener('click', function() {
  const referencia = document.getElementById('referencia').value.trim();
  const fileInput = document.getElementById('comprobante');
  
  if (!referencia) {
    alert('Por favor, ingresa la referencia bancaria.');
    return;
  }
  if (!fileInput.files.length) {
    alert('Por favor, sube el comprobante de pago.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem('rifa_referencia', referencia);
    localStorage.setItem('rifa_comprobante', reader.result);
    localStorage.setItem('rifa_compra_exitosa', 'true');
    
    alert('¡Comprobante enviado con éxito!\nEl organizador verificará tu pago y te contactará.');
    window.location.href = '../index.html';
  };
  reader.readAsDataURL(file);
});
