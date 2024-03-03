// DOM
const loginForm = document.querySelector('.login-form');
const alertText = document.querySelectorAll('.alert');
const alertEmail = document.querySelector('.alert-email');
const alertPassword = document.querySelector('.alert-password');

// 預設先拿掉所有輸入警示
alertText.forEach(item => item.classList.add('vbhidden'));

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  let dataForm = {};

  if(email.value.length == 0){
    alert(`所有資料為必填！`);
    alertEmail.classList.remove('vbhidden');
    return;
  }else if(password.value.length == 0){
    alert(`所有資料為必填！`);
    alertEmail.classList.add('vbhidden');
    alertPassword.classList.remove('vbhidden');
    return;
  }else if(password.value.length < 6 || password.value.length > 12){
    alert(`密碼的長度為6~12，請重新輸入！`);
    password.value = '';
    alertEmail.classList.add('vbhidden');
    alertPassword.classList.remove('vbhidden');
    return;
  }else{
    dataForm = {
      "user": {
        "email": email.value,
        "password": password.value
      }
    };
    
    axios.post(`${baseURL}/users/sign_in`,dataForm)
    .then(response => {
      window.localStorage.setItem('token', response.headers.authorization);
      window.localStorage.setItem('nickname', response.data.nickname);
      window.localStorage.setItem('loginPage', location.href);
      loginForm.submit();
    })
    .catch(error => {
      console.log('失敗');
      console.log(error);
      if(error.response.status === 401){
        alert(`電子信箱或密碼錯誤。`);
        loginForm.reset();
      }else{
        alert(`${error.response.status} -- 其他錯誤`);
      }
      window.localStorage.clear();
      alertText.forEach(item => item.classList.add('vbhidden'));
    });
  }
});