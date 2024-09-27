document.addEventListener("DOMContentLoaded", () => {
    const addDetailButton = document.getElementById('addDetail');
    const detallesContainer = document.getElementById('detallesContainer');
    const ventaForm = document.getElementById('ventaForm');
  
    // Función para agregar un nuevo detalle
    const agregarDetalle = () => {
      const nuevoDetalle = document.createElement('div');
      nuevoDetalle.classList.add('detalle');
      nuevoDetalle.innerHTML = `
        <label>ID Producto:</label>
        <input type="number" class="idproducto" required>
        <label>Cantidad:</label>
        <input type="number" class="cantidad" required>
        <label>Precio:</label>
        <input type="number" class="precio" step="0.01" required>
      `;
      detallesContainer.appendChild(nuevoDetalle);
    };
  
    // Función para enviar el formulario
    const enviarVenta = async (e) => {
      e.preventDefault();
  
      const idcliente = ventaForm.idcliente.value;
      const total = ventaForm.total.value;
      const detalles = Array.from(document.querySelectorAll('.detalle')).map(detalle => ({
        idproducto: detalle.querySelector('.idproducto').value,
        cantidad: detalle.querySelector('.cantidad').value,
        precio: detalle.querySelector('.precio').value
      }));
  
      const venta = { idcliente, total, detalles };
  
      try {
        const response = await fetch('http://localhost:4000/api/ventas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(venta)
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(`Venta creada con éxito: ${data.idventa}`);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error al crear la venta:', error);
      }
    };
  
    // Event listeners
    addDetailButton.addEventListener('click', agregarDetalle);
    ventaForm.addEventListener('submit', enviarVenta);
  });
  