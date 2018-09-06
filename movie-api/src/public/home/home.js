function addMovieToTable(movie) {
  const tbody = document.getElementById('movie-table-body');
  tbody.innerHTML += `
  <tr>
    <th scope="row">${movie.reimb_id}</th>
    <td>${movie.reimb_amount}</td>
    <td>${movie.reimb_submitted}</td>
    <td>${movie.reimb_resolved}</td>
    <td>${movie.reimb_description}</td>
    <td>${movie.reimb_resolver}</td>
  </tr>
  `
}

fetch('http://localhost:9001/movies')
  .then(res => res.json())
  .then(res => {
    res.forEach(movie => {
      addMovieToTable(movie);
    })
  })
  .catch(err => {
    console.log(err);
  })

function approveReimbursement() {

  const choice = document.getElementById('input-description').value;

  fetch('http://localhost:9001/movies/approve', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({choice})
  })
    .then(resp => resp.json())
    .then(resp => {
      window.location = 'http://localhost:9001/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });

}
function denyReimbursement() {

  const choice = document.getElementById('input-description').value;

  fetch('http://localhost:9001/movies/deny', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({choice})
  })
    .then(resp => resp.json())
    .then(resp => {
      window.location = 'http://localhost:9001/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });

}