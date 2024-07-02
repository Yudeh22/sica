// const express = require("express");
// const TeachableMachine = require("@sashido/teachablemachine-node");
// const bodyParser = require("body-parser");
// const multer = require("multer"); // Importa multer para manejar la carga de archivos

// const model = new TeachableMachine({
//   modelUrl: "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/"
// });

// const app = express();
// const port = process.env.PORT || 5000;

// // Configuración de Multer para manejar la carga de archivos
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.use(express.json());
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send(`
//     <form action="/image/classify" method="POST" enctype="multipart/form-data">
//       <p>Ingrese el link del atún a predecir:</p>
//       <input name="ImageUrl" placeholder="URL de imagen">
//       <p>O cargue una imagen desde su computadora:</p>
//       <input type="file" name="ImageFile">
//       <button type="submit">Predecir</button>
//     </form>
//   `);
// });

// // Ruta para manejar la clasificación de la imagen
// app.post("/image/classify", upload.single("ImageFile"), async (req, res) => {
//   let imageUrl;
//   if (req.file) {
//     // Si se cargó un archivo, utiliza los datos del archivo
//     const imgBuffer = req.file.buffer;
//     imageUrl = `data:${req.file.mimetype};base64,${imgBuffer.toString("base64")}`;
//   } else {
//     // Si no se cargó un archivo, utiliza la URL proporcionada en el formulario
//     imageUrl = req.body.ImageUrl;
//   }

//   return model
//     .classify({
//       imageUrl: imageUrl,
//     })
//     .then((predictions) => {
//       res.json(predictions);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Something went wrong!");
//     });
// });

// app.listen(port, () => {
//   console.log(`Predictor corriendo por el enlace http://localhost:${port}`);
// });


// const express = require("express");
// const cors = require("cors");
// const TeachableMachine = require("@sashido/teachablemachine-node");
// const bodyParser = require("body-parser");
// const multer = require("multer"); // Importa multer para manejar la carga de archivos
// const path = require("path"); // Importa path para servir los archivos estáticos

// const model = new TeachableMachine({
//   modelUrl: "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/"
// });

// const app = express();
// app.use(express.json());
// app.use(bodyParser.json());
// const port = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// // Configuración de Multer para manejar la carga de archivos
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Servir archivos estáticos de React
// app.use(express.static(path.join(__dirname, 'cliente/build')));

// // Ruta para manejar la clasificación de la imagen
// app.post("/image/classify", upload.single("ImageFile"), async (req, res) => {
//   let imageUrl;
//   if (req.file) {
//     // Si se cargó un archivo, utiliza los datos del archivo
//     const imgBuffer = req.file.buffer;
//     imageUrl = `data:${req.file.mimetype};base64,${imgBuffer.toString("base64")}`;
//   } else {
//     // Si no se cargó un archivo, utiliza la URL proporcionada en el formulario
//     imageUrl = req.body.ImageUrl;
//   }

//   return model
//     .classify({ imageUrl: imageUrl })
//     .then((predictions) => {
//       res.json(predictions);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Something went wrong!");
//     });
// });

// // Para todas las demás rutas, sirve el archivo index.html de React
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'cliente/build', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
