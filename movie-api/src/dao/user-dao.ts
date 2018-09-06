import { connectionPool } from "../util/connection-util";
import { reimbursement } from "../model/reimb";
import { User } from "../model/user";
import { reimbConverter } from "../util/reimb-converter";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their movies
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM movies.app_users
        LEFT JOIN movies.users_movies
        USING (user_id)
        LEFT JOIN movies.movies
        USING(movie_id)`);

    // extract the users and their movies from the result set
    const users = [];
    resp.rows.forEach((user_movie_result) => {
      const movie = reimbConverter(user_movie_result);
      const exists = users.some( existingUser => {
        if(user_movie_result.user_id === existingUser.id) {
          //movie.id && existingUser.movies.push(movie);
          return true;
        }
      })
      if (!exists) {
        const newUser = userConverter(user_movie_result);
        //movie.id && newUser.movies.push(movie);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM movies.app_users u
        LEFT JOIN movies.users_movies
        USING (user_id)
        LEFT JOIN movies.movies
        USING(movie_id)
        WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]); // get the user data from first row

        // get the movies from all the rows
        resp.rows.forEach((movie) => {
          //movie.movie_id && user.movies.push(movieConverter(movie));
        })
        return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
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