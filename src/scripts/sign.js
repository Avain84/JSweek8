let urlDomain = 'https://todoo.5xcamp.us';

// DOM
const signUpForm = document.querySelector('.sign-up-form');
const alertText = document.querySelectorAll('.alert');
const alertEmail = document.querySelector('.alert-email');
const alertNickname = document.querySelector('.alert-nickname');
const alertPassword = document.querySelector('.alert-password');
const alertPasswordAgain = document.querySelector('.alert-password-again');

// 註冊表單驗證
const signUpFormCheck = (form) => {
  const emailTest = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const nicknameTest = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
  const passwordTest = /^[A-Za-z0-9]{6,12}$/
  if(!emailTest.test(form.email.value)){
    alert("請輸入正確的信箱格式\ntest@domain.com");
    alertEmail.classList.remove('vbhidden');
    return;
  }else if(!nicknameTest.test(form.nickname.value)){
    alertEmail.classList.add('vbhidden');
    alert("請輸入正確的暱稱\n規則：中文或英文");
    alertNickname.classList.remove('vbhidden');
    return;
  }else if(!passwordTest.test(form.password.value)){
    alertNickname.classList.add('vbhidden');
    alert("請輸入正確的密碼格式\n密碼：英文或數字 6~12碼");
    alertPassword.classList.remove('vbhidden');
    return;
  }else if(!passwordTest.test(form.passwordAgain.value)){
    alertPassword.classList.add('vbhidden');
    alert("請輸入正確的密碼格式\n密碼：英文或數字 6~12碼");
    alertPasswordAgain.classList.remove('vbhidden');
    return;
  }else if(form.passwordAgain.value !== form.password.value){
    alert("輸入錯誤，請填入正確的密碼");
    alertPasswordAgain.classList.remove('vbhidden');
    return;
  }else{
    alertPasswordAgain.classList.add('vbhidden');
    return true;
  }
};

// 預設先拿掉所有輸入警示
alertText.forEach(item => item.classList.add('vbhidden'));

signUpForm.addEventListener('submit', e => {
  // 取消跳轉
  e.preventDefault();
  let dataForm = {};

  // 註冊按鈕監聽
  if(signUpFormCheck(signUpForm)){
    dataForm = {
      "user": {
        "email": email.value,
        "nickname": nickname.value,
        "password": password.value
      }
    };
    // 註冊
    axios.post(urlDomain + '/users',dataForm)
    .then(response => {
      alert(`-----${response.data.message}-----
      ${response.data.nickname}您好！
      註冊信箱：${response.data.email}
      請記得您的帳號(信箱)與密碼`);
      signUpForm.submit();
    })
    .catch(error => {
      alert(`${nickname.value} 很抱歉
${error.response.data.message}
電子信箱：${email.value}
${error.response.data.error}`);
      email.value = '';
      alertEmail.classList.remove('vbhidden');
    });
  }else{
    return;
  }
});