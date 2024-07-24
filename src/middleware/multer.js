const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directorio donde se guardarán los archivos
    cb(null, 'C:\\PDFACTAS');
  },
  filename: (req, file, cb) => {
    // Nombre del archivo en el servidor (usamos el nombre original)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;