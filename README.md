Clone the repo (master branch)

## Install

_Requires Node 8 or greater_

```shell
npm install -g yo
npm link (from root)
```

## Scaffold

```shell
yo create-node-express-app myapp
cd myapp
```

## Run

DB Setup (for RDBMS)
```shell
npm run setup
```

Run in _development mode_:

```shell
npm run watch
```

Package and run in _production mode_

```shell
npm start
```

_pm2_
```shell
pm2 start
```

## Test

```shell
npm run test
```

## Sample API
```shell
http://localhost:<port>/example/sample
```

## Swagger Docss
```shell
http://localhost:<port>/api-explorer/
```
