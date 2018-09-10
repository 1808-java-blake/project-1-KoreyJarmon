import { connectionPool } from "../util/connection-util";
import { reimbursement } from "../model/reimb";
import { reimbConverter } from "../util/reimb-converter";
import { SqlReimb } from "../dto/sql-reimb";

/**
 * Retreive all movies from the database
 */
export async function findAll(): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`
    SELECT 
    reimb_id, reimb_amount, reimb_submitted,reimb_resolved, reimb_description, reimb_type, reimb_status, user_first_name
    FROM 
    ers.ers_reimbursement
    LEFT JOIN 
    ers.ers_users
    ON 
    ers_users.ers_users_id = ers_reimbursement.reimb_author
	  INNER JOIN
	  ers.ers_reimbursement_status
	  ON
	  ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id
	  INNER JOIN
	  ers.ers_reimbursement_type
	  ON
	  ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id
    ORDER BY 
    reimb_id;`);
    
    return resp.rows.map(reimbConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a movie by its id
 * @param id 
 */
export async function findById(id): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`
    SELECT 
    reimb_id, reimb_amount, reimb_submitted,reimb_resolved, reimb_description, reimb_type, reimb_status
    FROM 
    ers.ers_reimbursement
    LEFT JOIN 
    ers.ers_users
    ON 
    ers_users.ers_users_id = ers_reimbursement.reimb_author
    INNER JOIN
    ers.ers_reimbursement_status
    ON
    ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id
    INNER JOIN
    ers.ers_reimbursement_type
    ON
    ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id
    WHERE reimb_author = $1
    ORDER BY 
    reimb_id;`, [id]);
    // let reimb: SqlReimb = resp.rows[0];
    // if (reimb !== undefined) {
      return resp.rows.map(reimbConverter);
    // } else {
    //   return undefined;
    // }
  } finally {
    client.release();
  }
}

/**
 * Add a new movie to the DB
 * @param reimbursement 
 */
export async function createReimbursement(reimbursement, id): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const respr = await client.query(`SELECT reimb_type_id FROM ers.ers_reimbursement_type 
      WHERE reimb_type = $1`,[ reimbursement.reimbursementType])
    
      
      reimbursement.type_td = respr.rows[0].reimb_type_id;
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement(
        reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, CURRENT_TIMESTAMP, $2, $3, 1, $4)
        RETURNING reimb_id`, [+reimbursement.amount, reimbursement.description, 
         id, reimbursement.type_td]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

export async function approveReimb(id): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`UPDATE ers.ers_reimbursement
    SET reimb_resolved= CURRENT_TIMESTAMP, reimb_resolver=2, reimb_status_id=2
    WHERE reimb_id = $1`, [id]);
    return resp.rows.map(reimbConverter);
  } finally {
    client.release();
  }
}

export async function denyReimb(id): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(`UPDATE ers.ers_reimbursement
    SET reimb_resolved= CURRENT_TIMESTAMP, reimb_resolver=2, reimb_status_id=3
    WHERE reimb_id = $1`, [id]);
    return resp.rows.map(reimbConverter);
  } finally {
    client.release();
  }
}