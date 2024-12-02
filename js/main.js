//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  let city = document.querySelector('input').value.toLowerCase();
  city = city[0].toUpperCase()+city.slice(1);
  const accessKey = '8d937a015fbf434c603638c9bea76664';
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}&forecast_days=7`;

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let cityState = data.location.name+', ' +data.location.region;
        document.querySelector('h2').innerText = cityState;
        document.querySelector('.icon').src = data.current.weather_icons[0];

        let celsius = data.current.temperature;
        document.querySelector('h3').innerHTML = 
        `The weather in ${cityState} is ${data.current.weather_descriptions[0]} with a temperature of ${convertCels(celsius)}°F.
         It feels like ${convertCels(data.current.feelslike)}°F with a humidity of ${data.current.humidity}.`;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertCels(c){
  return Math.floor(c * 9/5 + 32);
}