module.exports = {
  apps: [
    {
      name: "kopuk-dunyasi",
      script: "node_modules/.bin/next",
      args: "start -p 3007",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3007,
      },
    },
  ],
};
