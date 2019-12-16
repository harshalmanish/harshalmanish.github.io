const form = document.querySelector("#trnSearch");
form.addEventListener("submit", e=>{
	e.preventDefault();
	const train_num = document.querySelector("#trnNumInput");
	let url = `https://api.railwayapi.com/v2/route/train/${train_num.value}/apikey/hiug3cbsmt/`
	getTrainRoute(url);

});

const getTrainRoute = async (url)=> {
	const response = await fetch(url);
	const responseJson = await response.json();
	console.log(responseJson);
	document.querySelector('#trnName').innerHTML = responseJson.train.name;
	let textDiv = "";
	let text =`<div style="background-color:grey;height:350px;border-radius:25px;"><h1 style="text-align:center">Runs on:</h1>`;
	responseJson.train.days.forEach(stn=>{
		text+=`<h4 style="text-align:center;">${stn.code}: ${stn.runs}</h4>`;
	})
	text+=`</div>`;
	document.querySelector('#runsId').innerHTML = text;

	let text2=`<div style="background-color:grey;height:500px;border-radius:25px;"><h1 style="text-align:center">Availabilty:</h1>`;
	responseJson.train.classes.forEach(stn=>{
		text2+=`<h4 style="text-align:center;">class: ${stn.name} available:${stn.available}</h4>`;
	})
	text2+=`</div>`;
	document.querySelector('#availId').innerHTML = text2;
	let key = 0;
	responseJson.route.forEach(stn => {
		textDiv+=`
		<a href="weather.html"><div class="card" style="background-color:grey;padding:5px;margin:15px 0; text-align:center; border-radius:25px">
		<h1>${stn.station.name}</h1>
			<div>
				<h4>Scheduled arrival: ${stn.scharr}</h4>
				<h4>Scheduled departure: ${stn.schdep}</h4>
			</div>
		</div></a>`
		
		let lat = `${stn.station.lat}`;
		let long = `${stn.station.lng}`
		window.localStorage.setItem(`lat`,lat);
		window.localStorage.setItem(`long`,long)
    });
	document.querySelector('.stations').innerHTML = textDiv;
}
