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
/******/ 	__webpack_require__.p = "assets/scripts";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SharePlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Model */ \"./src/UI/Model.js\");\n/* harmony import */ var _UI_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ \"./src/Utility/Location.js\");\n\r\n\r\n \r\nclass PlaceFinder {\r\n    constructor() {\r\n        const addressForm = document.querySelector('form');\r\n        const locateUserBtn = document.getElementById('locate-btn');\r\n        this.shareBtn =document.getElementById('share-btn');\r\n        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));\r\n        this.shareBtn.addEventListener('click',this.sharePlaceHandler);\r\n        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));\r\n    }\r\n\r\n    sharePlaceHandler(){\r\n        const sharedLinkInputElement = document.getElementById('share-link');\r\n        if(!navigator.clipboard){\r\n            sharedLinkInputElement.select();\r\n            return;\r\n        }\r\n        navigator.clipboard.writeText(sharedLinkInputElement.value)\r\n        .then(()=>{\r\n            alert(\"copied into clipboard!!!\");\r\n        }).catch(err => {\r\n            console.log(err);\r\n        })\r\n    }\r\n    selectPlace(coordinates,address) {\r\n        if (this.map) {\r\n            this.map.render(coordinates);\r\n        }\r\n        else {\r\n        this.map = new _UI_Map__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](coordinates);\r\n        }\r\n        fetch('http://nodjsmap.herokuapp.com/add-location',{\r\n            method: 'POST',\r\n            body: JSON.stringify({\r\n                address: address,\r\n                lat: coordinates.lat,\r\n                lng: coordinates.lng\r\n            }),\r\n            headers: {\r\n                'Content-type': 'application/json'\r\n            }\r\n        }).then(response=>{\r\n            return response.json()\r\n        }).then(data=>{\r\n            const logId = data.userId;\r\n            console.log(data);\r\n            this.shareBtn.disabled = false;\r\n        const sharedLinkInputElement = document.getElementById('share-link');\r\n        sharedLinkInputElement.value = `${location.origin}/dist/my-place/index.html?location=${logId}`;\r\n        })\r\n        \r\n    }\r\n    locateUserHandler() {\r\n        if (!navigator.geolocation) {\r\n            alert(\"your browser does not support the geolocation please use other browser or newer version\");\r\n            return;\r\n        }\r\n        const modal = new _UI_Model__WEBPACK_IMPORTED_MODULE_0__[\"Model\"]('loading-modal-content', 'Loading location - please wait');\r\n        modal.show();\r\n        navigator.geolocation.getCurrentPosition(\r\n            async position => {\r\n                const myPos = {\r\n                    lat: position.coords.latitude,\r\n                    lng: position.coords.longitude\r\n                };\r\n                console.log('successful!! ', position);\r\n                const address  = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getAddressFromCoords\"])(myPos);\r\n                modal.hide();\r\n                this.selectPlace(myPos,address);\r\n            },\r\n            error => {\r\n                modal.hide();\r\n                alert('Could not locate your location please enter address manully!!');\r\n            });\r\n    }\r\n\r\n    async findAddressHandler(event) {\r\n        event.preventDefault();\r\n        const address = event.target.querySelector('input').value;\r\n        if(!address || address.trim().length==0){\r\n            alert('invalid address enteres!!');\r\n            return;\r\n        }\r\n        const modal = new _UI_Model__WEBPACK_IMPORTED_MODULE_0__[\"Model\"]('loading-modal-content', 'Loading location - please wait');\r\n        modal.show();\r\n        try{\r\n        const coordinates = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getCoordsFromAddress\"])(address);\r\n        this.selectPlace(coordinates,address);\r\n        }\r\n        catch(err){\r\n            alert(err.message);\r\n        }\r\n        modal.hide();\r\n    }\r\n}\r\nconst findLocation = new PlaceFinder();\n\n//# sourceURL=webpack:///./src/SharePlace.js?");

/***/ }),

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\r\n    constructor(pos) {\r\n        const mapElement = document.getElementById('map');\r\n        // this.coordinates = pos;\r\n        this.render(pos);\r\n    }\r\n    render(coordinates) {\r\n        if (!google) {\r\n            alert(\"could not load maps\");\r\n            return;\r\n        }\r\n        const map = new google.maps.Map(document.getElementById('map'), {\r\n            center: coordinates,\r\n            zoom: 16\r\n        });\r\n        new google.maps.Marker({\r\n            position: coordinates,\r\n            map: map\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/UI/Map.js?");

/***/ }),

/***/ "./src/UI/Model.js":
/*!*************************!*\
  !*** ./src/UI/Model.js ***!
  \*************************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Model\", function() { return Model; });\nclass Model {\r\n constructor(contentId,fallbackText){\r\n     this.fallbackText = fallbackText;\r\n     this.contentTemplateEl = document.getElementById(contentId);\r\n     this.modalTemplateEl = document.getElementById('modal-template');\r\n }\r\n show(){\r\n     if('content' in document.createElement('template')){\r\n        const modalElements = document.importNode(this.modalTemplateEl.content,true);\r\n        this.backdropElement = modalElements.querySelector('.backdrop');\r\n        this.modalElement = modalElements.querySelector('.modal');\r\n        const contentElement = document.importNode(this.contentTemplateEl.content,true);\r\n        this.modalElement.append(contentElement);\r\n        document.body.insertAdjacentElement('afterbegin',this.modalElement);\r\n        document.body.insertAdjacentElement('afterbegin',this.backdropElement);\r\n\r\n    }\r\n     else{\r\n         alert(this.fallbackText);\r\n     }\r\n }\r\nhide(){\r\n    if(this.modalElement){\r\n        document.body.removeChild(this.modalElement);\r\n        document.body.removeChild(this.backdropElement);\r\n        this.modalElement = null;\r\n        this.backdropElement = null;\r\n    }\r\n}\r\n\r\n}\n\n//# sourceURL=webpack:///./src/UI/Model.js?");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/*! exports provided: getAddressFromCoords, getCoordsFromAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAddressFromCoords\", function() { return getAddressFromCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCoordsFromAddress\", function() { return getCoordsFromAddress; });\nasync function getAddressFromCoords(coords){\r\n    const response =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyCMlHCGx7EU4r5FuDYDZ4_KWGZuclMkdvo`)\r\n    if(!response.ok){\r\n        throw new Error('Failed to fetch address. ');\r\n    }\r\n    const data = await response.json();\r\n    if(data.error_message){\r\n        throw new Error(data.error_message);\r\n    }\r\n    const address = data.results[0].formatted_address;\r\n    return address;\r\n}\r\n\r\nasync function getCoordsFromAddress(address){\r\n    const urlAddress = encodeURI(address);\r\n    const response =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=AIzaSyCMlHCGx7EU4r5FuDYDZ4_KWGZuclMkdvo`)\r\n    if(!response.ok){\r\n        throw new Error('Failed to fetch coordinates. ');\r\n    }\r\n    const data = await response.json();\r\n    if(data.error_message){\r\n        throw new Error(data.error_message);\r\n    }\r\n    const coordinates = data.results[0].geometry.location;\r\n    return coordinates;\r\n}\n\n//# sourceURL=webpack:///./src/Utility/Location.js?");

/***/ })

/******/ });