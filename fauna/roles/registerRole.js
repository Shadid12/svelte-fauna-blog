
import { query as q } from "faunadb";

export default {
  name: "RegisterRole",
  privileges: [
    {
      resource: q.Collection("User"),
      actions: {
        read: true,
        create: true,
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
  