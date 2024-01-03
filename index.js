import express from "express";
import cors from "cors";
import { checkDatabaseConnection } from "./database.js";
import userRoute from "./routes/userRoute.js";
import accountRoute from "./routes/accountRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { jwtGuardMiddleware } from "./middleware/jwtGuard.middleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/", authRoute);

app.use(jwtGuardMiddleware(authService));

app.use("/users", userRoute);
app.use("/accounts", accountRoute);
app.use("/transactions", transactionRoute);

app.use(errorHandler);

// Connection & PORT
const PORT = process.env.PORT || 5000;
checkDatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
