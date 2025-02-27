import type { NextConfig } from "next";
import { env } from 'process';

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:[new URL(env.apiDomen??"https://localhost:7173").hostname],

  }
};

export default nextConfig;
