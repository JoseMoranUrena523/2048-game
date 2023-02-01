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
  this.gameStateKey = "gameState";
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
  return this.storage.getItem(this.satoshisScoreKey) || 0;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  this.storage.setItem(this.satoshisScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var state = this.storage.getItem(this.gameStateKey);
  return state ? JSON.parse(state) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

LocalStorageManager.prototype.setItem = function (id, val) {
  var hmac = CryptoJS.HmacSHA256(val, this.secretKey).toString();
  this.storage.setItem(id, val + hmac);
};

LocalStorageManager.prototype.getItem = function (id) {
  var storedValue = this.storage.getItem(id);
   if (!storedValue) {
     return undefined;
   }

   var data = storedValue.substr(0, storedValue.length - 64);
   var storedHmac = storedValue.substr(storedValue.length - 64);
   var calculatedHmac = CryptoJS.HmacSHA256(data, this.secretKey).toString();

   if (calculatedHmac === storedHmac) {
     return data;
   }
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
