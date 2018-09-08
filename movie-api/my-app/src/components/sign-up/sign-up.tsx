import * as React from 'react';

export class SignUpComponent extends React.Component <any>{

  constructor(props: any) {
    super(props)
    this.state = {
      email: "",
      fname: "",
      lname: "",
      password: "",
      role: "",
      username: ""
    }
  }

  public changes = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  public create = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:9001/users', {
      body: JSON.stringify(this.state),
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST'
    })
      .then(resp => resp.json())
      .then(resp => {
        this.props.history.push('/login');
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div>
        <form className="form-signin" onSubmit={this.create}>
          <h1>Sign Up</h1>
          <br/>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text" onChange={this.changes} name="username" className="form-control" placeholder="Username" />
          <br />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" onChange={this.changes} name="password" className="form-control" placeholder="Password" />
          <br />
          <label htmlFor="inputFName" className="sr-only">First Name</label>
          <input type="text" onChange={this.changes} name="fname" className="form-control" placeholder="First Name" />
          <br />
          <label htmlFor="inputLName" className="sr-only">Last Name</label>
          <input type="text" onChange={this.changes} name="lnName" className="form-control" placeholder="Last Name" />
          <br />
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input type="text" onChange={this.changes} name="email" className="form-control" placeholder="Email" />
          <br />
          <label htmlFor="inputRole" className="sr-only">Role</label>
          <input type="text" onChange={this.changes} name="role" className="form-control" placeholder="Role: 1 = manager, 2 = employee" />
          <br />
          <button type="submit">Create account</button>
          <p id="error-message"></p>
        </form>
      </div>
    );
  }
}

