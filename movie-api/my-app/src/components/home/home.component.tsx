import * as React from 'react';

export class HomeComponent extends React.Component {

  public render() {
    return (
      
  <div className="container" id="movie-table-container">
    <div className="row">
      <table className="table table-striped table-dark col" id="movie-table">
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
        <tbody id="movie-table-body">

        </tbody>
      </table>

    </div>
  </div>
    );
  }
}

