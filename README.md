# Inclusive Design Guide

[![Netlify Status](https://api.netlify.com/api/v1/badges/b3a3b272-3aaa-4933-9067-8406f991dbea/deploy-status)](https://app.netlify.com/sites/idg-site/deploys)

This repository contains the files needed to build the [Inclusive Design Guide](https://idg-site.netlify.app).

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t guide .`
* Run the container: `docker run --name guide -p 8000:80 guide`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./_site/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./_site/`
directory to the web root of your server.
