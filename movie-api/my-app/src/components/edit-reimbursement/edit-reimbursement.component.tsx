import * as React from 'react';
import * as moment from 'moment';

export class EditReimbursementComponent extends React.Component<any, any> {

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
      reimb_type_id: 0,
      user_first_name:"",
      choice:0
    }
  }

  public changes = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  public componentDidMount() {
    fetch('http://localhost:9001/reimb', {
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
      <td>${this.state.user_first_name}</td>
      <td>${this.state.reimb_amount}</td>
      <td>${moment(this.state.reimb_submitted).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>${moment(this.state.reimb_resolved).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>${this.state.reimb_description}</td>
      <td>${this.state.reimb_resolver}</td>
    </tr>
    `
  }

  public approveReimbursement = (e: any) => {
    e.preventDefault();
    //const choice = document.getElementById('input-description')

    fetch('http://localhost:9001/reimb/approve', {
      body: JSON.stringify( this.state ),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });

  }
  public denyReimbursement = (e: any) => {
    e.preventDefault();
    //const choice = document.getElementById('input-description');

    fetch('http://localhost:9001/reimb/deny', {
      body: JSON.stringify( this.state ),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });

  }

  public render() {
    return (
      <div>
        <h1>Manage Reimbursements</h1>
        <br/>
        <div className="row justify-content-center">
          <label htmlFor="input-description" className="sr-only">edit-reimb</label>
          <input
            type="text"
            onChange={this.changes}
            name="choice"
            className="form-control"
            placeholder="Enter the Reimbursement ID that you would you like to edit" />
          <br />
          <br />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <form className="form-approve" onSubmit={this.approveReimbursement}>
              <button id="approve-button" type="submit">Approve</button>
            </form>
          </div>
        </div>


        <div className="container">
          <div className="row justify-content-center">
            <form className="form-approve" onSubmit={this.denyReimbursement}>
              <button id="deny-button" type="submit">Deny</button>
              <br />
            </form>
          </div>
        </div>
        <br/>

        <div className="container" >
          <div className="row">
            <table className="table table-bordered table-secondary">
              <thead>
                <tr>
                  <th scope="col">Reimb ID</th>
                  <th scope="col">First Name</th>
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

          </div>
        </div>
      </div>
    );
  }
}

