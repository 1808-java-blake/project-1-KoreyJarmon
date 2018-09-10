import { SqlReimb } from "../dto/sql-reimb";
import { reimbursement } from "../model/reimb";


export function reimbConverter(reimb: SqlReimb) {
  return new reimbursement(reimb.reimb_id, reimb.reimb_amount, reimb.reimb_submitted, reimb.reimb_resolved, 
    reimb.reimb_description, reimb.reimb_author, reimb.reimb_resolver, reimb.reimb_status_id,
    reimb.reimb_type_id, reimb.user_first_name, reimb.reimb_type, reimb.reimb_status)
}