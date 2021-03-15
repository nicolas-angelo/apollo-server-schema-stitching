# Hasura GraphQL Remote on Apollo Server on Heroku

I use Hasura GraphQL Engine on Heroku and I have a number of remote schemas from 3rd party services connected.
I was facing "duplicate type name(s)" errors when trying to connect my Hasura GQL endpoint to Apollo Studio.

So I created a remote executable schema from Hasura.
Now I connect this endpoint to Apollo Studio as a proxy.

Read more at [hasura.io](https://hasura.io) and the [docs](https://docs.hasura.io).

## Quickstart

### 1. Deploy to Heroku :rocket:

Deploy to Heroku

[![Deploy to
Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/stealthist/apollo-server-schema-stitching)
