# Accounting Project Backend

The server of this project. Using Node.js, Express.js, and MySQL database.

## How to Run

1. **Install all packages using npm.**

   > `npm install`

2. **Create .env file.**

- Run `node createJwtKey.js` to generate your testing JWT_SECRET.

```
MYSQL_HOST=""
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
MYSQL_PORT=""

PORT=8080

JWT_SECRET=""
JWT_AUDIENCE=""
JWT_ISSUER=""
```

3. **Build tables with `database-schema.sql` in your MySQL database.**

4. **Run the server**
   > `npm run dev`
