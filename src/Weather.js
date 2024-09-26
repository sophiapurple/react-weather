import React,{useState} from "react";
import axios from "axios";
import "./Weather.css"



export default function Weather(){
    let[city,setCity]=useState(" ");
    let [weather, setWeather]=useState({});
    let[loaded, setLoaded]=useState(false);
    

function FormatTime(timeStamp){
    let now = new Date(timeStamp*1000);
    let year = now.getFullYear();
    let date = now.getDate();
    let month= now.getMonth();
    let months=["Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"];
     month=months[now.getMonth()];  
     let days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    let day = days[now.getDay()]  
    let hour = now.getHours();
    if(hour<10){
        hour=`0:${hour}`
    }
    else{
        hour= hour
    }
    let mins = now.getMinutes();
    if(mins < 10){
        mins =`0:${mins}`
    }
    else{
        mins=mins;
    }

    return`${day}, ${date} ${month} ${year} `
}


    function showWeather(response){
      
        
        setLoaded(true);
        setWeather({
            city: response.data.city,
            temperature: response.data.temperature.current,
           humidity:response.data.temperature.humidity,
            wind:response.data.wind.speed,
            icon:response.data.condition.icon_url,
            description:response.data.condition.description,
            time:FormatTime(response.data.time)

        });
    }

    function handleSubmit(event){
    event.preventDefault();
    let apiKey="93cf0a589b1befff9b43f05fbt79bo02"
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(showWeather);

}    

function searchCity(event){
   setCity( event.target.value); 
}

let form=(  
    
    <nav class="navbar navbar-dark bg-dark nav ">
  <div class="container-fluid nav">
    <a class="navbar-brand fs-5 ps-3 heading text-info ">Weather App</a>
    <form class="d-flex" onSubmit={handleSubmit}>
      <input class="form-control me-2 form-text " type="search" placeholder="Please enter city..."
       aria-label="Search" onChange={searchCity}/>
      <button class="btn btn-outline-light" type="submit">Search</button>
    </form>
  </div>
</nav>

)


    if(loaded){
        return(
            <div className="weather">
            <div className="weatherWrapper">
                {form}
              <div className="wrapper"> 
             
              <div className="city-humid">   
<div className="city text-white ">{weather.city}</div>
<div className="text-white">Humidity: {Math.round(weather.humidity)}%</div>
<div className="text-white"> {weather.description}</div>
</div>

<div className="time-wind"> 
<div className="time text-white">{weather.time}</div>
<div className="text-white">Wind:{Math.round(weather.wind)}km/h</div>

</div>

</div>        

<div className="temp-icon">

<div className=" icon img-fluid" ><img src={weather.icon} alt={weather.description} /></div>
<div className="text-white temp">{Math.round(weather.temperature)}°</div>

</div>
       
            </div>
            </div>
        );

        }
        else{
            return form;
        }

       
     
    }

    
  
   
    
    
     

    
  
