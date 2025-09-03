import React from 'react';
import { View, Text } from 'react-native';
import { MathView } from 'react-native-math-view';

const MathViewTest: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Prueba de MathView
      </Text>
      
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Fórmula inline: </Text>
      <MathView
        math="x^2 + y^2 = z^2"
        style={{ minHeight: 30 }}
        resizeMode="contain"
        onLoad={() => console.log('MathView Inline cargado')}
        onError={(error) => console.warn('Error en MathView Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula en bloque:</Text>
      <MathView
        math="\\frac{a}{b} = \\frac{c}{d}"
        style={{ minHeight: 50 }}
        resizeMode="contain"
        onLoad={() => console.log('MathView Display cargado')}
        onError={(error) => console.warn('Error en MathView Display:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula con exponentes:</Text>
      <MathView
        math="(a^m)^n = a^{m \\cdot n}"
        style={{ minHeight: 30 }}
        resizeMode="contain"
        onLoad={() => console.log('MathView Inline cargado')}
        onError={(error) => console.warn('Error en MathView Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Raíz cuadrada:</Text>
      <MathView
        math="\\sqrt{x^2 + y^2}"
        style={{ minHeight: 30 }}
        resizeMode="contain"
        onLoad={() => console.log('MathView Inline cargado')}
        onError={(error) => console.warn('Error en MathView Inline:', error)}
      />
    </View>
  );
};

export default MathViewTest;
