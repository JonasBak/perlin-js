/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../perlin.js":
/*!***************************************************!*\
  !*** /home/jonasbak/code/own/perlin-js/perlin.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst posDotVec = (pos, vec) =>\n  pos.map((p, i) => p * vec[i]).reduce((a, b) => a + b, 0);\n\nconst interpolate = (a0, a1, t) => {\n  const u = t * t * (3.0 - 2.0 * t);\n  return (1 - u) * a0 + u * a1;\n};\n\nconst length = v => Math.sqrt(v.map(a => a * a).reduce((a, b) => a + b, 0));\n\nconst diff = (p0, p1) => p0.map((p, i) => p - p1[i]);\n\nconst normalize = v => {\n  const k = 1 / length(v);\n  return v.map(a => a * k);\n};\n\nconst createVec = n => {\n  const vec = [];\n  while (vec.length < n) vec.push(2 * Math.random() - 1);\n  return n === 1 ? vec : normalize(vec);\n};\n\nconst generateGrid = dims => {\n  const grid = [];\n  const length = dims.reduce((a, b) => a * b, 1);\n  while (grid.length < length) {\n    grid.push(createVec(dims.length));\n  }\n  return grid;\n};\n\nconst pointToIndex = (grid, dims) => {\n  const wdims = dims.slice().reverse();\n  for (let i in wdims) wdims[i] = i > 0 ? wdims[i] * wdims[i - 1] : wdims[i];\n  return grid\n    .map((g, i) => (i > 0 ? g * wdims[i - 1] : g))\n    .reduce((a, b) => a + b, 0);\n};\n\nconst perlin = (dims, steps) => {\n  const grid = generateGrid(dims);\n  const noise = [];\n\n  const pos = dims.map(a => 0);\n  const dpos = 1 / steps;\n  while (pos[pos.length - 1] < dims[dims.length - 1] * steps) {\n    const posGlobal = pos.map(p => p / steps);\n\n    const c0 = posGlobal.map(p => Math.floor(p));\n    const c1 = c0.map(p => p + 1);\n\n    const offset = posGlobal.map((p, i) => p - c0[i]);\n\n    let weights = [];\n    const is = dims.map(() => 0);\n    while (weights.length < 2 ** dims.length) {\n      const point = is.map((a, i) => (a === 0 ? c0[i] : c1[i]));\n      const index = pointToIndex(point.map((p, i) => p % dims[i]), dims);\n      weights.push(posDotVec(diff(posGlobal, point), grid[index]));\n\n      is[0]++;\n      for (let i = 0; i < is.length - 1; i++) {\n        if (is[i] == 2 && i + 1 < is.length) {\n          is[i] = 0;\n          is[i + 1]++;\n        }\n      }\n    }\n    let n = 0;\n    while (n < dims.length) {\n      const newWeights = [];\n      for (let i = 0; i < weights.length; i += 2) {\n        newWeights.push(interpolate(weights[i], weights[i + 1], offset[n]));\n      }\n      n++;\n      weights = newWeights;\n    }\n\n    noise.push(weights[0]);\n\n    pos[0] += 1;\n    for (let i = 0; i < pos.length - 1; i++) {\n      if (pos[i] >= dims[i] * steps && i + 1 < pos.length) {\n        pos[i] = 0;\n        pos[i + 1]++;\n      }\n    }\n  }\n\n  return noise;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (perlin);\n\n\n//# sourceURL=webpack:////home/jonasbak/code/own/perlin-js/perlin.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _perlin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../perlin.js */ \"../../perlin.js\");\n\n\nconst demo1d = () => {\n  const c = document.querySelector(\"#canvas-1d\").getContext(\"2d\");\n\n  const width = 6;\n  const steps = 20;\n  const size = 5;\n  const noise = Object(_perlin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([width], steps);\n  c.moveTo(0, noise[0] * 100 + 100);\n  for (let i in noise) {\n    c.lineTo(i * size, noise[i] * 100 + 100);\n  }\n  c.stroke();\n};\n\ndemo1d();\n\nconst demo2d = () => {\n  const c = document.querySelector(\"#canvas-2d\").getContext(\"2d\");\n\n  const width = 3;\n  const height = 3;\n  const steps = 20;\n  const size = 10;\n  const noise = Object(_perlin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([width, height], steps);\n  for (let i in noise) {\n    const f = Math.floor((noise[i] + 1) / 2 * 255);\n    c.fillStyle = `rgba(${f}, ${f}, ${f}, 1)`;\n\n    c.fillRect(\n      (i % (width * steps)) * size,\n      Math.floor(i / (width * steps)) * size,\n      size,\n      size\n    );\n  }\n};\n\ndemo2d();\n\nconst demo3d = () => {\n  const c = document.querySelector(\"#canvas-3d\").getContext(\"2d\");\n\n  const width = 6;\n  const height = 6;\n  const depth = 5;\n  const steps = 10;\n  const size = 10;\n  const noise = Object(_perlin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([width, height, depth], steps);\n\n  let d = 0;\n  let diff = width * height * steps * steps;\n  setInterval(() => {\n    for (let i = 0; i < diff; i++) {\n      const f = Math.floor((noise[i + diff * d] + 1) / 2 * 255);\n      c.fillStyle = `rgba(${f}, ${f}, ${f}, 1)`;\n\n      c.fillRect(\n        (i % (width * steps)) * size,\n        Math.floor(i / (width * steps)) * size,\n        size,\n        size\n      );\n    }\n    d = (d + 1) % (depth * steps);\n  }, 50);\n};\n\ndemo3d();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });