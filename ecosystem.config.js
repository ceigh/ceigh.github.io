module.exports = {
  apps: [
    {
      name: 'blog',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'nuxt',
      args: 'start'
    }
  ]
}
