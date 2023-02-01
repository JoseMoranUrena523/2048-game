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
  this.scoreKey = "score";
  this.scoreHMACKey = "score_hmac";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
  this.secretKey = this.generateSecretKey();
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

LocalStorageManager.prototype.generateSecretKey = function() {
  return CryptoJS.lib.WordArray.random(128/8);
};

LocalStorageManager.prototype.getSatoshisScore = function () {
  var satoshisScore = this.storage.getItem(this.satoshisScoreKey);
  var satoshisScoreHMAC = this.storage.getItem(this.satoshisScoreHMACKey);
  if (!satoshisScore || !satoshisScoreHMAC) {
    return 0;
  }
  if (satoshisScoreHMAC !== CryptoJS.HmacSHA256(satoshisScore, this.secretKey).toString(CryptoJS.enc.Hex)) {
    throw new Error("Invalid HMAC value for satoshisScore");
  }
  return parseInt(satoshisScore, 10);
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  this.storage.setItem(this.satoshisScoreKey, score.toString());
  this.storage.setItem(this.satoshisScoreHMACKey, CryptoJS.HmacSHA256(score.toString(), this.secretKey).toString(CryptoJS.enc.Hex));
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  var secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  var hmac = CryptoJS.HmacSHA256(JSON.stringify(gameState), secret);
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  this.storage.setItem(this.gameStateKey + "_hmac", hmac.toString());
};

LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  var hmac = this.storage.getItem(this.gameStateKey + "_hmac");
  if (!stateJSON || !hmac) return null;

  var gameState = JSON.parse(stateJSON);
  var secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  var expectedHmac = CryptoJS.HmacSHA256(JSON.stringify(gameState), secret);

  if (hmac !== expectedHmac.toString()) return null;

  return gameState;
};

