#!/usr/bin/env node

const http = require('http')

const healthCheckUrl = process.env.HEALTH_CHECK_URL || 'http://localhost:3000/api/health'

function healthCheck() {
  const url = new URL(healthCheckUrl)

  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method: 'GET',
    timeout: 5000
  }

  const request = http.request(options, response => {
    if (response.statusCode === 200) {
      console.log('✅ Health check passed')
      process.exit(0)
    } else {
      console.error(`❌ Health check failed: ${response.statusCode}`)
      process.exit(1)
    }
  })

  request.on('error', error => {
    console.error(`❌ Health check error: ${error.message}`)
    process.exit(1)
  })

  request.on('timeout', () => {
    console.error('❌ Health check timeout')
    request.destroy()
    process.exit(1)
  })

  request.end()
}

healthCheck()
