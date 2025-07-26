# 🎮 Academia Frontend - Plataforma Educativa Gaming

Una plataforma educativa moderna con temática gaming que utiliza mecánicas de gamificación para motivar el aprendizamiento.

## ✨ Características Principales

- 🎯 **Sistema de Misiones** - Actividades educativas gamificadas
- 🏆 **Sistema de Recompensas** - Xavicoints y experiencia
- 🎖️ **Ranking de Estudiantes** - Competencia sana y motivación
- 🛍️ **Tienda Virtual** - Intercambio de recompensas por productos
- 📱 **Diseño Responsivo** - Optimizado para dispositivos móviles
- 🎨 **Tema Gaming** - Interface inspirada en videojuegos retro

## 🏗️ Arquitectura Refactorizada

### Nueva Estructura Modular
```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   ├── ui/              # UI específica de la app
│   └── [features]/      # Componentes por funcionalidad
├── hooks/
│   └── common/          # Hooks personalizados
├── utils/
│   └── common/          # Utilidades centralizadas
├── theme/               # Sistema de tema unificado
├── shared/              # Exports centralizados
└── ...
```

### Componentes Principales
- 📄 **PageHeader** - Headers consistentes
- 🔄 **LoadingSpinner** - Estados de carga
- 📦 **EmptyState** - Estados vacíos
- ✅ **ConfirmDialog** - Diálogos de confirmación
- 📑 **Pagination** - Paginación unificada
- 🎮 **GameCard** - Tarjetas con estilo gaming

### Hooks Reutilizables
- 📄 **usePagination** - Lógica de paginación
- 🔀 **useModal** - Gestión de modales
- ❓ **useConfirmDialog** - Diálogos de confirmación
- 📱 **useResponsive** - Detección de breakpoints

## 🚀 Tecnologías

### Frontend Core
- ⚛️ **React 18** - Library principal
- 📘 **TypeScript** - Tipado estático
- 🎨 **Material-UI v5** - Sistema de componentes
- 🛣️ **React Router v6** - Navegación

### Estado y Datos
- 🐻 **Zustand** - Gestión de estado global
- 🔄 **Axios** - Cliente HTTP
- 🍪 **JWT** - Autenticación

### Estilo y Tema
- 🎨 **MUI Theme System** - Tema personalizado
- 🎮 **Press Start 2P** - Fuente gaming
- 📱 **Responsive Design** - Mobile-first

### Desarrollo
- ⚡ **Vite** - Build tool rápido
- 🔧 **ESLint** - Linting
- 📦 **pnpm** - Package manager

## 🎯 Roles de Usuario

### 👨‍🎓 Estudiantes
- Ver actividades disponibles
- Completar misiones diarias/semanales
- Subir evidencias de actividades
- Comprar productos con Xavicoints
- Ver ranking y progreso personal
- Gestionar perfil y Pokémon

### 👨‍🏫 Profesores  
- Crear y gestionar actividades
- Revisar evidencias estudiantiles
- Crear productos para la tienda
- Ver transacciones de sus productos
- Gestionar contenido educativo

### 👨‍💼 Administradores
- Gestión completa de usuarios
- Supervisión de todas las actividades
- Gestión de recompensas y productos
- Acceso a reportes y analytics
- Configuración del sistema

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- pnpm 8+

### Instalación
```bash
# Clonar repositorio
git clone <repository-url>
cd front-academia

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_API_KEY=your_api_key
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview build
pnpm preview

# Linting
pnpm lint
```

## 🎮 Funcionalidades Gaming

### Sistema de Experiencia
- **Niveles 1-25** con requisitos progresivos
- **Xavicoints** como moneda virtual
- **Recompensas** por completar actividades

### Mecánicas de Gamificación
- 🎯 **Misiones Diarias** - Tareas recurrentes
- 📅 **Misiones Semanales** - Objetivos a largo plazo
- ⭐ **Misiones Especiales** - Eventos únicos
- 🏆 **Sistema de Ranking** - Competencia entre estudiantes

### Personalización
- 🐾 **Pokémon Avatar** - Representación personalizada
- 🎨 **Temas Visuales** - Interface gaming retro
- 📊 **Progreso Visual** - Barras y medidores

## 📱 Responsive Design

### Breakpoints
- 📱 **Mobile**: < 600px
- 📱 **Tablet**: 600px - 960px  
- 💻 **Desktop**: > 960px

### Optimizaciones Móviles
- Navegación con drawer lateral
- Componentes adaptables
- Touch-friendly interfaces
- Carga optimizada de imágenes

## 🎨 Sistema de Diseño

### Paleta de Colores
```scss
$primary: #E07F3F;    // Naranja principal
$secondary: #0D3745;  // Azul oscuro
$accent: #84341C;     // Marrón acento
$background: rgb(230, 206, 190); // Fondo claro
```

### Tipografía
- **Fuente Principal**: Press Start 2P (Gaming)
- **Jerarquía**: H1-H6 consistente
- **Responsive**: Tamaños adaptativos

### Componentes Base
- Botones con efectos hover
- Cards con sombras y bordes
- Formularios consistentes
- Estados de carga uniformes

## 📊 Rendimiento

### Optimizaciones Implementadas
- ⚡ **Lazy Loading** - Componentes y rutas
- 🗜️ **Code Splitting** - Bundles optimizados
- 🔄 **Memoización** - React.memo y useMemo
- 📦 **Tree Shaking** - Eliminación de código muerto

### Métricas Objetivo
- First Contentful Paint < 2s
- Largest Contentful Paint < 3s
- Cumulative Layout Shift < 0.1

## 🧪 Testing (Próximo Sprint)

### Estrategia de Testing
- **Unit Tests**: Componentes aislados
- **Integration Tests**: Flujos de usuario
- **E2E Tests**: Funcionalidades completas

### Herramientas Planificadas
- Jest + React Testing Library
- Cypress para E2E
- Storybook para componentes

## 🚀 Deployment

### Plataformas Soportadas
- ▲ **Vercel** - Deployment automático
- 🌐 **Netlify** - Alternativa confiable
- 🐳 **Docker** - Containerización

### Pipeline CI/CD
```yaml
build → test → deploy → monitor
```

## 🤝 Contribución

### Convenciones de Código
- **ESLint** - Reglas de estilo
- **Prettier** - Formateo automático
- **TypeScript Strict** - Tipado estricto
- **Conventional Commits** - Mensajes consistentes

### Estructura de Branches
- `main` - Producción estable
- `develop` - Desarrollo activo
- `feature/*` - Nuevas funcionalidades
- `hotfix/*` - Correcciones urgentes

## 📈 Roadmap

### v1.1 (Próximo)
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Logros y medallas
- [ ] Analytics avanzados

### v1.2 (Futuro)
- [ ] Sistema de clanes/grupos
- [ ] Actividades colaborativas  
- [ ] Modo offline
- [ ] App móvil nativa

## 📚 Documentación Adicional

- [Guía de Refactorización](./REFACTORING_GUIDE.md)
- [Componentes UI](./docs/components.md)
- [API Integration](./docs/api.md)
- [Style Guide](./docs/style-guide.md)

## 👥 Equipo de Desarrollo

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Cloud**: Cloudinary + Vercel

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](./LICENSE).

---

🎮 **¡Hecho con ❤️ para revolucionar la educación a través del gaming!**
