# Componentes Reutilizables

Esta carpeta contiene componentes reutilizables para toda la aplicación. Todos los componentes están construidos sobre Material-UI y son completamente personalizables.

## Componentes Disponibles

### 1. InputField
Campo de entrada de texto con validación y estilos personalizables.

```tsx
import { InputField } from '@/utils'

<InputField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  error={!!emailError}
  helperText={emailError}
  placeholder="Ingresa tu email"
  required
  fullWidth
  sx={{ mb: 2 }}
/>
```

### 2. SelectField
Campo de selección con opciones personalizables.

```tsx
import { SelectField, SelectOption } from '@/utils'

const options: SelectOption[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'user', label: 'Usuario' },
  { value: 'guest', label: 'Invitado' }
]

<SelectField
  label="Rol"
  value={role}
  onChange={(value) => setRole(value)}
  options={options}
  error={!!roleError}
  helperText={roleError}
  required
  fullWidth
/>
```

### 3. SearchField
Campo de búsqueda con autocompletado y debounce.

```tsx
import { SearchField, SearchOption } from '@/utils'

const [searchResults, setSearchResults] = useState<SearchOption[]>([])
const [selectedUser, setSelectedUser] = useState<SearchOption | null>(null)

<SearchField
  label="Buscar usuario"
  placeholder="Escribe el nombre del usuario..."
  options={searchResults}
  value={selectedUser}
  onChange={setSelectedUser}
  onSearch={(query) => {
    // Lógica de búsqueda
    searchUsers(query)
  }}
  loading={isSearching}
  debounceMs={500}
  fullWidth
/>
```

### 4. Button
Botón personalizable con diferentes variantes y estados.

```tsx
import { Button } from '@/utils'
import { Save as SaveIcon } from '@mui/icons-material'

<Button
  variant="contained"
  color="primary"
  size="medium"
  onClick={handleSave}
  loading={isSaving}
  loadingText="Guardando..."
  startIcon={<SaveIcon />}
  fullWidth
  sx={{ mt: 2 }}
>
  Guardar
</Button>
```

### 5. Card
Tarjeta reutilizable con diferentes opciones de contenido.

```tsx
import { Card, Button } from '@/utils'

<Card
  title="Usuario"
  subtitle="admin@example.com"
  description="Administrador del sistema"
  image="/avatar.jpg"
  actions={
    <Box display="flex" gap={1}>
      <Button size="small" variant="outlined">Editar</Button>
      <Button size="small" color="error" variant="outlined">Eliminar</Button>
    </Box>
  }
  onClick={() => handleCardClick(user)}
  hover
  sx={{ maxWidth: 300 }}
/>
```

### 6. Modal
Modal reutilizable con diferentes tamaños y opciones.

```tsx
import { Modal, Button } from '@/utils'

const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar eliminación"
  description="¿Estás seguro de que quieres eliminar este elemento?"
  maxWidth="sm"
  actions={
    <Box display="flex" gap={1}>
      <Button variant="outlined" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button color="error" onClick={handleDelete}>
        Eliminar
      </Button>
    </Box>
  }
>
  <Typography>Esta acción no se puede deshacer.</Typography>
</Modal>
```

### 7. Table
Tabla reutilizable con paginación, ordenamiento y filtros.

```tsx
import { Table, TableColumn } from '@/utils'

const columns: TableColumn[] = [
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Rol' },
  { 
    id: 'actions', 
    label: 'Acciones',
    align: 'center',
    render: (_, row) => (
      <Box display="flex" gap={1}>
        <Button size="small" variant="outlined">Editar</Button>
        <Button size="small" color="error" variant="outlined">Eliminar</Button>
      </Box>
    )
  }
]

<Table
  columns={columns}
  data={users}
  loading={isLoading}
  error={error}
  page={page}
  rowsPerPage={rowsPerPage}
  totalRows={totalUsers}
  onPageChange={setPage}
  onRowsPerPageChange={setRowsPerPage}
  sortBy={sortBy}
  sortDirection={sortDirection}
  onSort={handleSort}
  emptyMessage="No hay usuarios disponibles"
/>
```

### 8. Loading
Componente de carga con diferentes variantes.

```tsx
import { Loading } from '@/utils'

// Carga circular simple
<Loading type="circular" message="Cargando datos..." />

// Carga de pantalla completa
<Loading 
  type="circular" 
  fullScreen 
  message="Procesando..." 
/>

// Carga con overlay
<Loading 
  type="linear" 
  overlay 
  message="Guardando cambios..." 
/>

// Skeleton loading
<Loading type="skeleton" size="large" />
```

### 9. Alert
Componente de alerta con diferentes tipos y opciones.

```tsx
import { Alert } from '@/utils'

// Alerta de éxito
<Alert
  severity="success"
  title="Éxito"
  message="Los datos se guardaron correctamente"
  dismissible
  autoHide
  autoHideDuration={5000}
/>

// Alerta de error
<Alert
  severity="error"
  title="Error"
  message="No se pudo guardar los datos"
  variant="filled"
  action={
    <Button size="small" color="inherit">
      Reintentar
    </Button>
  }
/>
```

## Características Comunes

Todos los componentes comparten las siguientes características:

- **Personalización de estilos**: Prop `sx` para estilos personalizados
- **Clases CSS**: Prop `className` para clases personalizadas
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Soporte completo para lectores de pantalla
- **TypeScript**: Tipado completo para mejor desarrollo
- **Tema**: Integración con el tema de Material-UI

## Uso de Estilos

Puedes personalizar los estilos de cualquier componente usando la prop `sx`:

```tsx
<InputField
  label="Campo personalizado"
  sx={{
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#f5f5f5',
      '&:hover': {
        backgroundColor: '#eeeeee',
      },
    },
    mb: 2,
    maxWidth: 400,
  }}
/>
```

## Mejores Prácticas

1. **Reutilización**: Usa estos componentes en lugar de crear nuevos
2. **Consistencia**: Mantén un diseño consistente en toda la aplicación
3. **Accesibilidad**: Siempre incluye labels y descripciones apropiadas
4. **Performance**: Usa los componentes de manera eficiente
5. **Testing**: Los componentes están diseñados para ser fácilmente testables 