import { SqlReimb } from "../dto/sql-reimb";
import { reimbursement } from "../model/reimb";

/**
 * This is used to convert a sql movie into an actual movie
 */
export function reimbConverter(movie: SqlReimb) {
  return new reimbursement(movie.reimb_id, movie.reimb_amount, movie.reimb_submitted, movie.reimb_resolved, 
    movie.reimb_description, movie.reimb_author, movie.reimb_resolver, movie.reimb_status_id,
    movie.reimb_type_id)
}