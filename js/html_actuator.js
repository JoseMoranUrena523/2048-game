function generateRandomSalt() {
    var randomBytes = CryptoJS.lib.WordArray.random(10);
    var hexString = CryptoJS.enc.Hex.stringify(randomBytes);
    return hexString;
}

function hashFunction(str) {
    var hash = CryptoJS.SHA256(str);
    return hash;
}

function HTMLActuator() {
    this.tileContainer    = document.querySelector(".tile-container");
    this.scoreContainer   = document.querySelector(".score-container");
    this.satoshisContainer   = document.querySelector(".satoshis-container");
    this.messageContainer = document.querySelector(".game-message");
    this.submitbtn = document.querySelector("#senddata");
    this.score = 0;
    this.satoshis = 0;
    // Generate new salts when the game starts
    this.scoreSalt = generateRandomSalt();
    this.satoshisSalt = generateRandomSalt();
    // Store the original score and salt in local storage
    localStorage.setItem("originalScore", this.score);
    localStorage.setItem("scoreSalt", this.scoreSalt);
    localStorage.setItem("originalSatoshis", this.satoshis);
    localStorage.setItem("satoshisSalt", this.satoshisSalt);
    // Hash the original score and salt and store it in local storage
    localStorage.setItem("originalScoreHash", hashFunction(this.score + this.scoreSalt));
    localStorage.setItem("originalSatoshisHash", hashFunction(this.satoshis + this.satoshisSalt));
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
      const score1 = parseFloat(metadata.score / 400);
      const score2 = score1.toFixed(2);
      self.updateSatoshisScore(score2);
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
    try {
        // Get the original score, salt, and hash from local storage
        var originalScore = localStorage.getItem("originalScore");
        var salt = localStorage.getItem("scoreSalt");
        var originalHash = localStorage.getItem("originalScoreHash");

        // Create a salted hash of the current score
        var currentHash = hashFunction(score + salt);

        if(originalScore == null || salt == null || originalHash == null){
            window.close();
            return;
        }

        // Compare the current hash to the original hash
        if (currentHash !== originalHash) {
            // The score has been modified, so set it back to the original score
            score = originalScore;
        }

        // Update the visual representation of the score
        this.clearContainer(this.scoreContainer);
        var difference = score - this.score;
        this.score = score;
        this.scoreContainer.textContent = this.score;
    } catch (err) {
        console.error("Error while validating score: ", err);
        window.close();
    }

};

HTMLActuator.prototype.updateSatoshisScore = function (satoshis) {
    try {
        // Get the original satoshis, salt, and hash from local storage
        var originalSatoshis = localStorage.getItem("originalSatoshis");
        var salt = localStorage.getItem("satoshisSalt");
        var originalHash = localStorage.getItem("originalSatoshisHash");

        // Create a salted hash of the current satoshis
        var currentHash = hashFunction(satoshis + salt);

        if(originalSatoshis == null || salt == null || originalHash == null){
            window.close();
            return;
        }

        // Compare the current hash to the original hash
        if (currentHash !== originalHash) {
            // The satoshis have been modified, so set it back to the original satoshis
            satoshis = originalSatoshis;
        }

        // Update the visual representation of the satoshis
        this.clearContainer(this.satoshisContainer);
        this.satoshis = satoshis;
        this.satoshisContainer.textContent = this.satoshis;

    } catch (err) {
        console.error("Error while validating satoshis: ", err);
        window.close();
    }
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
  HTMLActuator.prototype.sendData = async function () {
  if (Math.trunc(localStorage.getItem('satoshisScore')) !== Math.trunc(this.actuator.satoshis)) return alert("Unable to proceed with the request.");
  const sendDataButton = document.querySelector("#senddata");
  sendDataButton.value = "Loading...";
  sendDataButton.disabled = true;

  const parent = document.querySelector('.h-captcha');
  const iframe = parent.querySelector('iframe');
  const hCaptchaResponse = iframe.getAttribute("data-hcaptcha-response");

  const data = new URLSearchParams();
  data.append('response', hCaptchaResponse);

  const hcaptcha = await fetch('https://clb-cashout.herokuapp.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });

  const hcaptchajson = await hcaptcha.json();
  if (!hcaptchajson.success) {
    sendDataButton.disabled = false;
    sendDataButton.value = "Submit";
    return alert("Be sure to do the hCaptcha before cashing out!");
  }

  // -----------------------------------------------------------------------------------------------------------------------------

  const gamertagServer = document.querySelector("#gamertag").value.trim().replace(/\s{2,}/g, ' ');
  const satoshis = Math.trunc(localStorage.getItem('satoshisScore')) * 1000;
  const session = localStorage.getItem('sessionId');
  const quhsui8gd8ewijfw = 'qTqzknBtsZtJtcPsubNf';
  
  const message = {
    gamertag: gamertagServer,
    sats: satoshis,
    session: session
  };
  
  const queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
  const signature = CryptoJS.HmacSHA256(queryString, quhsui8gd8ewijfw).toString(CryptoJS.enc.Hex);
  
  const res2 = await fetch(`https://clb-cashout.herokuapp.com/cashout?${queryString}&signature=${signature}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const res2json = await res2.json();
  sendDataButton.value = "Submit";
  const alertMessage = res2json.msg;
  alert(alertMessage);
  localStorage.clear();
  window.location.reload();
};
