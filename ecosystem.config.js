module.exports = {
<<<<<<< HEAD
  apps : [{
    name: 'livesync',
    script: 'dist/main.js',
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
=======
  apps: [
    {
      name: 'livesync',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
>>>>>>> 6b1ecba60075d1f03c797823146b90d1390bc90f
};
