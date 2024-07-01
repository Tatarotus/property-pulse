# PropertyPulse

PropertyPulse is a NextJS-based project specializing in off-market real estate investment opportunities. The goal is to make finding and closing on investment or rental properties straightforward and hassle-free. You can explore properties, or get in touch with their owner for more details.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/property-pulse.git
   cd property-pulse
```
 
1. **Install dependencies:** 

```bash
npm install
```
## Configuration 
 
1. **Environment Variables:** 
Create an `.env` file in the root of the project and add your environment variables. Refer to the `env.example` file for required variables.
 
2. **PostCSS Configuration:** 
The PostCSS configuration is managed in `postcss.config.mjs`:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```
 
3. **NextJS Configuration:** 
The NextJS configuration can be found in `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
```
 
4. **JS Configuration:** 
The JS configuration is managed in `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Usage 

To start the development server, run:


```bash
npm run dev
```

Build the project for production:


```bash
npm run build
```


Start the production server:


```bash
npm run start
```


## Features 
 
- **Off-Market Property Listings:**  Browse exclusive off-market properties.
   
- **TailwindCSS Integration:**  Stylish UI with TailwindCSS.
 
- **Map Integration:**  View property locations with Mapbox and react-map-gl.

- **MongoDB Atlas**: Your data is secure in the cloud.

## Scripts 
 
- `dev`: Starts the development server.
 
- `build`: Builds the application for production.
 
- `start`: Starts the production server.
 
- `lint`: Lints the codebase.

## Dependencies 
 
- `cloudinary`
 
- `mapbox-gl`
 
- `mongoose`
 
- `next`
 
- `next-auth`
 
- `node-fetch`
 
- `node-geocoder`
 
- `photoswipe`
 
- `react`
 
- `react-dom`
 
- `react-geocode`
 
- `react-icons`
 
- `react-map-gl`
 
- `react-photoswipe-gallery`
 
- `react-share`
 
- `react-spinners`
 
- `react-toastify`

## Dev Dependencies 
 
- `postcss`
 
- `tailwindcss`

## License 
This project is licensed under the MIT License. See the [LICENSE]()  file for details.
