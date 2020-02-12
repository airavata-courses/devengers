
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
