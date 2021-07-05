// self executing function here
(function() {

  const weatherForm = document.querySelector('form');
  const formResult = document.getElementById('form-result');
  const formIcon = document.querySelector('#form-icon');
  const addressInput = document.getElementById('address');

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = addressInput.value;
    formResult.innerHTML = 'Please wait..';
    formIcon.src = '';

    if (address) {
      fetch(`asd/weather?address=${address}`).then(response => {
        response.json().then(data => {
          if (data.error) {
            formResult.innerHTML = data.error;
            formIcon.src = '';
          } else {
            const { temperature, weather_descriptions, weather_icons } = data;
  
            formResult.innerHTML = `it's ${temperature} celcius, and ${weather_descriptions[0]}`;
            formIcon.src = weather_icons[0];
          }
        }).catch(error => {
          formResult.innerHTML = 'Something went wrong, Try again';
          formIcon.src = '';
        });
      });
    } else {
      formResult.innerHTML = 'Please input Location';
      formIcon.src = '';
    }
  });
})();
