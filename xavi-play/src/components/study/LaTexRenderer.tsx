import React from 'react';
import { View, Text } from 'react-native';
import { designTokens } from '@/styles/designTokens';

interface LaTexRendererProps {
  content: string;
  hasLatex: boolean;
  style?: any;
  mathStyle?: any;
}

export const LaTexRenderer: React.FC<LaTexRendererProps> = ({
  content,
  hasLatex,
  style,
  mathStyle,
}) => {




  

  // Renderizado temporal como fallback
  const renderTemporaryLatex = (content: string) => {
    // Detectar y separar fórmulas en bloque $$...$$
    const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
    const blockMatches = content.match(blockMathRegex);
    
    if (blockMatches && blockMatches.length > 0) {
      const parts = content.split(blockMathRegex);
      
      return (
        <View style={{ flexWrap: 'wrap', width: '100%' }}>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // Es contenido matemático en bloque
              return (
                <View key={index} style={{
                  backgroundColor: '#f0f9ff',
                  padding: designTokens.spacing.sm,
                  borderRadius: designTokens.borderRadius.md,
                  borderLeftWidth: 3,
                  borderLeftColor: '#3b82f6',
                  marginVertical: designTokens.spacing.xs,
                  alignSelf: 'center',
                  width: '100%',
                  maxWidth: '100%',
                }}>
                  <Text style={{
                    fontFamily: 'monospace',
                    fontSize: 14,
                    color: '#1e40af',
                    lineHeight: 20,
                    textAlign: 'center',
                    fontWeight: '600',
                    flexWrap: 'wrap',
                  }}>
                    {part.trim()}
                  </Text>
                  <Text style={{
                    fontSize: 9,
                    color: '#64748b',
                    marginTop: 4,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                    📐 Fórmula matemática
                  </Text>
                </View>
              );
            } else if (part.trim()) {
              // Es texto normal - puede contener fórmulas inline
              return (
                <View key={index} style={{ width: '100%' }}>
                  {renderInlineMath(part.trim())}
                </View>
              );
            }
            return null;
          })}
        </View>
      );
    }

    // Si no hay fórmulas en bloque, procesar solo fórmulas inline
    return renderInlineMath(content);
  };

  const renderInlineMath = (text: string) => {
    // Detectar fórmulas inline $...$
    const inlineMathRegex = /\$([^$]+)\$/g;
    const inlineMatches = text.match(inlineMathRegex);
    
    if (inlineMatches && inlineMatches.length > 0) {
      const parts = text.split(inlineMathRegex);
      
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // Es contenido matemático inline
              return (
                <View key={index} style={{
                  backgroundColor: '#fef3c7',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginHorizontal: 1,
                  borderWidth: 1,
                  borderColor: '#f59e0b',
                  alignSelf: 'flex-start',
                }}>
                  <Text style={{
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: '#d97706',
                    fontWeight: '600',
                    lineHeight: 18,
                  }}>
                    {part}
                  </Text>
                </View>
              );
            } else if (part.trim()) {
              // Es texto normal
              return (
                <Text key={index} style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: designTokens.colors.text.primary,
                  flexWrap: 'wrap',
                  ...style,
                }}>
                  {part}
                </Text>
              );
            }
            return null;
          })}
        </View>
      );
    }

    // Si no hay fórmulas inline, mostrar como texto normal
    return (
      <Text style={{
        fontSize: 16,
        lineHeight: 24,
        color: designTokens.colors.text.primary,
        flexWrap: 'wrap',
        ...style,
      }}>
        {text}
      </Text>
    );
  };

  // Si no tiene LaTeX o no contiene símbolos $, renderizar como texto normal
  if (!hasLatex || !content.includes('$')) {
    return (
      <Text style={style}>
        {content}
      </Text>
    );
  }

  // Renderizar con soporte LaTeX usando renderizado mejorado
  return renderTemporaryLatex(content);
};

// Hook para usar más fácil
export const useLatexRenderer = () => {
  const renderLatex = (content: string, hasLatex: boolean, style?: any) => (
    <LaTexRenderer content={content} hasLatex={hasLatex} style={style} />
  );
  return { renderLatex };
};
