import { showAlert } from './alert.js';

const logOutBtn = document.querySelector('.nav__el--logout');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.data.status === 'true') {
      showAlert('success', 'Logged in Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const loginBtn = document.querySelector('#loginbtn');

if (loginBtn && !loginBtn.hasListener) {
  loginBtn.hasListener = true; // Set a flag to indicate that the listener is attached
  loginBtn.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    e.preventDefault();
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
    console.log(err.response);
  }
};

if (logOutBtn) logOutBtn.addEventListener('click', logout);
