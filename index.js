const Time=document.getElementById("time");
const dates=document.getElementById("date");
const timezone=document.getElementById("timezone");
const country=document.getElementById("country");
const humid=document.getElementById("humid");
const press=document.getElementById("press");
const winds=document.getElementById("winds");
const tem=document.getElementById("tem");
const weatherf=document.getElementById("weatherf");
const apikey="0420a03b6f3a31aab3074011bc8e0599";
const days=['Sunday','Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
setInterval(() => {
    const time= new Date();
    const month= time.getMonth();
    const date= time.getDate();
    const day= time.getDay();
    const hour= time.getHours();
    const minutes= time.getMinutes();

    Time.innerHTML= (hour <10? "0"+ hour: hour)+":"+(minutes <10? "0"+ minutes : minutes );
    dates.innerHTML= days[day]+","+ date +" "+ months[month];
}, 1000);
navigator.geolocation.getCurrentPosition((success)=>{
  console.log(success.coords);
        let{latitude, longitude}= success.coords;
        getWeatherInfo(city.value);
})


function getWeatherInfo(city){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success.coords);
        let{latitude, longitude}= success.coords;
       // const q= city;
        if(city==""||city==null){
          city="delhi";
          }
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=`+city+`&appid=${apikey}&units=metric`).then(res => res.json()).then(data => {
            console.log(data);
            timezone.innerHTML= data.city.name;
            country.innerHTML= data.city.country+" / {"+data.city.coord.lat+" N, "+ data.city.coord.lon+" E}";
            humid.innerHTML= data.list[0].main.humidity+" %";
            console.log(humid);
            const anu= data.list[0].weather[0].icon;
            console.log(anu);
            document.getElementById("tod").innerHTML= `<img id="tow" src="https://openweathermap.org/img/wn/${anu}@2x.png" alt=""></img>`
            press.innerHTML= data.list[0].main.pressure +" hPa";
            winds.innerHTML= data.list[0].wind.speed +" m/s";
            tem.innerHTML= data.list[0].main.temp +" C";
            weatherData(data);
    
              if(anu=="01d"||anu=="01n"||anu=="02d"||anu=="02n"){
                document.querySelector('#comp').style.setProperty('--background','url(img/sunny.jpg) no-repeat center center/cover');
              } else if(anu=="04d"||anu=="04n"||anu=="03d"||anu=="03n"){
                document.querySelector('#comp').style.setProperty('--background','url(img/cloudy.jpg) no-repeat center center/cover');
                document.querySelector('#date').style.setProperty('color','white');
                document.querySelector('#time').style.setProperty('color','white');
                document.querySelector('#timezone').style.setProperty('color','white');
                document.querySelector('#country').style.setProperty('color','white');
              } else if(anu=="09d"||anu=="09n"||anu=="10d"||anu=="10n"||anu=="11d"||anu=="11n"){
                document.querySelector('#comp').style.setProperty('--background','url(img/rainy.jpg) no-repeat center center/cover');
                
              } else  if(anu=="13d"||anu=="13n"||anu=="50d"||anu=="50n"){
                document.querySelector('#comp').style.setProperty('--background','url(img/snowy.jpg) no-repeat center center/cover');
                document.querySelector('#date').style.setProperty('color','black');
                document.querySelector('#time').style.setProperty('color','black');
                document.querySelector('#timezone').style.setProperty('color','black');
                document.querySelector('#country').style.setProperty('color','black');
                document.querySelector('.weatherbox').style.setProperty('color','black');
                document.querySelector('.weatherbox').style.setProperty('background','rgb(255 252 252 / 40%)');
                document.querySelector('#tow').style.setProperty('background','rgb(255 252 252 / 40%)');
              }
        });
    });
}
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeatherInfo(city.value);
})


function weatherData(data){
    let otherDayFor=''
    data.list.forEach((day,idx)=>{
        otherDayFor +=`
        <div id="weatherf"class="weatherbox">
          <h2 id="fday"class="secondary">${day.dt_txt}</h2>
           <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
            <div class="weatheritem">
                 <div class="day">
                  <div>Max Temp.:</div><div id="ftd">${day.main.temp_max} C</div>
                  </div>
                  <div class="night">
                  <div>Min Temp.</div><div id="ftn">${day.main.temp_min} C</div>
                  </div>
             </div>
         </div>
        `

        
       })
       weatherf.innerHTML = otherDayFor;
}