# Scripts de Prueba para el Sistema de Cartas con Fórmulas

## 📋 Scripts Disponibles

### 1. `test-quick-cards.js` - Prueba Rápida (5 cartas)
Script simple para probar el sistema rápidamente con 5 cartas básicas.

### 2. `test-20-study-cards.js` - Prueba Completa (20 cartas)
Script completo con 20 cartas que incluyen diferentes tipos de fórmulas matemáticas.

### 3. `test-integrated-study-cards.js` - Prueba Integrada
Script que prueba el sistema completo con diferentes funcionalidades.

## 🚀 Cómo Usar los Scripts

### Prerequisitos
1. **Servidor ejecutándose**: Asegúrate de que tu servidor esté corriendo en `http://localhost:3000`
2. **Base de datos configurada**: Las tablas deben estar creadas
3. **Variables de entorno**: Cloudinary configurado

### Ejecutar Prueba Rápida
```bash
# Prueba rápida con 5 cartas
node test-quick-cards.js
```

### Ejecutar Prueba Completa
```bash
# Prueba completa con 20 cartas
node test-20-study-cards.js

# Solo verificar cartas existentes
node test-20-study-cards.js --verify

# Limpiar todas las cartas de prueba
node test-20-study-cards.js --cleanup
```

### Ejecutar Prueba Integrada
```bash
# Prueba integrada completa
node test-integrated-study-cards.js

# Limpiar datos de prueba
node test-integrated-study-cards.js --cleanup
```

## 📊 Cartas Incluidas en la Prueba Completa

### Fórmulas Básicas
1. **Teorema de Pitágoras** - `$a^2 + b^2 = c^2$`
2. **Área del Círculo** - `$A = \pi r^2$`
3. **Perímetro del Círculo** - `$C = 2\pi r$`
4. **Área del Triángulo** - `$A = \frac{1}{2}bh$`
5. **Media Aritmética** - `$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$`

### Fórmulas Intermedias
6. **Fórmula Cuadrática** - `$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`
7. **Identidad Trigonométrica** - `$\sin^2(x) + \cos^2(x) = 1$`
8. **Distancia entre Puntos** - `$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`
9. **Ecuación de la Recta** - `$y - y_1 = m(x - x_1)$`
10. **Suma de Cubos** - `$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$`

### Fórmulas Avanzadas
11. **Derivada de Potencia** - `$f'(x) = nx^{n-1}$`
12. **Integral Definida** - `$\int_a^b f(x) dx = F(b) - F(a)$`
13. **Binomio de Newton** - `$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$`
14. **Fórmula de Euler** - `$e^{i\pi} + 1 = 0$`
15. **Límite Fundamental** - `$\lim_{x \to 0} \frac{\sin(x)}{x} = 1$`

### Fórmulas Especializadas
16. **Serie Aritmética** - `$S_n = \frac{n(a_1 + a_n)}{2}$`
17. **Serie Geométrica** - `$S = \frac{a_1}{1 - r}$`
18. **Regla del Producto** - `$(f \cdot g)' = f' \cdot g + f \cdot g'$`
19. **Ecuación Cuadrática Canónica** - `$f(x) = a(x - h)^2 + k$`
20. **Ecuación de la Circunferencia** - `$(x - h)^2 + (y - k)^2 = r^2$`

## 🔍 Qué Verificar

### Durante la Ejecución
- ✅ **Creación exitosa** de cada carta
- ✅ **Detección automática** de fórmulas LaTeX
- ✅ **Procesamiento correcto** de fórmulas
- ✅ **Almacenamiento** en base de datos
- ✅ **URLs de Cloudinary** generadas

### Después de la Ejecución
- 📊 **Total de cartas** creadas
- 🔢 **Cartas con fórmulas** vs sin fórmulas
- 📝 **Total de fórmulas** procesadas
- ❌ **Errores** encontrados (si los hay)

## 🛠️ Solución de Problemas

### Error: "Cannot connect to server"
```bash
# Verificar que el servidor esté corriendo
npm run dev
# o
npm start
```

### Error: "Database connection failed"
```bash
# Verificar configuración de base de datos
# Revisar variables de entorno
# Ejecutar migraciones si es necesario
```

### Error: "Cloudinary upload failed"
```bash
# Verificar credenciales de Cloudinary
# Revisar variables de entorno:
# CLOUDINARY_CLOUD_NAME=dbfkciy1w
# CLOUDINARY_API_KEY=tu_api_key
# CLOUDINARY_API_SECRET=tu_api_secret
```

### Error: "LaTeX rendering failed"
```bash
# Verificar que KaTeX esté instalado
npm install katex
# Verificar sintaxis LaTeX en las fórmulas
```

## 📈 Resultados Esperados

### Prueba Rápida (5 cartas)
- ✅ 4 cartas con fórmulas
- ✅ 1 carta sin fórmulas
- 📝 ~6-8 fórmulas procesadas

### Prueba Completa (20 cartas)
- ✅ 19 cartas con fórmulas
- ✅ 1 carta sin fórmulas
- 📝 ~25-30 fórmulas procesadas
- 🔄 Reutilización de fórmulas duplicadas

## 🧹 Limpieza

### Limpiar Todas las Cartas
```bash
# Limpiar cartas de prueba completa
node test-20-study-cards.js --cleanup

# Limpiar cartas de prueba integrada
node test-integrated-study-cards.js --cleanup
```

### Verificar Limpieza
```bash
# Verificar que no queden cartas
curl http://localhost:3000/api/study-cards
```

## 🎯 Próximos Pasos

1. **Ejecutar prueba rápida** para verificar funcionamiento básico
2. **Ejecutar prueba completa** para verificar todas las funcionalidades
3. **Revisar errores** si los hay y corregirlos
4. **Verificar en base de datos** que las fórmulas se almacenaron correctamente
5. **Probar en frontend** con las URLs de Cloudinary generadas

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del servidor
2. Verifica la configuración de variables de entorno
3. Asegúrate de que todas las dependencias estén instaladas
4. Consulta la documentación del sistema integrado
