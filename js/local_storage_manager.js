var _0x38ec56=_0x2bb7;function _0x2bb7(_0x53e62f,_0x1d2ecb){var _0x2f3fa9=_0x2f3f();return _0x2bb7=function(_0x2bb779,_0x59431c){_0x2bb779=_0x2bb779-0x109;var _0xb7e44=_0x2f3fa9[_0x2bb779];return _0xb7e44;},_0x2bb7(_0x53e62f,_0x1d2ecb);}(function(_0x25eb96,_0x5b5142){var _0x10d0ac=_0x2bb7,_0x8ec8cd=_0x25eb96();while(!![]){try{var _0x528d22=-parseInt(_0x10d0ac(0x116))/0x1+-parseInt(_0x10d0ac(0x127))/0x2*(parseInt(_0x10d0ac(0x124))/0x3)+-parseInt(_0x10d0ac(0x125))/0x4*(parseInt(_0x10d0ac(0x11a))/0x5)+-parseInt(_0x10d0ac(0x11d))/0x6+parseInt(_0x10d0ac(0x113))/0x7+-parseInt(_0x10d0ac(0x10f))/0x8+-parseInt(_0x10d0ac(0x10e))/0x9*(-parseInt(_0x10d0ac(0x115))/0xa);if(_0x528d22===_0x5b5142)break;else _0x8ec8cd['push'](_0x8ec8cd['shift']());}catch(_0x262048){_0x8ec8cd['push'](_0x8ec8cd['shift']());}}}(_0x2f3f,0x60109));var LocalStorageManager=function(){var _0xdc3ab2=_0x2bb7;this[_0xdc3ab2(0x10c)]=CryptoJS['lib']['WordArray'][_0xdc3ab2(0x112)](0x80/0x8)[_0xdc3ab2(0x111)](),this[_0xdc3ab2(0x122)]=_0xdc3ab2(0x110),this[_0xdc3ab2(0x114)]=_0xdc3ab2(0x109),this[_0xdc3ab2(0x11c)]=_0xdc3ab2(0x126),this[_0xdc3ab2(0x11f)]=window[_0xdc3ab2(0x10b)];};function _0x2f3f(){var _0x2577b4=['setSatoshiScore','25OHneYo','setItem','gameStateKey','3375432SHvBFh','_hmac','storage','verifyHmac','HmacSHA256','satoshiScoreKey','removeItem','1491lOSQjB','27220TihNBg','gameState','1574eRAtzv','getItem','score','setScore','localStorage','secretKey','getSatoshiScore','25362CYeHyr','4071728PhFLFu','satoshiScore','toString','random','2883853SwzFSc','scoreKey','5750knIgdh','142146ybkyar','clearGameState','prototype'];_0x2f3f=function(){return _0x2577b4;};return _0x2f3f();}LocalStorageManager['prototype'][_0x38ec56(0x119)]=function(_0x53f021){var _0x23ea9a=_0x38ec56;this['storage'][_0x23ea9a(0x11b)](this['satoshiScoreKey'],_0x53f021);var _0x3269ea=CryptoJS[_0x23ea9a(0x121)](_0x53f021,this[_0x23ea9a(0x10c)])[_0x23ea9a(0x111)]();this[_0x23ea9a(0x11f)][_0x23ea9a(0x11b)](this['satoshiScoreKey']+'_hmac',_0x3269ea);},LocalStorageManager['prototype'][_0x38ec56(0x10d)]=function(){var _0x42f6e6=_0x38ec56,_0xe3e0b4=this[_0x42f6e6(0x11f)][_0x42f6e6(0x128)](this[_0x42f6e6(0x122)]+_0x42f6e6(0x11e));if(!this[_0x42f6e6(0x120)](this[_0x42f6e6(0x122)],_0xe3e0b4)){this['clearGameState']();return;}return this['storage']['getItem'](this[_0x42f6e6(0x122)]);},LocalStorageManager[_0x38ec56(0x118)][_0x38ec56(0x10a)]=function(_0x1ad96a){var _0x2ed4c2=_0x38ec56;this[_0x2ed4c2(0x11f)][_0x2ed4c2(0x11b)](this['scoreKey'],_0x1ad96a);var _0x22f767=CryptoJS[_0x2ed4c2(0x121)](_0x1ad96a,this[_0x2ed4c2(0x10c)])[_0x2ed4c2(0x111)]();this[_0x2ed4c2(0x11f)][_0x2ed4c2(0x11b)](this['scoreKey']+_0x2ed4c2(0x11e),_0x22f767);},LocalStorageManager['prototype']['getScore']=function(){var _0x5a0d52=_0x38ec56,_0x2f2191=this[_0x5a0d52(0x11f)][_0x5a0d52(0x128)](this[_0x5a0d52(0x114)]+'_hmac');if(!this['verifyHmac'](this[_0x5a0d52(0x114)],_0x2f2191)){this[_0x5a0d52(0x117)]();return;}return this[_0x5a0d52(0x11f)][_0x5a0d52(0x128)](this[_0x5a0d52(0x114)]);},LocalStorageManager['prototype']['setGameState']=function(_0x2a0680){var _0x5dd02a=_0x38ec56;this[_0x5dd02a(0x11f)][_0x5dd02a(0x11b)](this['gameStateKey'],_0x2a0680);var _0x256105=CryptoJS['HmacSHA256'](_0x2a0680,this[_0x5dd02a(0x10c)])['toString']();this[_0x5dd02a(0x11f)][_0x5dd02a(0x11b)](this[_0x5dd02a(0x11c)]+_0x5dd02a(0x11e),_0x256105);},LocalStorageManager[_0x38ec56(0x118)]['getGameState']=function(){var _0x32ea4a=_0x38ec56,_0x3061e4=this['storage']['getItem'](this[_0x32ea4a(0x11c)]+_0x32ea4a(0x11e));if(!this[_0x32ea4a(0x120)](this[_0x32ea4a(0x11c)],_0x3061e4)){this['clearGameState']();return;}return this[_0x32ea4a(0x11f)][_0x32ea4a(0x128)](this['gameStateKey']);},LocalStorageManager[_0x38ec56(0x118)][_0x38ec56(0x117)]=function(){var _0x49d6f4=_0x38ec56;this[_0x49d6f4(0x11f)][_0x49d6f4(0x123)](this[_0x49d6f4(0x122)]),this[_0x49d6f4(0x11f)][_0x49d6f4(0x123)](this[_0x49d6f4(0x122)]+_0x49d6f4(0x11e)),this[_0x49d6f4(0x11f)][_0x49d6f4(0x123)](this[_0x49d6f4(0x114)]),this[_0x49d6f4(0x11f)][_0x49d6f4(0x123)](this[_0x49d6f4(0x114)]+'_hmac'),this['storage'][_0x49d6f4(0x123)](this[_0x49d6f4(0x11c)]),this[_0x49d6f4(0x11f)][_0x49d6f4(0x123)](this[_0x49d6f4(0x11c)]+'_hmac');},LocalStorageManager['prototype'][_0x38ec56(0x120)]=function(_0x3ccd03,_0x169517){var _0x5b5ea5=_0x38ec56,_0x178e61=this[_0x5b5ea5(0x11f)][_0x5b5ea5(0x128)](_0x3ccd03);if(!_0x178e61)return![];var _0x5aace7=CryptoJS[_0x5b5ea5(0x121)](_0x178e61,this['secretKey'])['toString']();return _0x169517===_0x5aace7;};
