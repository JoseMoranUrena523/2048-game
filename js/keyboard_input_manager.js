function KeyboardInputManager() {
  this.events = {};

  if (window.navigator.msPointerEnabled) {
    //Internet Explorer 10 style
    this.eventTouchstart    = "MSPointerDown";
    this.eventTouchmove     = "MSPointerMove";
    this.eventTouchend      = "MSPointerUp";
  } else {
    this.eventTouchstart    = "touchstart";
    this.eventTouchmove     = "touchmove";
    this.eventTouchend      = "touchend";
  }

  // Add variables to track anti-cheat information
  this.lastKeyPressTime = 0;
  this.moveCount = 0;
  this.moveCountStartTime = 0;
  this.previousMove = -1;

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3  // A
  };
 
  // Respond to direction keys
  document.addEventListener("keydown", function (event) {
    // Check if modal is open
    if(document.querySelector(".modal.show-modal")){
      return;
    }

    var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                      event.shiftKey;
    var mapped    = map[event.which];

    if (!modifiers) {
      if (mapped !== undefined) {
        // Anti-cheat checks
        var currentTime = Date.now();
        if (currentTime - self.lastKeyPressTime < 100) {
          console.log("Possible macro detected, blocking move.");
          return;
        }
        self.lastKeyPressTime = currentTime;

        if(self.moveCountStartTime === 0){
          self.moveCountStartTime = currentTime;
        }

        if (self.moveCount >= 20 && (currentTime - self.moveCountStartTime) <= 1000) {
          console.log("Too many moves in a short period of time, blocking move.");
          return;
        }

        if (self.previousMove === mapped) {
          console.log("Too many repetitive moves, blocking move.");
          return;
        }

        self.previousMove = mapped;
        self.moveCount++;

        event.preventDefault();
        self.emit("move", mapped);
      }
    }
  });

  // Respond to button presses
  this.bindButtonPress(".retry-button", this.restart);
  this.bindButtonPress(".keep-playing-button", this.keepPlaying);
  this.bindButtonPress("#senddata", this.sendData);
  // Respond to swipe events
  var touchStartClientX, touchStartClientY;
  var gameContainer = document.getElementsByClassName("game-container")[0];

  gameContainer.addEventListener(this.eventTouchstart, function (event) {
    if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
        event.targetTouches.length > 1) {
      return; // Ignore if touching with more than 1 finger
    }

    if (window.navigator.msPointerEnabled) {
      touchStartClientX = event.pageX;
      touchStartClientY = event.pageY;
    } else {
      touchStartClientX = event.touches[0].clientX;
      touchStartClientY = event.touches[0].clientY;
    }
});

  gameContainer.addEventListener(this.eventTouchmove, function (event) {
    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchend, function (event) {
    if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
      event.targetTouches.length > 0) {
      return; // Ignore if still touching with one or more fingers
    }
    var touchEndClientX, touchEndClientY;

    if (window.navigator.msPointerEnabled) {
      touchEndClientX = event.pageX;
      touchEndClientY = event.pageY;
    } else {
      touchEndClientX = event.changedTouches[0].clientX;
      touchEndClientY = event.changedTouches[0].clientY;
    }

    var dx = touchEndClientX - touchStartClientX;
    var absDx = Math.abs(dx);

    var dy = touchEndClientY - touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      // (right : left) : (down : up)
      self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
    }
  });
};
