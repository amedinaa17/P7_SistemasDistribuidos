const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

let productos = [
  { id: 1, nombre: 'SAMSUNG Galaxy S25', descripcion: 'Tecnología mDNIe y optimización de software.', precio: 15299 },
  { id: 2, nombre: 'HP ProBook 460 G11 Laptop', descripcion: 'Procesador INTEL Core Ultra 5', precio: 16149 },
];

// GET - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// GET - Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send('Producto no encontrado');
  res.json(producto);
});

// POST - Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const producto = {
    id: productos.length + 1,
    nombre,
    descripcion,
    precio
  };
  productos.push(producto);
  res.status(201).json(producto);
});

// PUT - Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send('Producto no encontrado');

  const { nombre, descripcion, precio } = req.body;
  producto.nombre = nombre;
  producto.descripcion = descripcion;
  producto.precio = precio;

  res.json(producto);
});

// DELETE - Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (productoIndex === -1) return res.status(404).send('Producto no encontrado');

  productos.splice(productoIndex, 1);
  res.json({ message: 'Producto eliminado con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
