const submit = document.querySelector('button');
window.onload=function(){
    navigator.geolocation.getCurrentPosition(gMap);
}

submit.addEventListener ('click', function (e) {
    // debugger
    e.preventDefault()
    let city = document.getElementById('search').value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?`
        + `q=${city}&units=imperial&appid=f813e7013543f50bab961ec427b993b4`)
    .then(data => data.json())
    .then(json => {
        gMap(json.coord);
    }).catch(err => errorData());
});

function gMap (position) {
    if(!(position.lat&&position.lon)){
        position.lat=position.coords.latitude;
        position.lon=position.coords.longitude;

    }
    if (position.lat && position.lon) {
        fetchData(position.lat,position.lon)
        let imgUrlCity = `https://www.google.com/maps/embed/v1/place?`
            + `key=AIzaSyAOK1yMMCD-xdJL8BaVpgTO6TwMXNtKX3A`
            + `&q=${position.lat},${position.lon}&amp&zoom=12`
        document.getElementById("mapholder").innerHTML = 
            `<iframe src="${imgUrlCity}" width="60%" height="85%" frameborder="0" style="border:0"allowfullscreen></iframe>`;
        }  
}

function fetchData(lat,lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f813e7013543f50bab961ec427b993b4`)
    .then(data=>data.json())
        .then(json=>{
            document.getElementById('search').value=json.name;
            createWeatherBlock(json);
        }).catch(()=>errorData());
}

function createWeatherBlock(data){
    const mapHolder=document.querySelector('#mapholder'),
          mainWeather=data.main,
          weatherDescription=data.weather[0];
    let div=document.createElement('div'),
        h1=document.createElement('h1');
    h1.textContent=data.name;
    h1.style.textAlign='center';
    h1.classList.add('cityname');
    div.setAttribute('class','card');
    div.setAttribute('style','width:40%;height:85%');
    let img=document.createElement("img");
    img.setAttribute("src",`http://openweathermap.org/img/w/${weatherDescription.icon}.png`);
    img.classList.add('card-img');
    img.classList.add('center');
    img.setAttribute('style','width:100px')

    div.appendChild(img);

    div.appendChild(h1);
    let p=document.createElement('p');
    p.textContent=`Temperature:${parseInt(mainWeather["temp"])} `;
    p.style.textAlign='center';
    div.appendChild(p);
    
    mapHolder.appendChild(div);
}

function errorData(){
    const mapHolder=document.getElementById('mapholder');
    mapHolder.innerHTML="<h1>Please,reload the page cause data didn't come</h1>";
    
}
function removeChildren(parent){
    parent.parentElement.removeChild(parent);
}