"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const validations_1 = require("../utils/validations");
const authMiddleware = (req, res, next) => {
    try {
        // Obtener token del header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "Token de acceso requerido"
            });
            return;
        }
        // Verificar formato "Bearer token"
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token de acceso inválido"
            });
            return;
        }
        // Verificar y decodificar token
        const decoded = (0, validations_1.verifyToken)(token);
        if (!decoded || !decoded.id) {
            res.status(401).json({
                success: false,
                message: "Token de acceso inválido o expirado"
            });
            return;
        }
        // Agregar información del usuario al request
        req.user = {
            id: decoded.id,
            roleId: decoded.roleId,
            idRole: decoded.idRole
        };
        next();
    }
    catch (error) {
        console.error("Error en autenticación:", error);
        res.status(401).json({
            success: false,
            message: "Token de acceso inválido o expirado"
        });
    }
};
exports.authMiddleware = authMiddleware;
// Middleware opcional de autenticación (no requiere token)
const optionalAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.startsWith('Bearer ')
                ? authHeader.slice(7)
                : authHeader;
            if (token) {
                try {
                    const decoded = (0, validations_1.verifyToken)(token);
                    if (decoded && decoded.id) {
                        req.user = {
                            id: decoded.id,
                            roleId: decoded.roleId,
                            idRole: decoded.idRole
                        };
                    }
                }
                catch (error) {
                    // Si hay error con el token, continuar sin usuario
                    console.warn("Token opcional inválido:", error);
                }
            }
        }
        next();
    }
    catch (error) {
        // En caso de error, continuar sin autenticación
        next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
