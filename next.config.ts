import type { NextConfig } from "next";

const basePath = '/prikhody';

const nextConfig: NextConfig = {
    basePath,
    output: 'export',
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
};

export default nextConfig;
