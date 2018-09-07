import * as React from 'react';

export class CreateReimbursementComponent extends React.Component <any>{

  constructor(props:any){
    super(props)
    this.state={
      amount:0,
      description:"",
      reimbursementType:""
    }
  }
  public changes = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };
  public createReimb=(event:any)=> {
    event.preventDefault();
  
    fetch('http://localhost:9001/reimb', {
      body: JSON.stringify(this.state),
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
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
      <div className="container" id="content-container">
        <div className="row justify-content-center">
          <form className="form-create-movie col-xs-12 col-sm-10 col-md-8 col-lg-6" onSubmit={this.createReimb}>
            <h1 className="h3 mb-3 font-weight-normal">New Reimbursement Submission</h1>
            <label htmlFor="input-amount" className="sr-only">Amount</label>
            <input onChange={this.changes} name="amount" type="number" className="form-control" placeholder="Amount" />
            <br />

            <label htmlFor="input-description" className="sr-only">Description</label>
            <input onChange={this.changes} name="description" type="text"  className="form-control" placeholder="Description" />
            <br />

            <label htmlFor="input-reimbursement-type" className="sr-only">Reimbursement type</label>
            <input onChange={this.changes} name="reimbursementType" type="text" className="form-control" placeholder="Reimbursement type" />
            <br />
            <div className="container">
              <div className="row justify-content-center">
                <button className="btn btn-lg btn-primary btn-block" id="submit-button" type="submit">Submit</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}