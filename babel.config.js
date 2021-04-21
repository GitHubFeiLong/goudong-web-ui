module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~', // `~` 默认
        rootPathSuffix: 'src'
      },
    ]
  ]
};
