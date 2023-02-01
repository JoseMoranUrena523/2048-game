// Generate a random secret key
const secretKey = CryptoJS.lib.WordArray.random(128/8).toString();

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

// Best score getters/setters
LocalStorageManager.prototype.getSatoshisScore = function () {
  let hmac = CryptoJS.HmacSHA256(this.satoshisScoreKey, secretKey);
  let encryptedScore = this.storage.getItem(hmac.toString(CryptoJS.enc.Base64));
  let score = encryptedScore ? CryptoJS.AES.decrypt(encryptedScore.toString(), secretKey).toString(CryptoJS.enc.Utf8) : 0;
  return score;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  let hmac = CryptoJS.HmacSHA256(this.satoshisScoreKey, secretKey);
  let encryptedScore = CryptoJS.AES.encrypt(score, secretKey).toString();
  this.storage.setItem(hmac.toString(CryptoJS.enc.Base64), encryptedScore);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  let hmac = CryptoJS.HmacSHA256(this.gameStateKey, secretKey);
  let encryptedState = this.storage.getItem(hmac.toString(CryptoJS.enc.Base64));
  let state = encryptedState ? JSON.parse(CryptoJS.AES.decrypt(encryptedState.toString(), secretKey).toString(CryptoJS.enc.Utf8)) : null;
  return state;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  var hmac = CryptoJS.HmacSHA256(this.gameStateKey + JSON.stringify(gameState), this.secretKey);
  this.storage.setItem(hmac.toString(CryptoJS.enc.Hex), JSON.stringify(gameState));
};

LocalStorageManager.prototype.verifyHmac = function (key, hmac) {
  var message = this.gameStateKey + this.storage[key];
  var expectedHmac = CryptoJS.HmacSHA256(message, this.secretKey).toString(CryptoJS.enc.Hex);
  return hmac === expectedHmac;
};
