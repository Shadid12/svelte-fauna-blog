
import { query as q } from "faunadb";

export default {
  name: "LoginRole",
  privileges: [
    {
      resource: q.Collection("User"),
      actions: {
        read: true,
      }
    },
    {
      resource: q.Index("user_by_email"),
      actions: {
        read: true
      }
    }
  ]
}
  