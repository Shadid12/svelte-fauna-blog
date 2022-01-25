
import { query as q } from "faunadb";

export default {
  name: "LoginUser",
  role: q.Role("LoginRole"),
  body:
  q.Query(
    q.Lambda(
      ["email", "password"],
      q.Let(
        {
          credentials: q.Login(q.Match(q.Index("user_by_email"), q.Var("email")), {
            password: q.Var("password"),
            ttl: q.TimeAdd(q.Now(), 1800, "seconds")
          })
        },
        {
          secret: q.Select("secret", q.Var("credentials")),
          ttl: q.Select("ttl", q.Var("credentials")),
          data: q.Match(q.Index("user_by_email"), q.Var("email")),
        }
      )
    )
  )
};
  