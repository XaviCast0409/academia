declare module 'react-native-katex' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  export interface KaTeXProps {
    expression: string;
    style?: ViewStyle;
    onLoad?: () => void;
    onError?: (error: any) => void;
  }

  export const KaTeX: ComponentType<KaTeXProps>;
}
