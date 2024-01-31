# Accounting Project Backend
The server of this project. Using Node.js, Express.js, and MySQL database.

## How to Run
1. **Install all packages using npm.**
> ```npm install```

2. **Create .env file.**
- Run `createJwtKey.js` to generate your testing JWT_SECRET.
```
MYSQL_HOST=""
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
MYSQL_PORT=""

PORT=8080

JWT_SECRET=""
```


3. **Build database with `database-schema.sql`.**

4. **Run the server**
>```npm run dev```
