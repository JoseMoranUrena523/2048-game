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
  HTMLActuator.prototype.sendData = async function () {
  // Verify the satoshisScore and satoshisScore_hmac
  const satoshisScore = localStorage.getItem("satoshisScore");
  const satoshisScoreHmac = localStorage.getItem("satoshisScore_hmac");
  if (!this.storageManager.verifyHmac(satoshisScore, satoshisScoreHmac)) return alert("The satoshisScore in local storage has been tampered with.");

  if (Math.trunc(satoshisScore) !== Math.trunc(this.actuator.satoshis)) return alert("Unable to proceed with the request.");
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
  const satoshis = Math.trunc(satoshisScore) * 1000;
  const session = localStorage.getItem('sessionId');
  const quhsui8gd8ewijfw = 'qTqzknBtsZtJtcPsubNf';
  
  const message = {
    address: gamertagServer,
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
