
  import { query as q } from "faunadb";
  
    const onlyDeleteByOwner = q.Query(
      q.Lambda(
        "ref",
        q.Equals(q.CurrentIdentity(), q.Select(["data", "user"], q.Get(q.Var("ref"))))
      )
    );

    /**
     * Use this predicate to Restrict Create only to owner
     */
    // const onlyCreateByOwner = q.Query(
    //   q.Lambda(
    //     "values", 
    //     q.Equals(
    //       q.Identity(), 
    //       q.Select(["data", "owner"], q.Var("values"))
    //     )
    //   )
    // )

    /**
     * Use this predicate to Restrict Read only to owner
     */
    // const onlyReadByOwner = q.Query(
    //   q.Lambda("ref", q.Equals(
    //     q.Identity(), // logged in user
    //     q.Select(["data", "owner"], q.Get(q.Var("ref")))
    //   ))
    // )

    /**
     * User this predicate to Restrict Update only to owner
     */
    // const onlyOwnerWrite = q.Query(
    //   q.Lambda(
    //     ["oldData", "newData"],
    //     q.And(
    //       q.Equals(q.Identity(), q.Select(["data", "owner"], q.Var("oldData"))),
    //       q.Equals(
    //         q.Select(["data", "owner"], q.Var("oldData")),
    //         q.Select(["data", "owner"], q.Var("newData"))
    //       )
    //     )
    //   )
    // )


  ;
  export default {
    name: "UserRole",
    privileges: [
    {
      resource: q.Collection("User"),
      actions: {
        read: true,
        create: true,
        delete: onlyDeleteByOwner
      }
    },{
      resource: q.Collection("Post"),
      actions: {
        "read":true,
        "write":true,
        "create":true,
        delete: onlyDeleteByOwner,
      }
    }],
    membership: [
      {
        resource: q.Collection("User"),
      }
    ]
  }
  