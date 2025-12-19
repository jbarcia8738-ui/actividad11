const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ver carrito
app.get('/api/carrito', async (req, res) => {
  const result = await pool.query('SELECT * FROM carrito');
  res.json(result.rows);
});

// Agregar producto
app.post('/api/carrito', async (req, res) => {
  const { producto_id, nombre, precio, cantidad } = req.body;
  await pool.query(
    'INSERT INTO carrito (producto_id, nombre, precio, cantidad) VALUES ($1,$2,$3,$4)',
    [producto_id, nombre, precio, cantidad]
  );
  res.send('Producto agregado al carrito');
});

// Actualizar cantidad
app.put('/api/carrito/:id', async (req, res) => {
  const { cantidad } = req.body;
  await pool.query(
    'UPDATE carrito SET cantidad = $1 WHERE id = $2',
    [cantidad, req.params.id]
  );
  res.send('Cantidad actualizada');
});


// Eliminar producto
app.delete('/api/carrito/:id', async (req, res) => {
  await pool.query('DELETE FROM carrito WHERE id=$1', [req.params.id]);
  res.send('Producto eliminado');
});

app.listen(3002, () => {
  console.log('Carrito service corriendo en puerto 3002');
});
