/** @type {import('next').NextConfig} */
const nextConfig = {
  // its line dissapear the error message in the console
  /*
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  }
  */
};

export default nextConfig;
