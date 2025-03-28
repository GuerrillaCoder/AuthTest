const { readFileSync } = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... your other config options ...
    
    // Add HTTPS configuration for development
    devServer: {
        https: {
            key: readFileSync(path.join(process.cwd(), 'certificates', 'localhost+2-key.pem')),
            cert: readFileSync(path.join(process.cwd(), 'certificates', 'localhost+2.pem'))
        }
    }
}

module.exports = nextConfig