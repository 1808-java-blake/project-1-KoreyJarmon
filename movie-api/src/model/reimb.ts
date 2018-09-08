export class reimbursement {
  reimb_id = 0;
  reimb_amount = 0;
  reimb_submitted = 0;
  reimb_resolved = 0;
  reimb_description = '';
  reimb_author = 0;
  reimb_resolver = 0;
  reimb_status_id = 0;
  reimb_type_id = 0;
  user_first_name = '';

  constructor(reimb_id?: number, reimb_amount?: number, reimb_sumbitted?: number, reimb_resolved?: number, 
    reimb_description?: string, reimb_author?: number, reimb_resolver?: number, reimb_status_id?: number,
    reimb_type_id?: number, user_first_name?: string) {
      reimb_id = this.reimb_id = reimb_id;
      reimb_amount = this.reimb_amount = reimb_amount;
      reimb_sumbitted = this.reimb_submitted = reimb_sumbitted;
      reimb_resolved = this.reimb_resolved = reimb_resolved;
      reimb_description = this.reimb_description = reimb_description;
      reimb_author = this.reimb_author = reimb_author;
      reimb_resolver = this.reimb_resolver = reimb_resolver;
      reimb_status_id = this.reimb_status_id = reimb_status_id;
      reimb_type_id = this.reimb_type_id = reimb_type_id;
      user_first_name = this.user_first_name = user_first_name;
  }
}