import * as React from 'react';
 import { Link } from 'react-router-dom';
 import BilgewaterCrest from '../../../src/bilgewater_crest.png';
export const AppNav: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md">
      <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img src={BilgewaterCrest} alt="BilgewaterCrest" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04"
          aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/create-reimbursement/create-reimbursement">Create Reimbursement
            <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/edit-reimbursement/edit-reimbursement">Edit Reimbursements
            <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/sign-up/sign-up">Create User
            <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/sign-in/sign-in">Log Out
            <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="Search" />
          </form>
        </div>
      </nav>
    </div>
  );
}