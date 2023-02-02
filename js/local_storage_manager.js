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
  this.satoshisScoreKey = "satoshisScore";
  this.satoshisScoreHMACKey = "satoshisScore_hmac";
  this.gameStateKey = "gameState";
  this.gameStateHMACKey = "gameState_hmac";

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
  var scoreHMAC = this.storage.getItem(this.satoshisScoreHMACKey);
  
  if (!score || !scoreHMAC) return null;
  
  var calculatedHMAC = CryptoJS.HmacSHA256(score, this.secretKey).toString();
  
  if (calculatedHMAC !== scoreHMAC) return null;
  
  return score;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  var hmac = CryptoJS.HmacSHA256(score, this.secretKey).toString();
  this.storage.setItem(this.satoshisScoreKey, score);
  this.storage.setItem(this.satoshisScoreHMACKey, hmac);
};

// Game state getters/setters and clearing with HMAC integration
LocalStorageManager.prototype.getGameState = function () {
  var stateString = this.storage.getItem(this.gameStateKey);
  var stateHMAC = this.storage.getItem(this.gameStateHMACKey);
  
  if (!stateString || !stateHMAC) return null;
  
  var calculatedHMAC = CryptoJS.HmacSHA256(stateString, this.secretKey).toString();
  
  if (calculatedHMAC !== stateHMAC) return null;
  
  return JSON.parse(stateString);
};

LocalStorageManager.prototype.setGameState = function (state) {
  var stateString = JSON.stringify(state);
  var hmac = CryptoJS.HmacSHA256(stateString, this.secretKey).toString();
  this.storage.setItem(this.gameStateKey, stateString);
  this.storage.setItem(this.gameStateHMACKey, hmac);
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

LocalStorageManager.prototype.verifyHmac = function (data, hmac) {
  var calculatedHmac = CryptoJS.HmacSHA256(data, this.secretKey).toString();
  
  return calculatedHmac === hmac;
};

// Clear all saved data
LocalStorageManager.prototype.clearAll = function () {
  this.storage.clear();
};
