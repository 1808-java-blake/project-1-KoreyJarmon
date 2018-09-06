function create(event) {
  event.preventDefault();
  let username = document.getElementById('inputUsername').value;
  let password = document.getElementById('inputPassword').value;
  let fname = document.getElementById('inputFName').value;
  let lname = document.getElementById('inputLName').value;
  let email = document.getElementById('inputEmail').value;
  let role = document.getElementById('inputRole').value;

  const credentials = { username, password, fname, lname, email, role };
  fetch('http://localhost:9001/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
    .then(resp => resp.json())
    .then(resp => {
      window.location = 'http://localhost:9001/login-page/login.html';
    })
    .catch(err => {
      console.log(err);
    });
}