const arr = [];
const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const resp = await fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const data = await resp.json();

  console.log(data);
  const token = data.token;
  // console.log(token);
  localStorage.setItem('jwt', token);
  if (!data.error) {
    window.location.href = '../userview/userview.html';
  } else {
    alert('User already exists!!!');
  }
});
const v = document.querySelector('.see');
document.addEventListener('DOMContentLoaded', async () => {
  const view1 = await fetch('http://localhost:5000/seeuser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const d = await view1.json();

  document.querySelector('.see1').textContent = '';

  // Use innerHTML += to append content
  d.seeu.forEach((user) => {
    document.querySelector(
      '.see1'
    ).innerHTML += `<div class="content"><div><h1> ${user.userid}</h1></div></div>`;
  });
  //   const userIds = d.seeu.map(
  //     (user) =>
  //       (document.querySelector(
  //         '.see1'
  //       ).innerHTML += `<h1>hey ${user.userid}</h1>`)

  //   );
});
//for viewing requests
var k = true;
document.querySelector('.btn2').addEventListener('click', async () => {
  window.location.href = `../viewreq/viewreq.html?data=${k}`;
  // const viewreq = await fetch('http://localhost:5000/viewreqs', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
});
