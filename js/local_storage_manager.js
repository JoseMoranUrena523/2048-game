window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    var secretKey = CryptoJS.lib.WordArray.random(128/8);
    var hmac = CryptoJS.HmacSHA256(val, secretKey);
    this._data[id] = {
        secretKey: secretKey,
        value: String(val),
        hmac: hmac
    };
  },

  getItem: function (id) {
    if (this._data.hasOwnProperty(id)) {
        var data = this._data[id];
        var hmac = CryptoJS.HmacSHA256(data.value, data.secretKey);
        if (hmac.toString() === data.hmac.toString()) {
            return data.value;
        }
    }
    return undefined;
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
  this.satoshisScoreHmacKey = "satoshisScore_hmac";
  this.gameStateKey = "gameState";
  this.gameStateHmacKey = "gameState_hmac";
  this.secretKey = CryptoJS.lib.WordArray.random(128/8);

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

LocalStorageManager.prototype.computeHMAC = function (data) {
  return CryptoJS.HmacSHA256(data, this.secretKey).toString();
};


LocalStorageManager.prototype.getGameState = function () {
  var state = this.storage.getItem(this.gameStateKey);
  var hmac = this.storage.getItem(this.gameStateKey + "_hmac");
  if (!state || !hmac) {
    return;
  }
  if (!this.verifyHMAC(state, hmac)) {
    console.warn("Warning: HMAC validation failed for game state. Ignoring saved state...");
    return;
  }
  return JSON.parse(state);
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  gameState = JSON.stringify(gameState);
  var hmac = this.computeHMAC(gameState);
  this.storage.setItem(this.gameStateKey, gameState);
  this.storage.setItem(this.gameStateKey + "_hmac", hmac);
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
  this.storage.removeItem(this.gameStateKey + "_hmac");
};

LocalStorageManager.prototype.verifyHMAC = function (data, hmac) {
  return CryptoJS.HmacSHA256(data, this.secretKey).toString() === hmac;
};

LocalStorageManager.prototype.getSatoshisScore = function () {
  var score = this.storage.getItem(this.satoshisScoreKey);
  var hmac = this.storage.getItem(this.satoshisScoreHmacKey);
  
  if (!this.verifyHMAC(score, hmac)) {
    console.error('Invalid HMAC for satoshis score. Discarding score.');
    this.clearSatoshisScore();
    return;
  }

  return JSON.parse(score);
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  var hmac = CryptoJS.HmacSHA256(JSON.stringify(score), this.secretKey).toString();
  this.storage.setItem(this.satoshisScoreKey, JSON.stringify(score));
  this.storage.setItem(this.satoshisScoreHMACKey, hmac);
};

LocalStorageManager.prototype.clearSatoshisScore = function () {
  this.storage.removeItem(this.satoshisScoreKey);
  this.storage.removeItem(this.satoshisScoreHMACKey);
};


LocalStorageManager.prototype.verifyHmac = function (id, hmac) {
   var storedValue = this.storage.getItem(id);
   if (!storedValue) {
     return false;
   }

   var data = storedValue.substr(0, storedValue.length - 64);
   var storedHmac = storedValue.substr(storedValue.length - 64);
   var calculatedHmac = CryptoJS.HmacSHA256(data, this.secretKey).toString();

   return calculatedHmac === storedHmac;
};
