import React from 'react';
import { View, Text } from 'react-native';
import { MathJaxSvgInline, MathJaxSvgDisplay } from 'react-native-mathjax-html-to-svg';

const MathJaxSvgTest: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Prueba de MathJax SVG
      </Text>
      
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Fórmula inline: </Text>
      <MathJaxSvgInline
        math="x^2 + y^2 = z^2"
        fontSize={16}
        color="black"
        onLoad={() => console.log('MathJax SVG Inline cargado')}
        onError={(error) => console.warn('Error en MathJax SVG Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula en bloque:</Text>
      <MathJaxSvgDisplay
        math="\\frac{a}{b} = \\frac{c}{d}"
        fontSize={18}
        color="blue"
        onLoad={() => console.log('MathJax SVG Display cargado')}
        onError={(error) => console.warn('Error en MathJax SVG Display:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Fórmula con exponentes:</Text>
      <MathJaxSvgInline
        math="(a^m)^n = a^{m \\cdot n}"
        fontSize={16}
        color="green"
        onLoad={() => console.log('MathJax SVG Inline cargado')}
        onError={(error) => console.warn('Error en MathJax SVG Inline:', error)}
      />
      
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 10 }}>Raíz cuadrada:</Text>
      <MathJaxSvgInline
        math="\\sqrt{x^2 + y^2}"
        fontSize={16}
        color="red"
        onLoad={() => console.log('MathJax SVG Inline cargado')}
        onError={(error) => console.warn('Error en MathJax SVG Inline:', error)}
      />
    </View>
  );
};

export default MathJaxSvgTest;
