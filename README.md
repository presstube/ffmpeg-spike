# FFmpeg WASM Spike

This project demonstrates a basic setup for using FFmpeg in the browser with WebAssembly (WASM) without relying on any CDN. It uses npm and locally downloaded FFmpeg core and WASM files, built with Vite.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

The example script initializes FFmpeg, loads the core and WASM files locally, transcodes a sample video, and displays the result in the browser.

### Vite Setup

The project uses Vite for development and build processes. Key configurations in `vite.config.js` include:

- **`optimizeDeps.exclude`**: Prevents Vite from pre-bundling `@ffmpeg/ffmpeg` and `@ffmpeg/util` to avoid issues with their dependencies.
- **`server.headers`**: Sets security headers, including `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`, necessary for running WASM in some browsers.
- **`base`**: Sets the base URL for the app, useful for deploying to GitHub Pages.
- **`build.outDir`**: Specifies the output directory for the build files (`docs`), which can be served by GitHub Pages.

## Running the Project

- **Development**: To start a development server, run:

  ```sh
  npm run dev
  ```

  This will start a Vite dev server, and you can view the project at `http://localhost:3000`.

- **Build**: To build the project for production, run:

  ```sh
  npm run build
  ```

  This will generate static files in the `docs` directory.

- **Preview**: To preview the build locally, run:

  ```sh
  npm run preview
  ```

  This will serve the built files for a final check before deployment.

## Live Demo

See it in action [here](https://presstube.github.io/ffmpeg-spike/) (open dev console to see it logging through a transcode).

## Notes

- This setup does not use any CDN for loading FFmpeg resources.
- Ensure the FFmpeg core and WASM files are placed correctly in the `./ffmpeg-core` directory.

## FFmpeg.wasm Library

This project uses the [FFmpeg.wasm library](https://github.com/ffmpegwasm/ffmpeg.wasm), a WebAssembly port of FFmpeg that runs directly in the browser.

## License

MIT License
