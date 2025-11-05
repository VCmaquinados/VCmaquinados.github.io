// Solución para el warning de aria-hidden en modales de Bootstrap
// Previene que el foco quede atrapado en elementos ocultos

document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los modales
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(function(modal) {
    let triggerButton = null;
    
    // Guardar referencia al botón que abrió el modal
    modal.addEventListener('show.bs.modal', function(event) {
      triggerButton = event.relatedTarget || document.activeElement;
    });
    
    // Al empezar a ocultar, quitar el foco de elementos internos
    modal.addEventListener('hide.bs.modal', function() {
      // Mover el foco fuera del modal antes de que se oculte
      const activeElement = document.activeElement;
      if (modal.contains(activeElement)) {
        activeElement.blur();
      }
    });
    
    // Devolver el foco cuando el modal está completamente oculto
    modal.addEventListener('hidden.bs.modal', function() {
      if (triggerButton && typeof triggerButton.focus === 'function') {
        // Pequeño delay para asegurar que el modal esté completamente cerrado
        setTimeout(function() {
          triggerButton.focus();
        }, 100);
      }
    });
  });
});
