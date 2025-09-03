declare module 'react-native-math-view' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  export interface MathViewProps {
    math: string;
    style?: ViewStyle;
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
    onLoad?: () => void;
    onError?: (error: any) => void;
  }

  export interface MathViewInlineProps extends MathViewProps {
    // Props específicas para inline
  }

  export interface MathViewDisplayProps extends MathViewProps {
    // Props específicas para display
  }

  export const MathView: ComponentType<MathViewProps>;
  export const MathViewInline: ComponentType<MathViewInlineProps>;
  export const MathViewDisplay: ComponentType<MathViewDisplayProps>;
}
