export const sendData = weather => {
    console.log(weather);
    // Communicating with the API gateway on localhost:8080
    return fetch(`${process.env.API_GATEWAY}/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(weather)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
