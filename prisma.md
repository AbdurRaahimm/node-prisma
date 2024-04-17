## Install 
```sh
npm i prisma @prisma/client
```

## Initialization 
```sh
npx prisma init
```

Your Prisma schema was created at `prisma/schema.prisma`
You can now open it in your favorite editor.
Next steps:
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database. 
2. Set the provider of the `datasource` block in `schema.prisma` to match your data like `mongodb` or `postgresql`
3. Create model. Follow document [ Prisma Documentation](https://www.prisma.io/docs/getting-started/quickstart#2-model-your-data-in-the-prisma-schema)
4. Run `npx prisma generate` to generate the Prisma Client. You can then start query.

## CRUD Operation 

1. Create 
  ```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    age: 12,
    name: "Søren Bramer-Schmidt",
    email: "schmidt@prisma.io",
    role: "ADMIN",
    country: "Germany",
  },
});

console.log("Created user: ", user);
```

2. Read 
   - All
  ```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allUsers = await prisma.user.findMany();

console.log(allUsers);
```
- Single
 ```js
 import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** If the user doesn't exist, Prisma Client will return null */
const user = await prisma.user.findFirst({
  where: {id: 1},
});

console.log(user);
```

- Unique
 ```js
 import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** If the user doesn't exist, Prisma Client will return null */
const user = await prisma.user.findUnique({
  where: { email: "nilu@prisma.io" },
});

console.log(user);
```

3. Delete 
```js 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Delete a user from the database.
 * Note that this will also delete the `profile` and `posts` of the user
 * because the schema specifies `Cascade` for `onDelete`.
 */
const deletedUser = await prisma.user.delete({
  where: { email: "ruheni@prisma.io" },
});

console.log("Deleted: ", deletedUser);
```

4. Update
```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatedPost = await prisma.post.update({
  where: { id: 2 },
  data: {
      name: req.body.name,
      email: req.body.email
  }
});

console.dir(updatedPost);
```

Follow Document - [Prisma Playground ](https://playground.prisma.io/examples/reading/find/find-all)
https://www.blackbox.ai/share/a9c3aa0a-c97c-4097-b783-008de4270a52