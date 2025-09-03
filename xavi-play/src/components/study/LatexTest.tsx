import React from 'react';
import { View, Text } from 'react-native';
import { LaTexRenderer } from './LaTexRenderer';

const LaTexTest: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Prueba de Renderizado LaTeX Mejorado
      </Text>
      
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Fórmula inline: </Text>
      <LaTexRenderer
        content="La fórmula $(a^m)^n = a^{m \cdot n}$ es importante."
        hasLatex={true}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula en bloque:</Text>
      <LaTexRenderer
        content="$$\frac{a}{b} = \frac{c}{d}$$"
        hasLatex={true}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula con exponentes:</Text>
      <LaTexRenderer
        content="La regla $(a^m)^n = a^{m \cdot n}$ se aplica así."
        hasLatex={true}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Tu fórmula específica:</Text>
      <LaTexRenderer
        content="$$x = \frac{7 \times 15}{3} = 35 \text{ soles}$$"
        hasLatex={true}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Texto mixto:</Text>
      <LaTexRenderer
        content="Si 3 libros cuestan $15, ¿cuánto costarán 7 libros? La respuesta es $(a^m)^n = a^{m \cdot n}$"
        hasLatex={true}
      />
    </View>
  );
};

export default LaTexTest;
