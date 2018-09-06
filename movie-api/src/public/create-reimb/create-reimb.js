console.log('loading js');
function createMovie(event) {
  event.preventDefault();

  const amount = document.getElementById('input-amount').value;
  const description = document.getElementById('input-description').value;
  const reimbursementType = document.getElementById('input-reimbursement-type').value;

  const reimbursement = {
    amount,
    description,
    reimbursementType
  }
  
  fetch('http://localhost:9001/movies', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimbursement)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:9001/home/home.html';
  })
  .catch(err => {
    console.log(err);
  });
}