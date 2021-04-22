module.exports = {
  apps: [
    {
      name: 'ceigh.com',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'node_modules/.bin/nuxt',
      args: 'start'
    }
  ]
}
