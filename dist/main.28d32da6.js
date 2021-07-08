// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"47d2f6cdf74b09d286ed9f8837128288":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "28d32da6b0644edde774610f3b3929bc";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"aa97c85f9dce1163dc0f1b0575ce0e5f":[function(require,module,exports) {
"use strict";

var _makeItRain = _interopRequireDefault(require("./make-it-rain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./make-it-rain":"4916b5d7c73d9061f0eeb32f5ba63198"}],"4916b5d7c73d9061f0eeb32f5ba63198":[function(require,module,exports) {
function makeItRain(options) {
  console.log('All assets are loaded');
  var canvas = document.createElement('canvas');
  canvas.style = 'position:fixed; left:0; top:0; pointer-events:none';
  canvas.id = 'make-it-rain-canvas';
  canvas.width = document.body.clientWidth || window.innerWidth;
  canvas.height = document.body.clientHeight || window.innerHeight; // Set actual size in memory (scaled to account for extra pixel density).

  var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  // Normalize coordinate system to use css pixels.

  var cvwidth = canvas.width;
  var cvheight = canvas.height;
  document.body.appendChild(canvas);
  const noRainDivElements = document.getElementsByClassName('no-rain');
  let noRainDivs = [];
  const rainSpeed = (options.rainSpeed || 15) * scale;
  const dropLength = (options.dropLength || 20) * scale;
  const dropWidth = (options.dropWidth || 3) * scale;

  function isInViewport(rect) {
    return rect.bottom >= 0 && rect.left >= 0 && // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  const updateNoRainDivsPosition = () => {
    noRainDivs = [];

    for (let div of noRainDivElements) {
      const boundingRect = div.getBoundingClientRect();

      if (isInViewport(boundingRect)) {
        noRainDivs.push({
          left: boundingRect.left,
          right: boundingRect.right,
          top: boundingRect.top,
          bottom: boundingRect.bottom,
          width: boundingRect.width
        });
      }
    }
  };

  updateNoRainDivsPosition();
  window.addEventListener('scroll', updateNoRainDivsPosition);
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "rgba(255,255,255, 0.7)";

  const drawLine = (ctx, x, y, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const drawLineOpacity = (opacity, ctx, ...args) => {
    ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
    drawLine(ctx, ...args);
  };

  drawLine(ctx, 0, 0, 200, 200);
  var rain = [];
  const initialSeed = cvwidth / (scale * 100);

  const fillNewDrops = rain => {
    let r = Math.random() * initialSeed;

    for (let i = 0; i < r; i += 1) {
      rain.push([Math.random() * cvwidth, 0, Math.round(Math.random() * 10) / 10]);
    }
  };

  const checkNoRainDivs = rainDrop => {
    for (const div of noRainDivs) {
      if (rainDrop[0] >= div.left && rainDrop[0] <= div.right && rainDrop[1] >= div.top - dropLength) {
        return true;
      }
    }

    return false;
  };

  const rainSplashBacks = () => {
    for (const div of noRainDivs) {
      let j = Math.random() * 30;

      for (let i = 0; i < j; i += 1) {
        let top = div.top - Math.random() * 25;
        let left = div.left + div.width / 2 + (Math.random() - 0.5) * (div.width + Math.random() * 90);
        ctx.beginPath();
        ctx.arc(left, top, Math.random() * 3, 0, 2 * Math.PI, true);
        ctx.stroke();
      }
    }
  };

  const updateRain = rain => {
    for (let i = rain.length - 1; i > 0; i -= 1) {
      if (rain[i][1] >= cvheight || checkNoRainDivs(rain[i])) {
        const [left, top] = rain.splice(i, 1)[0];
        ctx.beginPath();
        ctx.arc(left + Math.random() * 10, top - Math.random() * 10, Math.random() * 3, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(left + Math.random() * 10, top - Math.random() * 10, Math.random() * 3, 0, 2 * Math.PI, true);
        ctx.stroke();
      } else {
        rain[i][1] += rainSpeed; // + Math.random() *3
      }
    } // rainSplashBacks()

  };

  const drawRain = rain => {
    for (const [x, y, z] of rain) {
      drawLineOpacity(z, ctx, x, y, x, y + dropLength);
    }
  };

  let h = 0;
  var animationNum = 0;

  function animate() {
    animationNum = requestAnimationFrame(animate); // clear canvas

    ctx.clearRect(0, 0, cvwidth, cvheight);
    fillNewDrops(rain);
    drawRain(rain);
    updateRain(rain);
  }

  animate(); // click handler to add random rects

  window.addEventListener('click', function () {
    this.cancelAnimationFrame(animationNum);
  });
}

window.addEventListener('load', makeItRain);
},{}]},{},["47d2f6cdf74b09d286ed9f8837128288","aa97c85f9dce1163dc0f1b0575ce0e5f"], null)

//# sourceMappingURL=main.28d32da6.js.map
