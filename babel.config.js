module.exports = (() => {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ],
      '@babel/preset-typescript'
    ]
  }

  if (process.env.NODE_ENV === 'test') {
    config.presets[0][1] = {
      modules: 'auto',
      targets: {
        node: 'current'
      }
    }
    config.plugins = [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  }

  return config
})()
