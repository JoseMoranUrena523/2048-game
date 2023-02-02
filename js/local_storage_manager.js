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
return score;
};

LocalStorageManager.prototype.getSatoshisScoreHMAC = function () {
var hmac = this.storage.getItem(this.satoshisScoreHMACKey);
if (!hmac) return null;
return hmac;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
this.storage.setItem(this.satoshisScoreKey, score);
var hmac = CryptoJS.HmacSHA256(score, this.secretKey).toString();
this.storage.setItem(this.satoshisScoreHMACKey, hmac);
};

LocalStorageManager.prototype.getGameState = function () {
var state = this.storage.getItem(this.gameStateKey);
if (!state) return null;
return state;
};

LocalStorageManager.prototype.getGameStateHMAC = function () {
var hmac = this.storage.getItem(this.gameStateHMACKey);
if (!hmac) return null;
return hmac;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
this.storage.setItem(this.gameStateKey, gameState);
var hmac = CryptoJS.HmacSHA256(gameState, this.secretKey).toString();
this.storage.setItem(this.gameStateHMACKey, hmac);
};
