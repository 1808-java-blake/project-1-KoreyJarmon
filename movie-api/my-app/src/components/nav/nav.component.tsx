import * as React from 'react';
// import { Link } from 'react-router-dom';
// import RevLogo from '../../assets/rev-logo.png';
export const AppNav: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="#">ERS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04"
          aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home/home">Home
            <span className="sr-only">(current)</span>
              </a>
              </li>
              <li className="nav-item active">
              <a className="nav-link" href="/create-reimbursement/create-reimbursement">Create Reimbursement
            <span className="sr-only">(current)</span>
              </a>
              </li>
              <li className="nav-item active">
              <a className="nav-link" href="/home/home">Edit Reimbursements
            <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
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