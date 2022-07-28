import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import { createConnection, getConnectionOptions } from "typeorm";

async function create() {
  const defaultOptions = await getConnectionOptions();
  const connection = await createConnection(
    Object.assign(defaultOptions, { name: "database" })
  );
  const id = uuidv4();
  const passwordHash = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, created_at) values ('${id}', 'is_admin', 'admin@admin.com.br', '${passwordHash}, true, 'now()')`
  );
}

create().then(() => console.log("User Admin created!"));
