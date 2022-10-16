function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.satoshisContainer   = document.querySelector(".satoshis-container");
  this.messageContainer = document.querySelector(".game-message");
  this.submitbtn = document.querySelector("#senddata");
    
  this.score = 0;
  this.satoshis = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    
    self.updateSatoshisScore(metadata.score / 500);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateSatoshisScore = function (satoshisScore) {
  this.satoshisContainer.textContent = satoshisScore;
  this.satoshis = satoshisScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};


HTMLActuator.prototype.sendData = function () {
  document.querySelector("#senddata").disabled = true;
  document.getElementById("senddata").disabled = true;
  
  var self = this;
  const gamertag = document.querySelector("#gamertag").value;
  const satoshis = (Math.trunc(self.actuator.satoshis) * 1000);
  
  if (satoshis > 75) return alert("Stop trying to cheat.");
  
  (async () => {
    const akkey = await fetch("https://clbcors-proxy.herokuapp.com/https://vault-public-vault-9b89d176.10622821.z1.hashicorp.cloud:8200/v1/zebedee/data/api", {
    method: 'GET',
    headers: {
      'X-Vault-Token': 'hvs.CAESIGoqFK3Bpaqh-UiPYskKujo1_2zqWauwHTPx02AlaXgtGicKImh2cy54bXI3WVZFUzRsazB0aXp4OEtDSnU1MFEud1k3ejIQiRE',
      'X-Vault-Namespace': 'admin'
    }
  })
    
  const vaultresponse = await akkey.json();
  var key = vaultresponse.data.data.tzfebitcoin;
    
    const res = await fetch(`https://api.zebedee.io/v0/user-id/gamertag/${gamertag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key
      }
    });
    
    const content = await res.json();
    
    if (content.data.id === "e51272e0-64d3-45f6-a46e-e2705d3d1541") {
      alert('We have banned you from playing the game due to you either stealing sats, or something else. If you think this is a false ban, email us at: 2048bitcoin@josemoranurena.tech.');
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

