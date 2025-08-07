Documentación de Funcionalidades del Usuario Estudiante - Academia App
1. AUTENTICACIÓN Y REGISTRO
1.1 Login
Funcionalidad: Inicio de sesión con email y contraseña
Ruta Frontend: /
Ruta Backend: POST /users/login
Datos requeridos: email, password
Respuesta: token JWT y datos del usuario
1.2 Registro de Usuario
Funcionalidad: Crear nueva cuenta de estudiante
Ruta Frontend: /create-user
Ruta Backend: POST /users/create
Datos requeridos: name, email, password, roleId (2), section
Verificación: Código de verificación por email
1.3 Verificación de Email
Funcionalidad: Verificar cuenta con código enviado por email
Ruta Backend: POST /users/verify-code
Datos requeridos: email, code
2. PERFIL DE USUARIO
2.1 Ver Perfil
Funcionalidad: Visualizar información personal del estudiante
Ruta Frontend: /users/profile
Ruta Backend: GET /users/byId/{id}
Información mostrada:
Nombre del usuario
Email
Sección académica
Nivel actual
Experiencia acumulada
Xavicoints disponibles
Pokémon asignado
Estado de cuenta
2.2 Actualizar Sección
Funcionalidad: Cambiar sección académica
Ruta Backend: PUT /users/{id}
Datos requeridos: section
3. ACTIVIDADES ACADÉMICAS
3.1 Listar Actividades Disponibles
Funcionalidad: Ver todas las actividades disponibles para el estudiante
Ruta Frontend: /users/actividades
Ruta Backend: GET /activities/available/{studentId}
Parámetros: page, limit, section (filtro opcional)
Filtros disponibles:
Todas las secciones
1ro Secundaria
2do Secundaria
3ro Secundaria
4to Secundaria
5to Secundaria
Información mostrada:
Título de la actividad
Descripción
Imágenes de la actividad
Xavicoints a ganar
Dificultad
Sección
Fecha de creación
Profesor responsable
3.2 Ver Detalle de Actividad
Funcionalidad: Ver información completa de una actividad específica
Ruta Frontend: /users/actividades/ver/{id}
Ruta Backend: GET /activities/{id}
Información mostrada:
Título completo
Descripción detallada
Galería de imágenes
Profesor responsable
Xavicoints a ganar
Información adicional
3.3 Enviar Evidencia
Funcionalidad: Subir evidencias para completar una actividad
Ruta Frontend: /users/actividades/evidence/{id}
Ruta Backend: POST /evidences
Datos requeridos:
studentId
studentName
activityId
filePath (array de URLs de imágenes)
status: 'pending'
Características:
Subida de hasta 5 imágenes
Tamaño máximo por archivo: 2MB
Integración con Cloudinary
Validación de archivos
4. EVIDENCIAS ENVIADAS
4.1 Ver Mis Evidencias
Funcionalidad: Listar todas las evidencias enviadas por el estudiante
Ruta Frontend: /users/evidences
Ruta Backend: GET /evidences/student/{studentId}
Parámetros: page, limit
Información mostrada:
Actividad asociada
Profesor responsable
Fecha de envío
Estado de la evidencia:
Pending (Pendiente)
Approved (Aprobada)
Rejected (Rechazada)
Paginación
5. TIENDA DE PRODUCTOS
5.1 Ver Productos Disponibles
Funcionalidad: Explorar productos disponibles para comprar
Ruta Frontend: /users/shop
Ruta Backend: GET /products/get-all
Parámetros: page, professorId (opcional)
Información mostrada:
Nombre del producto
Descripción
Imagen del producto
Precio en Xavicoints
Profesor que lo ofrece
Disponibilidad
5.2 Comprar Producto
Funcionalidad: Realizar compra de productos con Xavicoints
Ruta Backend: POST /transactions/purchase
Datos requeridos: userId, productId
Validaciones:
Saldo suficiente de Xavicoints
Producto disponible
Confirmación de compra
6. TRANSACCIONES
6.1 Ver Historial de Transacciones
Funcionalidad: Consultar historial de compras realizadas
Ruta Frontend: /users/transactions
Ruta Backend: GET /transactions/get-all
Parámetros: page, limit, userId
Información mostrada:
Producto comprado
Precio pagado
Fecha de la transacción
Estado de la transacción
Paginación
7. MISIONES Y LOGROS
7.1 Ver Misiones Activas
Funcionalidad: Consultar misiones disponibles para completar
Ruta Frontend: /users/misiones
Ruta Backend: GET /missions/active
Parámetros: userId
Información mostrada:
Título de la misión
Descripción
Progreso actual
Objetivo a alcanzar
Recompensa disponible
Estado (Activa/Completada)
7.2 Ver Misiones Completadas
Funcionalidad: Ver historial de misiones completadas
Ruta Backend: GET /missions/history
Parámetros: userId
Información mostrada:
Misiones completadas
Fecha de completado
Recompensas obtenidas
7.3 Reclamar Recompensa de Misión
Funcionalidad: Obtener recompensa de misión completada
Ruta Backend: POST /missions/{missionId}/claim
Datos requeridos: userId
8. RANKING Y COMPETENCIA
8.1 Ver Ranking de Estudiantes
Funcionalidad: Consultar ranking de estudiantes por nivel
Ruta Frontend: /users/ranking
Ruta Backend: GET /users
Parámetros: section (filtro opcional)
Información mostrada:
Top 20 estudiantes
Posición en el ranking
Nombre del estudiante
Pokémon asignado
Sección académica
Nivel actual
Experiencia acumulada
Xavicoints disponibles
Filtros disponibles:
Todas las secciones
Por sección específica
8.2 Ver Recompensas Mensuales
Funcionalidad: Consultar sistema de recompensas mensuales
Modal: RewardsModal
Información mostrada:
Recompensas por posición
Criterios de evaluación
Período de evaluación
9. CARACTERÍSTICAS ADICIONALES
9.1 Sistema de Niveles
Funcionalidad: Progresión automática de nivel basada en experiencia
Cálculo: Basado en actividades completadas y misiones
9.2 Sistema de Xavicoints
Funcionalidad: Moneda virtual del sistema
Obtención: Completar actividades y misiones
Uso: Comprar productos en la tienda
9.3 Sistema de Pokémon
Funcionalidad: Asignación de Pokémon como avatar
Visualización: En perfil y ranking
Personalización: Cambio de Pokémon
9.4 Notificaciones y Alertas
Funcionalidad: Alertas para actualización de sección
Componente: UpdateSectionAlert
Funcionalidad: Alertas de WhatsApp
Componente: WhatsAppAlert
10. NAVEGACIÓN Y LAYOUT
10.1 Layout de Usuario
Componente: UserLayout
Características:
Barra de navegación responsiva
Menú móvil
Navegación entre secciones
Perfil de usuario visible
10.2 Rutas Protegidas
Funcionalidad: Acceso restringido por rol
Componente: ProtectedRoute
Rol estudiante: roleId = 2
11. RESPONSIVIDAD Y UX
11.1 Diseño Responsivo
Características:
Adaptación a dispositivos móviles
Breakpoints para diferentes tamaños
Navegación optimizada para móvil
11.2 Tema Retro Gaming
Características:
Fuente "Press Start 2P"
Colores inspirados en Pokémon
Efectos visuales retro
Bordes y sombras estilizados
Esta documentación cubre todas las funcionalidades disponibles para el usuario estudiante en la aplicación Academia, desde la autenticación hasta todas las características de gamificación y gestión académica.
