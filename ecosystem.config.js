module.exports = {
  apps: [
    {
      name: 'ceigh.com',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'nuxt',
      args: 'start'
    }
  ]
}
