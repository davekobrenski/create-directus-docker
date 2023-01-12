# Docker with Directus + MySQL + Adminer + GraphiQL

A quick-start installer and launcher for Docker compose, containing Directus with MySQL, an Adminer UI for managing the database, and a GraphiQL playground. Plus a helper app to walk you through initializing environment variables and launching all services. 

## Requirements

You need [Docker](https://www.docker.com) and [Node](https://nodejs.org) installed on your machine:

- [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)  
- [Install Node](https://nodejs.org/en/download/)

## Installation & Usage

```bash
npx create-directus-docker@latest <my-project>
```

Once installed, simply run:

```bash
cd <my-project>
npm install
npm start
```

The wizard will walk you through configuring your environment variables, and will launch all services for you.

**Boom!** You're done. Now you can access the URLS from here:

Directus CMS: http://localhost:8055  
Adminer (for MySQL): http://localhost:8080  
GraphQL Playground: http://localhost:4000/graphql  

## Starting/stopping with Docker Compose

To **stop** your running containers, simply run either `npm run stop` or  `docker compose down` from within the project directory. All containers will be stopped.

To **restart** your stopped containers, you can let the helper app do it for you:

`npm start`

The helper app waits for MySQL to be ready before starting the rest of the services (otherwise, you'd get errors).

**Check on running containers:**

Simply run `docker compose ps` to see the status of running containers. Or, run `docker compose ps -a` to see all containers, running or not.

## CORS problems on localhost

When using the GraphiQL playground on localhost, you'll run into some browser problems related to CORS. Here's how to get around it:

**Safari:**

1. Enable the developer menu by opening up Settings > Advanced, then check "Show Develop bar in menu"
2. Click the Develop menu and check "Disable Cross-Origin Restrictions"

**Chrome**

Temporarily Disable CORS in Chrome (MacOS):

1. Quit Chrome
2. Open terminal and run:

`open -n -a "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

**Windows:**

1. Right click on desktop, add new shortcut
2. Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
3. Click OK

**Firefox:**

For Firefox you can simply install [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) addon.