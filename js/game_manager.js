function _0x1a69(_0x151659,_0x57f50f){var _0x1aeb3a=_0x1aeb();return _0x1a69=function(_0x1a69d8,_0x4384bd){_0x1a69d8=_0x1a69d8-0x1d0;var _0x494a20=_0x1aeb3a[_0x1a69d8];return _0x494a20;},_0x1a69(_0x151659,_0x57f50f);}var _0x296541=_0x1a69;function _0x1aeb(){var _0x28f451=['getGameState','1075263SMvmFx','next','getItem','238877lUDLbw','isGameTerminated','positionsEqual','toFixed','random','No\x20session\x20ID\x20here.','actuate','findFarthestPosition','getVector','restart','tileMatchesAvailable','setSatoshisScore','log','13406700hrxAru','inputManager','42HESOkm','sessionId','movesAvailable','over','moveTile','addRandomTile','mergedFrom','score','cells','&sats=','cellsAvailable','trunc','serialize','sendData','105GQnjoG','updatePosition','actuator','setup','keepPlaying','insertTile','230872SWSgsL','removeTile','bind','prototype','withinBounds','satoshisScore','setItem','addStartTiles','storageManager','move','cellContent','255353Vukuzy','eachCell','2815785Hdtate','won','push','7588592rIRVNi','size','buildTraversals','no-cors','continueGame','setGameState','value','6AxknVD','grid','prepareTiles','json','startTiles','forEach','clearGameState'];_0x1aeb=function(){return _0x28f451;};return _0x1aeb();}(function(_0x3b83fa,_0x18015a){var _0xcd89f9=_0x1a69,_0x4eb456=_0x3b83fa();while(!![]){try{var _0x11529b=-parseInt(_0xcd89f9(0x1ee))/0x1*(parseInt(_0xcd89f9(0x1e3))/0x2)+parseInt(_0xcd89f9(0x1eb))/0x3+-parseInt(_0xcd89f9(0x211))/0x4*(parseInt(_0xcd89f9(0x20b))/0x5)+parseInt(_0xcd89f9(0x1fd))/0x6*(-parseInt(_0xcd89f9(0x1d7))/0x7)+parseInt(_0xcd89f9(0x1dc))/0x8+parseInt(_0xcd89f9(0x1d9))/0x9+parseInt(_0xcd89f9(0x1fb))/0xa;if(_0x11529b===_0x18015a)break;else _0x4eb456['push'](_0x4eb456['shift']());}catch(_0x4616c1){_0x4eb456['push'](_0x4eb456['shift']());}}}(_0x1aeb,0xbd914));function GameManager(_0x12c6d7,_0x387623,_0x4f88b2,_0xe3ab26){var _0xd263cb=_0x1a69;this[_0xd263cb(0x1dd)]=_0x12c6d7,this[_0xd263cb(0x1fc)]=new _0x387623(),this[_0xd263cb(0x1d4)]=new _0xe3ab26(),this['actuator']=new _0x4f88b2(),this[_0xd263cb(0x1e7)]=0x2,this['inputManager']['on'](_0xd263cb(0x1d5),this[_0xd263cb(0x1d5)]['bind'](this)),this[_0xd263cb(0x1fc)]['on'](_0xd263cb(0x1f7),this[_0xd263cb(0x1f7)][_0xd263cb(0x213)](this)),this[_0xd263cb(0x1fc)]['on']('keepPlaying',this[_0xd263cb(0x20f)]['bind'](this)),this['inputManager']['on'](_0xd263cb(0x20a),this['actuator'][_0xd263cb(0x20a)][_0xd263cb(0x213)](this)),this['setup']();}GameManager[_0x296541(0x214)][_0x296541(0x1f7)]=function(){var _0x26670d=_0x296541;this['storageManager'][_0x26670d(0x1e9)](),this[_0x26670d(0x20d)][_0x26670d(0x1e0)](),this[_0x26670d(0x20e)]();},GameManager[_0x296541(0x214)]['keepPlaying']=function(){var _0x309547=_0x296541;this['keepPlaying']=![],this['actuator'][_0x309547(0x1e0)]();},GameManager[_0x296541(0x214)][_0x296541(0x1ef)]=function(){var _0x4f329f=_0x296541;const _0x4a9918=localStorage[_0x4f329f(0x1ed)](_0x4f329f(0x1fe)),_0x14468b=localStorage[_0x4f329f(0x1ed)](_0x4f329f(0x1d1)),_0x37252e=Math[_0x4f329f(0x208)](_0x14468b);return this[_0x4f329f(0x200)]&&fetch('https://clb-cashout.herokuapp.com/update-session?id='+_0x4a9918+_0x4f329f(0x206)+_0x37252e,{'mode':_0x4f329f(0x1df)}),this[_0x4f329f(0x200)]||this[_0x4f329f(0x1da)]&&!this[_0x4f329f(0x20f)];},GameManager[_0x296541(0x214)][_0x296541(0x20e)]=async function(){var _0x1d8ff5=_0x296541,_0x2315d1=this[_0x1d8ff5(0x1d4)][_0x1d8ff5(0x1ea)]();_0x2315d1?(this[_0x1d8ff5(0x1e4)]=new Grid(_0x2315d1[_0x1d8ff5(0x1e4)][_0x1d8ff5(0x1dd)],_0x2315d1[_0x1d8ff5(0x1e4)][_0x1d8ff5(0x205)]),this[_0x1d8ff5(0x204)]=_0x2315d1[_0x1d8ff5(0x204)],this['over']=_0x2315d1[_0x1d8ff5(0x200)],this[_0x1d8ff5(0x1da)]=_0x2315d1['won'],this[_0x1d8ff5(0x20f)]=_0x2315d1[_0x1d8ff5(0x20f)]):(this[_0x1d8ff5(0x1e4)]=new Grid(this['size']),this[_0x1d8ff5(0x204)]=0x0,this[_0x1d8ff5(0x200)]=![],this[_0x1d8ff5(0x1da)]=![],this[_0x1d8ff5(0x20f)]=![],this[_0x1d8ff5(0x1d3)]());this[_0x1d8ff5(0x1f4)]();try{const _0x4fb2fa=await fetch('https://clb-cashout.herokuapp.com/generate-session');console[_0x1d8ff5(0x1fa)](_0x4fb2fa);const _0x334a2f=await _0x4fb2fa[_0x1d8ff5(0x1e6)]();_0x334a2f['id']?localStorage[_0x1d8ff5(0x1d2)](_0x1d8ff5(0x1fe),_0x334a2f['id']):console[_0x1d8ff5(0x1fa)](_0x1d8ff5(0x1f3));}catch(_0x3c0fd7){console['log'](_0x3c0fd7);}},GameManager[_0x296541(0x214)]['addStartTiles']=function(){var _0x3844fa=_0x296541;for(var _0x194d0b=0x0;_0x194d0b<this[_0x3844fa(0x1e7)];_0x194d0b++){this['addRandomTile']();}},GameManager[_0x296541(0x214)][_0x296541(0x202)]=function(){var _0x52b32e=_0x296541;if(this[_0x52b32e(0x1e4)][_0x52b32e(0x207)]()){var _0x4f9e5e=Math[_0x52b32e(0x1f2)]()<0.9?0x2:0x4,_0x470bc5=new Tile(this[_0x52b32e(0x1e4)]['randomAvailableCell'](),_0x4f9e5e);this[_0x52b32e(0x1e4)][_0x52b32e(0x210)](_0x470bc5);}},GameManager[_0x296541(0x214)][_0x296541(0x1f4)]=function(){var _0x3948a4=_0x296541;if(this[_0x3948a4(0x1d4)]['getSatoshisScore']()<this[_0x3948a4(0x204)]){let _0x453393=this[_0x3948a4(0x204)]/0x1f4,_0xae096a=parseFloat(_0x453393);this[_0x3948a4(0x1d4)][_0x3948a4(0x1f9)](_0xae096a[_0x3948a4(0x1f1)](0x2));}this[_0x3948a4(0x200)]?this[_0x3948a4(0x1d4)]['clearGameState']():this['storageManager'][_0x3948a4(0x1e1)](this[_0x3948a4(0x209)]()),this[_0x3948a4(0x20d)][_0x3948a4(0x1f4)](this[_0x3948a4(0x1e4)],{'score':this['score'],'over':this[_0x3948a4(0x200)],'won':this[_0x3948a4(0x1da)],'satoshisScore':this[_0x3948a4(0x1d4)]['getSatoshisScore'](),'terminated':this[_0x3948a4(0x1ef)]()});},GameManager[_0x296541(0x214)]['serialize']=function(){var _0x2f6f38=_0x296541;return{'grid':this['grid'][_0x2f6f38(0x209)](),'score':this[_0x2f6f38(0x204)],'over':this[_0x2f6f38(0x200)],'won':this[_0x2f6f38(0x1da)],'keepPlaying':this[_0x2f6f38(0x20f)]};},GameManager[_0x296541(0x214)]['prepareTiles']=function(){var _0x5b76fb=_0x296541;this[_0x5b76fb(0x1e4)][_0x5b76fb(0x1d8)](function(_0x2d4908,_0x4793c9,_0x3b2ed0){var _0xbc39ad=_0x5b76fb;_0x3b2ed0&&(_0x3b2ed0[_0xbc39ad(0x203)]=null,_0x3b2ed0['savePosition']());});},GameManager[_0x296541(0x214)]['moveTile']=function(_0x1b7245,_0x323feb){var _0x1cc651=_0x296541;this['grid'][_0x1cc651(0x205)][_0x1b7245['x']][_0x1b7245['y']]=null,this[_0x1cc651(0x1e4)][_0x1cc651(0x205)][_0x323feb['x']][_0x323feb['y']]=_0x1b7245,_0x1b7245[_0x1cc651(0x20c)](_0x323feb);},GameManager['prototype'][_0x296541(0x1d5)]=function(_0x5cc4ab){var _0x1a2c3a=_0x296541,_0x187a3c=this;if(this[_0x1a2c3a(0x1ef)]())return;var _0x4cdc59,_0x313b57,_0x4684b8=this['getVector'](_0x5cc4ab),_0x5ae0dd=this[_0x1a2c3a(0x1de)](_0x4684b8),_0x41cea9=![];this[_0x1a2c3a(0x1e5)](),_0x5ae0dd['x'][_0x1a2c3a(0x1e8)](function(_0x3c01ba){var _0x4af7d5=_0x1a2c3a;_0x5ae0dd['y'][_0x4af7d5(0x1e8)](function(_0xfcf54c){var _0x25f85a=_0x4af7d5;_0x4cdc59={'x':_0x3c01ba,'y':_0xfcf54c},_0x313b57=_0x187a3c[_0x25f85a(0x1e4)][_0x25f85a(0x1d6)](_0x4cdc59);if(_0x313b57){var _0x2256e2=_0x187a3c[_0x25f85a(0x1f5)](_0x4cdc59,_0x4684b8),_0x89656e=_0x187a3c[_0x25f85a(0x1e4)][_0x25f85a(0x1d6)](_0x2256e2['next']);if(_0x89656e&&_0x89656e['value']===_0x313b57[_0x25f85a(0x1e2)]&&!_0x89656e[_0x25f85a(0x203)]){var _0x38ff95=new Tile(_0x2256e2[_0x25f85a(0x1ec)],_0x313b57[_0x25f85a(0x1e2)]*0x2);_0x38ff95['mergedFrom']=[_0x313b57,_0x89656e],_0x187a3c['grid'][_0x25f85a(0x210)](_0x38ff95),_0x187a3c[_0x25f85a(0x1e4)][_0x25f85a(0x212)](_0x313b57),_0x313b57[_0x25f85a(0x20c)](_0x2256e2[_0x25f85a(0x1ec)]),_0x187a3c[_0x25f85a(0x204)]+=_0x38ff95[_0x25f85a(0x1e2)];if(_0x38ff95[_0x25f85a(0x1e2)]===0x800)_0x187a3c[_0x25f85a(0x1da)]=!![];}else _0x187a3c[_0x25f85a(0x201)](_0x313b57,_0x2256e2['farthest']);!_0x187a3c[_0x25f85a(0x1f0)](_0x4cdc59,_0x313b57)&&(_0x41cea9=!![]);}});}),_0x41cea9&&(this[_0x1a2c3a(0x202)](),!this[_0x1a2c3a(0x1ff)]()&&(this[_0x1a2c3a(0x200)]=!![]),this[_0x1a2c3a(0x1f4)]());},GameManager['prototype'][_0x296541(0x1f6)]=function(_0x578b28){var _0x450791={0x0:{'x':0x0,'y':-0x1},0x1:{'x':0x1,'y':0x0},0x2:{'x':0x0,'y':0x1},0x3:{'x':-0x1,'y':0x0}};return _0x450791[_0x578b28];},GameManager['prototype'][_0x296541(0x1de)]=function(_0x21aef9){var _0x23cb25=_0x296541,_0x4a2a8b={'x':[],'y':[]};for(var _0x563db1=0x0;_0x563db1<this['size'];_0x563db1++){_0x4a2a8b['x'][_0x23cb25(0x1db)](_0x563db1),_0x4a2a8b['y']['push'](_0x563db1);}if(_0x21aef9['x']===0x1)_0x4a2a8b['x']=_0x4a2a8b['x']['reverse']();if(_0x21aef9['y']===0x1)_0x4a2a8b['y']=_0x4a2a8b['y']['reverse']();return _0x4a2a8b;},GameManager[_0x296541(0x214)]['findFarthestPosition']=function(_0xf85c49,_0x2b07fd){var _0x763af=_0x296541,_0x28e3ca;do{_0x28e3ca=_0xf85c49,_0xf85c49={'x':_0x28e3ca['x']+_0x2b07fd['x'],'y':_0x28e3ca['y']+_0x2b07fd['y']};}while(this[_0x763af(0x1e4)][_0x763af(0x1d0)](_0xf85c49)&&this[_0x763af(0x1e4)]['cellAvailable'](_0xf85c49));return{'farthest':_0x28e3ca,'next':_0xf85c49};},GameManager[_0x296541(0x214)][_0x296541(0x1ff)]=function(){var _0x16b596=_0x296541;return this[_0x16b596(0x1e4)][_0x16b596(0x207)]()||this[_0x16b596(0x1f8)]();},GameManager['prototype']['tileMatchesAvailable']=function(){var _0x4d9fec=_0x296541,_0xb5f5a3=this,_0x46f73e;for(var _0xe590e=0x0;_0xe590e<this[_0x4d9fec(0x1dd)];_0xe590e++){for(var _0x26edf5=0x0;_0x26edf5<this[_0x4d9fec(0x1dd)];_0x26edf5++){_0x46f73e=this[_0x4d9fec(0x1e4)]['cellContent']({'x':_0xe590e,'y':_0x26edf5});if(_0x46f73e)for(var _0x234783=0x0;_0x234783<0x4;_0x234783++){var _0x288b8f=_0xb5f5a3[_0x4d9fec(0x1f6)](_0x234783),_0x2bb2e7={'x':_0xe590e+_0x288b8f['x'],'y':_0x26edf5+_0x288b8f['y']},_0x25bff2=_0xb5f5a3['grid'][_0x4d9fec(0x1d6)](_0x2bb2e7);if(_0x25bff2&&_0x25bff2['value']===_0x46f73e['value'])return!![];}}}return![];},GameManager[_0x296541(0x214)][_0x296541(0x1f0)]=function(_0x4a6672,_0x3c8d0e){return _0x4a6672['x']===_0x3c8d0e['x']&&_0x4a6672['y']===_0x3c8d0e['y'];};
