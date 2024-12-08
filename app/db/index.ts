import {
  createClient,
  createdAt,
  createSchema,
  date,
  string,
} from "monarch-orm";

const client = createClient("mongodb://localhost:27017");

const UserSchema = createSchema("users", {
  email: string(),
  passwordHash: string(),
  name: string(),
  createdAt: date(),
});
