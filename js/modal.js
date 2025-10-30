// js/modal.js

export function initTermsModal() {
  // Crear el modal solo si no existe
  if (document.getElementById('termsModal')) return;

  const modalHTML = `
    <div class="modal fade" id="termsModal" tabindex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="termsModalLabel">Términos y Condiciones</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ol class="ms-3">
              <li>La rifa consta de 100 números únicos.</li>
              <li>El sorteo se realizará el 15 de noviembre de 2025.</li>
              <li>El premio es un Mega Combo Hogar + $15.000 en efectivo.</li>
              <li>Los ganadores serán notificados vía WhatsApp y correo electrónico.</li>
              <li>No hay devoluciones después de la compra.</li>
              <li>El organizador se reserva el derecho de modificar fechas por causas de fuerza mayor.</li>
              <li>Los comprobantes de pago deben enviarse dentro de los 5 minutos posteriores a la compra.</li>
              <li>Al participar, aceptas todos los términos aquí descritos.</li>
            </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}
