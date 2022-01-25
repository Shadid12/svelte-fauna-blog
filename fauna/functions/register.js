
import { query as q } from "faunadb";

export default {
  name: "RegisterUser",
  role: q.Role("RegisterRole"),
  body:
  q.Query(
    q.Lambda(
      ["email", "password"],
      q.Create(q.Collection("User"), {
        credentials: { password: q.Var("password") },
        data: { email: q.Var("email")}
      })
    )
  )
};
  