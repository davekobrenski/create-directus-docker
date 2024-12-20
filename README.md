## Docker with Directus / MySQL / Adminer / GraphQL

A quick-start installer and launcher for Docker compose, containing Directus with MySQL, an Adminer UI for managing the database, and a GraphiQL playground. Plus a helper app to walk you through initializing environment variables and launching all services.

**Requirements:** you need [Docker](https://www.docker.com) and [Node](https://nodejs.org) installed on your machine:

- [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)  
- [Install Node](https://nodejs.org/en/download/)

## Installation & Usage

**The easiest way to get up and running is to open a terminal session and run:**

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

### Permissions

You may need to grant additional access to the 'directus' directory, so that Directus can create files there. Just run:

```
sudo chmod -R 777 directus
```

### Seeding MySQL data

If you want to seed your database with data on first launch, place your .sql file(s) in the "init" directory at the root of this package. MySQL will run any files in this directory the first time it launches.

### Starting/stopping with Docker Compose

To **stop** your running containers, simply run `docker compose down` in your terminal from within the project directory. All containers will be stopped.

To **restart** your stopped containers, you can let the helper app do it for you:

`npm start`

Or you can follow this sequence:

`docker compose up mysql -d`

Then wait 10-20 seconds (for MySQL to boot), then type:

`docker compose up -d`

**Boom!** You're done. Now you can access the URLS from here:

Directus CMS: http://localhost:8055  
Apollo GraphQL Sandbox: https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:8055/graphql  
Adminer (for MySQL): http://localhost:8080

**Check on running containers:**

Simply run `docker compose ps` to see the status of running containers. Or, run `docker compose ps -a` to see all containers, running or not.

### NGINX Proxy example

Included in this package is also a `docker-compose-nginx.yml` file that demonstrates how to run a reverse proxy on a Linux-based server so that you can use a custom domain with an auto-generated/renewed SSL certificate via Let's Encrypt.

To use this, rename the existing `docker-compose.yml` file to something else, and rename the `docker-compose-nginx.yml` to `docker-compose.yml`.

Add the following env variables to your `.env` file:

```bash
VIRTUAL_HOST="your-domain.com"
CERT_EMAIL="you@email"
```

and make sure your Directus .env variables look something like this:

```bash
DIRECTUS_DOMAIN="localhost"
DIRECTUS_PORT="8055"
PUBLIC_URL="https://your-domain.com"
API_ENDPOINT="https://your-domain.com/graphql"
```

Lastly, before running `npm start`, make sure you have pointed to your domain's DNS to your server using the appropriate A records.

Note: you may need to adjust or disable your firewall before running this, to ensure that the SSL certificate can be properly generated using the included `acme-companion` container for Let's Encrypt.

### Snapshot the Data Model

Directus can automatically generate a snapshot of your current data model in YAML format. This includes all collections, fields, and relations, and their configuration. This snapshot can be checked in version control and shared with your team. To generate the snapshot, run:

`npm run snapshot`

The 'directus' container **must be running** in order to take a snapshot.

### Apply a Snapshot

To overwrite the current Directus instance with the data model specified in that snapshot, you can apply a snapshot by running:

`npm run snapshot-apply --snapshot=snapshot-file.yaml`

Change the name of the file in the command to match an actual snapshot file in your 'snapshots' directory.

By applying the snapshot, Directus will auto-detect the changes required to make the current instance up to date with the proposed data model in the snapshot file, and will run the required migrations to the database to make it match the snapshot. This is useful when migrating to/from another directus instance.

**It is recommended that you test this first by doing a dry-run like this:**

`npm run snapshot-test --snapshot=snapshot-file.yaml`

### Examples of getting an auth token for Directus API:

curl -X POST localhost:8055/auth/login -H 'Content-Type: application/json' -d '{"email":"you@email.com","password":"your-password"}'

curl -X POST localhost:8055/auth/refresh -H 'Content-Type: application/json' -d '{"refresh_token": "W5L70MBXKElx5ZVZwxmQVG8qdVjukiRVIwD5FYG7tCPyyuCM_I3IyCsYnFhMUrRi", "mode": "json"}'
