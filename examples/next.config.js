// @ts-check

import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: path.join(import.meta.dirname, '..')
  }
};

export default nextConfig;
