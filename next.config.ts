import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
//   output: 'export', // Outputs a Single-Page Application (SPA)
//   distDir: 'build', // Changes the build output directory to `build`
async rewrites() {
    return [
      {
        "source": "/__/auth/:path*",
        "destination": "https://cocktales-23d15.firebaseapp.com/__/auth/:path*"
      },
    ]
  },
}
 
export default nextConfig
