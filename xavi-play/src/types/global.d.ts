declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare module 'react-native-paper' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      background: string;
      surface: string;
      onPrimary: string;
      onSecondary: string;
      onError: string;
      onBackground: string;
      onSurface: string;
    };
  }
  
  export const MD3LightTheme: Theme;
  export const Provider: React.ComponentType<any>;
  export const TextInput: React.ComponentType<any> & {
    Icon: React.ComponentType<any>;
  };
  export const Button: React.ComponentType<any>;
  export const Surface: React.ComponentType<any>;
} 