// Cargar productos
if (document.getElementById('productos')) {
  fetch('http://localhost:3001/api/productos')
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById('productos');
      div.innerHTML = '';
      data.forEach(p => {
        div.innerHTML += `
          <div class="card">
            <img src="img/${p.imagen}">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="price">$${p.precio}</p>
            <button onclick='agregar(${p.id}, ${JSON.stringify(p.nombre)}, ${p.precio})'>
              Agregar al carrito
            </button>
          </div>
        `;
      });
    });
}

// Agregar al carrito
function agregar(id, nombre, precio) {
  fetch('http://localhost:3002/api/carrito', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      producto_id: id,
      nombre,
      precio,
      cantidad: 1
    })
  }).then(() => alert('Producto agregado'));
}

// Mostrar carrito
if (document.getElementById('lista')) {
  fetch('http://localhost:3002/api/carrito')
    .then(res => res.json())
    .then(data => {
      let total = 0;
      const tbody = document.getElementById('lista');
      tbody.innerHTML = '';
        data.forEach(p => {
          total += p.precio * p.cantidad;
          tbody.innerHTML += `
            <tr>
              <td>${p.nombre}</td>
              <td>$${p.precio}</td>
              <td>
                <button class="qty-btn" onclick="cambiarCantidad(${p.id}, ${p.cantidad - 1})">−</button>
                ${p.cantidad}
                <button class="qty-btn" onclick="cambiarCantidad(${p.id}, ${p.cantidad + 1})">+</button>
              </td>
              <td>
                <button onclick="eliminar(${p.id})">❌</button>
              </td>
            </tr>
          `;
        });
      document.getElementById('total').innerText = `Total: $${total}`;
    });
}

// Eliminar producto
function eliminar(id) {
  fetch(`http://localhost:3002/api/carrito/${id}`, {
    method: 'DELETE'
  }).then(() => location.reload());
}

// Finalizar compra
function finalizar() {
  alert('Compra realizada con éxito 🎉');
}

function cambiarCantidad(id, nuevaCantidad) {
  if (nuevaCantidad < 1) return;

  fetch(`http://localhost:3002/api/carrito/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad: nuevaCantidad })
  }).then(() => location.reload());
}
