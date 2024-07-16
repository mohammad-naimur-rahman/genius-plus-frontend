/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  eslint: {
    // This will ignore the ESLint check during builds. As I've set up Husky to run ESLint before, it's not necessary to run it again during builds and it will save some time during builds.
    ignoreDuringBuilds: true
  }
}

export default config
