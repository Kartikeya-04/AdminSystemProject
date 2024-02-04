// function clear(e) {
//   e.preventDefault();
// }
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[name="userlogin"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('name').value;
    const password = document.getElementById('pass').value;

    try {
      const token = await getAuthToken();

      const response = await fetch('http://localhost:5000/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid: userId,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data.message);
      if (data.message) {
        window.location.href = '../usercred/usercred.html';
      } else {
        alert('Invalid Credentials!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

async function getAuthToken() {
  const tokenagain = localStorage.getItem('jwt');
  return tokenagain;
}
