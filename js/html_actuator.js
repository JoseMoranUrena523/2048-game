function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.satoshisContainer   = document.querySelector(".satoshis-container");
  this.messageContainer = document.querySelector(".game-message");
  this.submitbtn = document.querySelector("#senddata");
  
  this.ak = 'N0x0OXAxVnZSZlZjWVpXM0Q0a3BJb2UzeUp4YlA4QTA=';
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
  const queryString = window.location.search;
  if (queryString === null) {
    console.log("test");
  } else {
    const urlParams = new URLSearchParams(queryString);
    
    const code = urlParams.get('code');
    const res = await fetch(`https://api.zebedee.io/v0/oauth2/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${code}`,
        'Content-Type': 'application/json',
      }
    });
    
    const content = await res.json();
    console.log(content);
  }
  
  document.querySelector("#senddata").disabled = true;
  document.getElementById("senddata").disabled = true;
  
  var self = this;
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

