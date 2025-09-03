import React from 'react';
import { View, Text } from 'react-native';
import { KaTeX } from 'react-native-katex';

const KaTeXTest: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Prueba de KaTeX
      </Text>
      
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Fórmula inline: </Text>
      <KaTeX
        expression="x^2 + y^2 = z^2"
        style={{ minHeight: 30 }}
        onLoad={() => console.log('KaTeX Inline cargado')}
        onError={(error) => console.warn('Error en KaTeX Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula en bloque:</Text>
      <KaTeX
        expression="\\frac{a}{b} = \\frac{c}{d}"
        style={{ minHeight: 50 }}
        onLoad={() => console.log('KaTeX Display cargado')}
        onError={(error) => console.warn('Error en KaTeX Display:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula con exponentes:</Text>
      <KaTeX
        expression="(a^m)^n = a^{m \\cdot n}"
        style={{ minHeight: 30 }}
        onLoad={() => console.log('KaTeX Inline cargado')}
        onError={(error) => console.warn('Error en KaTeX Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Raíz cuadrada:</Text>
      <KaTeX
        expression="\\sqrt{x^2 + y^2}"
        style={{ minHeight: 30 }}
        onLoad={() => console.log('KaTeX Inline cargado')}
        onError={(error) => console.warn('Error en KaTeX Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Tu fórmula específica:</Text>
      <KaTeX
        expression="x = \\frac{7 \\times 15}{3} = 35 \\text{ soles}"
        style={{ minHeight: 40 }}
        onLoad={() => console.log('KaTeX Display cargado')}
        onError={(error) => console.warn('Error en KaTeX Display:', error)}
      />
    </View>
  );
};

export default KaTeXTest;
