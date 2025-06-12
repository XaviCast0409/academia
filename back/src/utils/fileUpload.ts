import multer from "multer";
import path from "path";
import { Request } from "express";

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Filtro para validar el tipo de archivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ["application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"));
  }
};

// Configuración de multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

// Función para manejar la subida de un archivo
export const uploadFile = (file?: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No se proporcionó ningún archivo"));
    }
    resolve(file.path); // Retorna la ruta del archivo subido
  });
};

// Middleware para usar en las rutas
export const uploadMiddleware = upload.single("file"); // "file" es el nombre del campo en el formulario