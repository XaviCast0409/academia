const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para react-native-math-view y fuentes
config.resolver.assetExts.push('ttf');
config.resolver.assetExts.push('otf');

// Configuración adicional para resolver módulos nativos
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Asegurar que react-native-math-view se resuelva correctamente
config.resolver.nodeModulesPaths = [
  require('path').resolve(__dirname, 'node_modules'),
];

module.exports = config; 