const btn1 = document.querySelector('.btn1');
// btn1.addEventListener('click', () => {
//   window.location.href = 'adminview.html';
// });
//try
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.forms.adminlogin;

//   form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const userid = formData.get('userid');
//     console.log(userid);
//     const password = formData.get('password');
//     try {
//       const response = await fetch('http://localhost:5000/admin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userid, password }),
//       });

//       const data = await response.json();
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }

//     // Check if the login was successful
//     if (data) {
//       window.location.href = './adminview/adminview.html';
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
//   });
// });
function clear(e) {
  e.preventDefault();
}
