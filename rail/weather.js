const notificationElement=document.querySelector(".notification");
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
let weather={
	
temperature:{
	value:0,
},
description:"",
iconId:"",
city:"",
country:"",

};
const key="d049a479f8124db6a7044ed32e8add6d"

// if('geolocation' in navigator){
//     navigator.geolocation.getCurrentPosition(setPosition,showError);
// }else{
//     notificationElement.style.display="block";
//     notificationElement.innerHTML="<p>Sorry problem with the geolocation device</p>"
// }

const getWeather = async(url)=>{
	const response = await fetch(url);
	const responseJson = await response.json();
	console.log(responseJson);
    weather.temperature.value = responseJson.data[0].temp;
    console.log(weather.temperature.value);
	weather.description = responseJson.data[0].weather.description;
	weather.iconId = responseJson.data[0].weather.icon;
    weather.city = responseJson.data[0].city_name;
    console.log(weather.city);
	weather.country = responseJson.data[0].country_code;
	iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML= `${weather.temperature.value} <span>&deg;C</span>`;
    descElement.innerHTML= `${weather.description}`;
    locationElement.innerHTML= `${weather.city},${weather.country}`;
}

function setPosition(){

    let latitude=window.localStorage.getItem(`lat`);
    let longitude = window.localStorage.getItem(`long`);
    let url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=d049a479f8124db6a7044ed32e8add6d`;
    getWeather(url);
}

setPosition();
 
//  function showError(error){
//  	notificationElement.style.display="block";
//     notificationElement.innerHTML=`<p>${error.message}</p>`;
//  }

// const getWeather = async(url)=>{
// 	const response = await fetch(url);
// 	const responseJson = await response.json();
// 	console.log(responseJson);
//     weather.temperature.value = responseJson.data[0].temp;
//     console.log(weather.temperature.value);
// 	weather.description = responseJson.data[0].weather.description;
// 	weather.iconId = responseJson.data[0].weather.icon;
//     weather.city = responseJson.data[0].city_name;
//     console.log(weather.city);
// 	weather.country = responseJson.data[0].country_code;
// 	iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
//     tempElement.innerHTML= `${weather.temperature.value} <span>C</span>`;
//     descElement.innerHTML= `${weather.description}`;
//     locationElement.innerHTML= `${weather.city},${weather.country}`;
// }


