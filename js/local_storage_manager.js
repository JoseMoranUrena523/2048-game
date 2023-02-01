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

LocalStorageManager.prototype.getSatoshisScore = function () {
  var data = this.storage.getItem(this.satoshisScoreKey);
  if (!data) {
    return 0;
  }
  var hmac = CryptoJS.HmacSHA256(data.value, this.secretKey);
  if (hmac.toString() === data.hmac.toString()) {
    return data.value;
  }
  return 0;
};

LocalStorageManager.prototype.setSatoshisScore = function (score) {
  var hmac = CryptoJS.HmacSHA256(score, this.secretKey);
  this.storage.setItem(this.satoshisScoreKey, {
    value: score,
    hmac: hmac
  });
};

LocalStorageManager.prototype.getGameState = function () {
  var data = this.storage.getItem(this.gameStateKey);
  if (!data) {
    return null;
  }
  var hmac = CryptoJS.HmacSHA256(data.value, this.secretKey);
  if (hmac.toString() === data.hmac.toString()) {
    return JSON.parse(data.value);
  }
  return null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  var hmac = CryptoJS.HmacSHA256(JSON.stringify(gameState), this.secretKey);
  this.storage.setItem(this.gameStateKey, {
    value: JSON.stringify(gameState),
    hmac: hmac
  });
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
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
