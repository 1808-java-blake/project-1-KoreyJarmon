import * as React from 'react';
import * as moment from 'moment';

export class HomeComponent extends React.Component<any, any>{

  constructor(props: any) {
    super(props)
    this.state = {
      reimb_id: 0,
      reimb_amount: 0,
      reimb_submitted: 0,
      reimb_resolved: 0,
      reimb_description: "",
      reimb_author: 0,
      reimb_resolver: 0,
      reimb_status_id: 0,
      reimb_type_id: 0
    }
  }

  public componentDidMount() {
    fetch('http://localhost:9001/reimb/id', {
      body: JSON.stringify(this.state.credentials),
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        res.forEach((reimb: any) => {
          this.state = reimb;
          this.addReimbToTable(this.state);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  public addReimbToTable = (reimb: any) => {
    const tbody = document.getElementById('reimb-table-body');
    tbody!.innerHTML += `
    <tr>
      <th scope="row">${this.state.reimb_id}</th>
      <td>${this.state.reimb_amount}</td>
      <td>${moment(this.state.reimb_submitted).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>${moment(this.state.reimb_resolved).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>${this.state.reimb_description}</td>
      <td>${this.state.reimb_resolver}</td>
    </tr>
    `
  }


  public render() {
    return (
      <div>
        <h1>Your Reimbursement Requests</h1>
        <br />
        <div className="container" >
          <div className="row">
            <table className="table table-bordered table-secondary">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Time Submitted</th>
                  <th scope="col">Time Resolved</th>
                  <th scope="col">Description</th>
                  <th scope="col">Resolver</th>
                </tr>
              </thead>
              <tbody id="reimb-table-body">

              </tbody>
            </table>
            <div className="crossfade">
              <figure></figure>
              <figure></figure>
              <figure></figure>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

