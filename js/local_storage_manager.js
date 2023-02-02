window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.satoshisScoreKey     = "satoshisScore";
  this.gameStateKey     = "gameState";

  this.secretKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters with HMAC integration
LocalStorageManager.prototype.getSatoshisScore = function () {
  var score = this.storage.getItem(this.satoshisScoreKey);
  if (!score) return null;
  
  var scoreWithHMAC = JSON.parse(score);
  var calculatedHMAC = CryptoJS.HmacSHA256(scoreWithHMAC.score, this.secretKey).toString();
  
  if (calculatedHMAC !== scoreWithHMAC.hmac) return null;
  
  return scoreWithHMAC.score;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  this.storage.setItem(this.satoshisScoreKey, score);
};

// Game state getters/setters and clearing with HMAC integration
LocalStorageManager.prototype.getGameState = function () {
  var state = this.storage.getItem(this.gameStateKey);
  if (!state) return null;
  
  var stateWithHMAC = JSON.parse(state);
  var calculatedHMAC = CryptoJS.HmacSHA256(stateWithHMAC.state, this.secretKey).toString();
  
  if (calculatedHMAC !== stateWithHMAC.hmac) return null;
  
  return stateWithHMAC.state;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  var secretKey = Math.random().toString(36).slice(-8);
  var hmac = CryptoJS.HmacSHA256(JSON.stringify(gameState), secretKey);
  var hmacGameState = {
    data: gameState,
    hmac: hmac.toString()
  };
  this.storage.setItem(this.gameStateKey, JSON.stringify(hmacGameState));
};
