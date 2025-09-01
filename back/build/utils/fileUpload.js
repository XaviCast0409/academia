"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración del almacenamiento de archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../uploads")); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Solo se permiten archivos PDF"));
    }
};
// Configuración de multer
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});
// Función para manejar la subida de un archivo
const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No se proporcionó ningún archivo"));
        }
        resolve(file.path); // Retorna la ruta del archivo subido
    });
};
exports.uploadFile = uploadFile;
// Middleware para usar en las rutas
exports.uploadMiddleware = upload.single("file"); // "file" es el nombre del campo en el formulario
