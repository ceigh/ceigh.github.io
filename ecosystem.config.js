module.exports = {
  apps: [
    {
      name: 'ceigh.com',
      exec_mode: 'cluster',
      instances: 'max',
      script: '/usr/local/bin/nuxt',
      args: 'start'
    }
  ]
}
