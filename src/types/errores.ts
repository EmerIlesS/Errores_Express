import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Middleware para analizar JSON
app.use(express.json());

// 200 - OK
app.get('/saludo', (req: Request, res: Response) => {
  res.status(200).json({ mensaje: 'Hola, bienvenido!' });
});

// 201 - Created
app.post('/crear-usuario', (req: Request, res: Response) => {
  // Lógica para crear usuario
  res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
});

// 204 - No Content
app.delete('/borrar-dato', (req: Request, res: Response) => {
  // Lógica para borrar datos
  res.status(204).send(); // Sin contenido
});

// 301 - Moved Permanently
app.get('/antigua-ruta', (req: Request, res: Response) => {
  res.redirect(301, '/nueva-ruta');
});

// 302 - Found
app.get('/ruta-temporal', (req: Request, res: Response) => {
  res.redirect(302, '/ruta-principal');
});

// 400 - Bad Request
app.post('/validar', (req: Request, res: Response) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).send("Solicitud incorrecta: falta el nombre");
  }
  res.json({ mensaje: `Hola, ${nombre}` });
});

// 401 - Unauthorized
app.get('/perfil', (req: Request, res: Response) => {
  const autenticado = false; // Ejemplo de autenticación
  if (!autenticado) {
    return res.status(401).send("No autorizado: inicia sesión");
  }
  res.json({ mensaje: 'Perfil de usuario' });
});

// 403 - Forbidden
app.get('/admin', (req: Request, res: Response) => {
  const esAdmin = false; // Ejemplo de autorización
  if (!esAdmin) {
    return res.status(403).send("Prohibido: acceso denegado");
  }
  res.json({ mensaje: 'Panel de administrador' });
});

// 404 - Not Found
app.use((req: Request, res: Response) => {
  res.status(404).send("Ruta no encontrada");
});

// 429 - Too Many Requests
app.get('/limitado', (req: Request, res: Response) => {
  res.status(429).send("Demasiadas solicitudes, intente más tarde");
});

// 500 - Internal Server Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// 502 - Bad Gateway
app.get('/gateway-error', (req: Request, res: Response) => {
  res.status(502).send("Error de gateway");
});

// 503 - Service Unavailable
app.get('/servicio', (req: Request, res: Response) => {
  res.status(503).send("Servicio no disponible");
});

// 504 - Gateway Timeout
app.get('/tiempo-espera', (req: Request, res: Response) => {
  res.status(504).send("Tiempo de espera de gateway excedido");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
