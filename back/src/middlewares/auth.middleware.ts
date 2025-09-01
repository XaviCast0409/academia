import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/validations";

// Extender la interfaz Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        roleId: number;
        idRole: number;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
    const decoded = verifyToken(token) as any;
    
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
  } catch (error) {
    console.error("Error en autenticación:", error);
    res.status(401).json({ 
      success: false, 
      message: "Token de acceso inválido o expirado" 
    });
  }
};

// Middleware opcional de autenticación (no requiere token)
export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;

      if (token) {
        try {
          const decoded = verifyToken(token) as any;
          if (decoded && decoded.id) {
            req.user = {
              id: decoded.id,
              roleId: decoded.roleId,
              idRole: decoded.idRole
            };
          }
        } catch (error) {
          // Si hay error con el token, continuar sin usuario
          console.warn("Token opcional inválido:", error);
        }
      }
    }

    next();
  } catch (error) {
    // En caso de error, continuar sin autenticación
    next();
  }
};
