import express, { Request, Response, NextFunction } from "express";
import path from "path";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send("index.html");
  } catch (error) {
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});