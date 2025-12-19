const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


// ver productos
app.get('/api/productos', async (req, res) => {
  const result = await pool.query('SELECT * FROM productos');
  res.json(result.rows);
});


//ver un producto por id
app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

//agregar producto
app.post('/api/productos', async (req, res) => {
  const { nombre, precio, descripcion } = req.body;
    await pool.query(
    'INSERT INTO productos (nombre, precio, descripcion) VALUES ($1, $2, $3)',
    [nombre, precio, descripcion]
  );
  res.send('Producto agregado');
});

//actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  await pool.query(
    'UPDATE productos SET nombre = $1, precio = $2, descripcion = $3 WHERE id = $4',
    [nombre, precio, descripcion, id]
  );
  res.send('Producto actualizado');
});

//eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM productos WHERE id = $1', [id]);
  res.send('Producto eliminado');
});





app.listen(3001, () => {
  console.log('Productos service corriendo en puerto 3001');
});
