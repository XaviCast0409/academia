declare module 'react-native-mathjax-html-to-svg' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  export interface MathJaxSvgProps {
    fontSize?: number;
    color?: string;
    width?: number;
    style?: ViewStyle;
    onLoad?: () => void;
    onError?: (error: any) => void;
  }

  export interface MathJaxSvgInlineProps extends MathJaxSvgProps {
    math: string;
  }

  export interface MathJaxSvgDisplayProps extends MathJaxSvgProps {
    math: string;
  }

  export const MathJaxSvgInline: ComponentType<MathJaxSvgInlineProps>;
  export const MathJaxSvgDisplay: ComponentType<MathJaxSvgDisplayProps>;
}
