import React from 'react';
import { View, Text } from 'react-native';
import { MathJax } from 'react-native-mathjax';

const MathJaxTest: React.FC = () => {
  const mathJaxOptions = {
    messageStyle: 'none',
    extensions: ['tex2jax.js'],
    tex2jax: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
    },
    TeX: {
      equationNumbers: {
        autoNumber: 'none',
      },
    },
    'HTML-CSS': {
      availableFonts: ['STIX'],
      preferredFont: 'STIX',
      webFont: 'STIX-Web',
      imageFont: undefined,
      undefinedFamily: 'serif',
      mtextFontInherit: true,
    },
  };

  const testContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.5;">
      <h3>Prueba de MathJax:</h3>
      
      <p>Fórmula inline: $x^2 + y^2 = z^2$</p>
      
      <p>Fórmula en bloque:</p>
      $$\\frac{a}{b} = \\frac{c}{d}$$
      
      <p>Fórmula con exponentes: $(a^m)^n = a^{m \\cdot n}$</p>
      
      <p>Raíz cuadrada: $\\sqrt{x^2 + y^2}$</p>
      
      <p>Fórmula compleja:</p>
      $$\\int_{0}^{\\infty} e^{-x} dx = 1$$
    </div>
  `;

  return (
    <View style={{ padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
        Prueba de MathJax
      </Text>
      
      <MathJax
        html={testContent}
        mathJaxOptions={mathJaxOptions}
        style={{ width: '100%' }}
        onLoad={() => console.log('MathJax cargado correctamente')}
        onError={(error) => console.warn('Error en MathJax:', error)}
      />
    </View>
  );
};

export default MathJaxTest;
