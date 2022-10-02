function cashout(apikey, self) {
  document.querySelector("#senddata").disabled = true;
  document.getElementById("senddata").disabled = true;
  
  const key = atob(self.actuator.ak);
  const gamertag = document.querySelector("#gamertag").value;
  const satoshis = (Math.round(self.actuator.satoshis) * 1000);
  
  (async () => {
    const res = await fetch(`https://api.zebedee.io/v0/user-id/gamertag/${gamertag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key
      }
    });
    
    const content = await res.json();
    
    if (content.data.id === "74f66389-0746-4156-b944-9b4e00a3b642") {
      alert('We have banned you from playing the game due to you either stealing sats, or something else. If you think this is a false ban, please use the sidebar and click "Contact Us" to appeal.');
      console.log(res);
      localStorage.clear();
      window.location.reload();
    } else {
      const res3 = await fetch(`https://api.zebedee.io/v0/ln-address/validate/${gamertag}@zbd.gg`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key
        }
      });
      
      const content3 = await res3.json();
      
      if (content3.data.valid = true) {
      const body = JSON.stringify({ gamertag: gamertag, amount: satoshis, description: "Thank you for playing 2048 Bitcoin! Please share this game to your friends and continue playing!" });
      
      const res2 = await fetch('https://api.zebedee.io/v0/gamertag/send-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key
      },
      body: body
    });

    const content2 = await res2.json();
    if (res2.statusCode === 404) {
      alert("Cash out failed, please contact the developers of this project!");
      console.log(res);
      localStorage.clear();
      window.location.reload();
    } else {
      alert("Cash out successful! Please check your ZEBEDEE wallet.");
      console.log(res);
      localStorage.clear();
      window.location.reload();
    }
      } else {
      alert("Invalid ZEBEDEE Gamertag, please try again.");
      }
    }
  })();
};
