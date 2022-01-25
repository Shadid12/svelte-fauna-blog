
import { query as q } from "faunadb";

export default {
  name: "user_by_email",
  source: q.Collection("User"),
  unique: true,
  terms: [
    {
      field: ["data", "email"]
    }
  ]
}
