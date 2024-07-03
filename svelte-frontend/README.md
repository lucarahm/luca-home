# Svelte Frontend

## Underling technologies
### JS-Frameworks:
* Svelte Kit \[[docs](https://kit.svelte.dev/docs/introduction)\]
 
### Other
* uses [shadcn-svelte](https://www.shadcn-svelte.com/) for pre-styled components.
* tailwind css
* [superforms](https://superforms.rocks/) for all things related to forms
* [Formsnap](https://formsnap.dev/docs/quick-start) to make superforms even better

## Developing

If you freshly cloned the project please run `npm install` first to load all the dependencies.

If you've done this step you can start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building


```bash
npm run build
```

You can preview the production build with `npm run preview`.


## Deployment

There is a Dockerfile to deploy the website inside a docker container running a NodeJS server. 

To build the Dockerfile run:

```bash
docker build . -t svelte-frontend
```

This will create a docker image named svelte-frontend, which you can then run using `docker run -d svelte-frontend`.

The image will expose port 3000, where the server is running. 

To run the image on a server with an nginx reverse proxy and lets encrypt for certificates (that's the way i run it),
please use:

```shell
docker run --detach \
--name website \
--env "VIRTUAL_HOST=luca-home.de" \
--env "LETSENCRYPT_HOST=luca-home.de" \
--env "VIRTUAL_PORT=3000" \
svelte-frontend
```