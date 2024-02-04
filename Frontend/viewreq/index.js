const b = document.querySelector('.back');
b.addEventListener('click', () => {
  window.location.href = '../adminview/adminview.html';
});
document.addEventListener('DOMContentLoaded', async () => {
  const all = await fetch('http://localhost:5000/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const alld = await all.json();
  const all2 = await fetch('http://localhost:5000/all2', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const alld2 = await all2.json();
  //   console.log(alld);
  //   console.log(alld2);

  for (var i = 0; i < alld.length; i++) {
    const u = alld[i];
    const u1 = alld2[i];
    const idElement = document.querySelector(`.i${i}`);
    const nameElement = document.querySelector(`.n${i}`);
    const photoElement = document.querySelector(`.p${i}`);
    console.log(u.userid);
    if (idElement) idElement.innerHTML = u.userid || '';
    if (nameElement) nameElement.innerHTML = u1.username || '';
    if (photoElement) {
      photoElement.innerHTML = `<img src="${u1.profile}" alt="user photo" />`;
      console.log('pic is uploaded!');
    }
  }
});

const d1 = document.querySelector('.del1');
const d2 = document.querySelector('.del2');
const d3 = document.querySelector('.del3');
//delete trigger
d1.addEventListener('click', async () => {
  const dn1 = document.querySelector('.n1').innerHTML;
  const di1 = document.querySelector('.i1').innerHTML;
  const del1 = await fetch('http://localhost:5000/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: dn1, userid: di1 }),
  });
});

d2.addEventListener('click', async () => {
  const dn1 = document.querySelector('.n2').innerHTML;
  const di1 = document.querySelector('.i2').innerHTML;
  const del1 = await fetch('http://localhost:5000/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: dn1, userid: di1 }),
  });
});
d3.addEventListener('click', async () => {
  const dn1 = document.querySelector('.n3').innerHTML;
  const di1 = document.querySelector('.i3').innerHTML;
  const del1 = await fetch('http://localhost:5000/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: dn1, userid: di1 }),
  });
});
