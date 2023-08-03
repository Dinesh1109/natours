import { showAlert } from './alert.js';

const userDataForm = document.querySelector('.form-user-data');
const userPassForm = document.querySelector('.form-user-password');
//type is either 'password' or 'data'

const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url: url,
      data,
    });
    console.log(res);
    res.data.status === 'success'
      ? showAlert('success', `${type.toUpperCase()} updated Successfully!`)
      : showAlert('success', `${type.toUpperCase()} updated Successfully!`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPassForm) {
  userPassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('password-confirm').value;
    updateSettings({ currentPassword, password, confirm_password }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
