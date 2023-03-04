let loc =document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate =document.getElementById("climate");
let humid = document.getElementById("humidity1");
let pres = document.getElementById("pressure");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click', (e)=>
{

e.preventDefault();
getWeather(searchInput.value);
searchInput.value='';


});



const getWeather=async (city)=>
{
    try{

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ead9ad45f846214a51fa4b8752e4d6d`,
   
            {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{temp}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        const{humidity}=weatherData.main;
        const{pressure}=weatherData.main;

        const body = document.querySelector('body');
        
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(temp-273);
        humid.textContent="Humidity "+humidity;
        pres.textContent="Pressure "+pressure; 
    
        
        if(id<300 && id>200)
        {
            tempicon.src="./icons/storm.png"
            body.style.background = 'url(./gifs/thunder.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }
       else  if(id<400 && id>300)
        {
            tempicon.src="./icons/drizzle.png"
            body.style.background = 'url(./gifs/drizzle.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }
       else if(id<600&& id>500)
        {
            tempicon.src="./icons/rain.png"
            body.style.background = 'url(./gifs/rain.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }
       else  if(id<700 && id>600)
        {
            tempicon.src="./icons/snowfall.png"
            body.style.background = 'url(./gifs/snow.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }
       else  if(id<800 && id>700)
        {
            tempicon.src="./icons/mist.png"
            body.style.background = 'url(./gifs/mist.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }
         else if(id==800)
        {
            tempicon.src="./icons/sunny.png";   
            body.style.background = 'url(./gifs/clearSky.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }    
        
        else if(id<805 && id>800){
            tempicon.src="./icons/cloudy.png"
            body.style.background = 'url(./gifs/cloud.gif) no-repeat center center fixed';
            body.style.backgroundSize = 'cover';
        }



   
    }
catch(error)
{
    alert('city not found');
}





};














window.addEventListener("load" ,()=>{

let long;
let lat;

if(navigator.geolocation)
{

    navigator.geolocation.getCurrentPosition((position)=>
    {

   
    
    long=position.coords.longitude;
    lat=position.coords.latitude;
    const proxy="https://cors-anywhere.herokuapp.com/";

        const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6ead9ad45f846214a51fa4b8752e4d6d`

        fetch(api).then((response)=>{

            return response.json();


        })

        .then (data =>
            {

                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];


                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);
                    if(id<300 && id>200)
                    {
                        tempicon.src="./icons/thunderstorm.svg"
                    }
                   else  if(id<400 && id>300)
                    {
                        tempicon.src="./icons/cloud-solid.svg"
                    }
                   else if(id<600&& id>500)
                    {
                        tempicon.src="./icons/rain.svg"
                    }
                   else  if(id<700 && id>600)
                    {
                        tempicon.src="./icons/snow.svg"
                    }
                   else  if(id<800 && id>700)
                    {
                        tempicon.src="./icons/clouds.svg"
                    }
                     else if(id==800)
                    {
                        tempicon.src="./icons/clouds-and-sun.svg"
                    }





                    console.log(data);


            })



}
    
    
    
    )}


})