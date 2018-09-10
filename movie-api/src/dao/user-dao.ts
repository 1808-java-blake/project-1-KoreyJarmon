import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";


/**
 * Retreive a single user by username and password
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users
        WHERE ers_username = $1
        AND ers_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: any): Promise<number> {
  const client = await connectionPool.connect();
  try {
    console.log(user);
    const resp = await client.query(
      `INSERT INTO ers.ers_users(
        ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
        VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING ers_users_id`, [user.username, user.password, user.fname, 
                  user.lname, user.email, user.role]);
                  console.log(resp.rows[0].ers_users_id);
            return resp.rows[0].ers_users_id;
  } finally {
    client.release();
  }
}