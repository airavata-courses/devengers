
export const sendData = (weather,token) => {
    console.log(weather);
    // Communicating with the API gateway on localhost:8080
    return fetch(`${process.env.REACT_APP_API_URL}/weatherData`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(weather)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const getSingleData = correlationid => {
    return fetch(`${process.env.REACT_APP_API_URL}/corelationid/${correlationid}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const receiveData = (user,token) => {
    console.log(user.name);
    // Communicating with the API gateway on localhost:8080
    return fetch(`${process.env.REACT_APP_API_URL}/sessionData/{user.name}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };