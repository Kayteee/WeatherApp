import React from "react";
import Titles from "./Titles";
import Form from "./Form";
import Weather from "./Weather";

const API_KEY = "ff5d084541aac5b27ef0f46c449da8ca";

class App extends React.Component {

  state = {
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined

  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && data.cod===200) {
    console.log(data,'data')
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });

  } else {
    this.setState({
      temperature:'',
      city: '',
      humidity: '',
      description:'',
      error: 'Please enter the correct city name!!'
    });
  };
};

  render() { 
    return (
      <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                  <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    humidity ={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
};



export default App;
