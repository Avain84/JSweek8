const baseURL = 'https://todoo.5xcamp.us';

const logo = document.querySelector(".logo");

logo.addEventListener("click",e => {
  e.preventDefault();
  const config = {
    headers: { authorization: window.localStorage.getItem('token')},
  };
  axios.get(`${baseURL}/check`,config)
  .then(response => {
    window.location.pathname = '/JSweek8/inside.html';
    // getList();
  })
  .catch(error => {
    window.location.pathname = '/JSweek8/index.html';
  });
})