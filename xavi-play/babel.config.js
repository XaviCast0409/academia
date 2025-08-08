module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/styles': './src/styles',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/services': './src/services',
            '@/store': './src/store',
            '@/hooks': './src/hooks',
            '@/config': './src/config',
          },
        },
      ],
    ],
  };
}; 