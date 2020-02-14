
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

  export const receiveData = user => {
    console.log(user)
    // Communicating with the API gateway on localhost:8080
    return fetch(`${process.env.REACT_APP_API_URL}/sessionData/${user}`, {
      method: "Get",
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };