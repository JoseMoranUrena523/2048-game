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

// Best score getters/setters
LocalStorageManager.prototype.getSatoshisScore = function () {
  var score = this.storage.getItem(this.satoshisScoreKey);
  var hmac = this.storage.getItem(this.satoshisScoreHmacKey);
  if (!score || !hmac) {
    return undefined;
  }

  var calculatedHmac = CryptoJS.HmacSHA256(score, this.secretKey).toString();
  if (calculatedHmac !== hmac) {
    return undefined;
  }

  return score;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  var hmac = CryptoJS.HmacSHA256(score, this.secretKey).toString();
  this.storage.setItem(this.satoshisScoreKey, score);
  this.storage.setItem(this.satoshisScoreHmacKey, hmac);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var state = this.storage.getItem(this.gameStateKey);
  var hmac = this.storage.getItem(this.gameStateKey + "_hmac");

  if (!state || !hmac) {
    return undefined;
  }

  if (!this.verifyHmac(this.gameStateKey, hmac)) {
    this.clearGameState();
    return undefined;
  }

  return JSON.parse(state);
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  var state = JSON.stringify(gameState);
  var hmac = CryptoJS.HmacSHA256(state, this.secretKey).toString();

  this.storage.setItem(this.gameStateKey, state);
  this.storage.setItem(this.gameStateKey + "_hmac", hmac);
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
  this.storage.removeItem(this.gameStateKey + "_hmac");
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
