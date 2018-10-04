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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/displayquestions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/displayquestions.js":
/*!************************************!*\
  !*** ./src/js/displayquestions.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(window).on('load', function () {
    $('.loader').delay(1000).fadeOut('slow');
});

window.addEventListener('load', display_questions);
function display_questions() {
    fetch('https://stackoverflow-lite-v2.herokuapp.com/api/v2/users/questions', {
        // fetch('http://127.0.0.1:5000/api/v2/users/questions',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var parentNode = document.getElementById('tab');
        var node = document.createElement('table');
        var new_data = data.Questions;
        // console.log(new_data)
        for (var i in new_data) {
            console.log(new_data[i]["id"]);
            // node.innerHTML = `
            var my_node = '\n            <div class="card">\n                <span><a href="view.html?id=' + new_data[i]['id'] + '">' + new_data[i]["question"] + '</a></span>\n                <h5 style="color:grey; font-size:10px">' + new_data[i]["date_posted"] + '</h5>\n                <p style="text-align:right; font-size:10px">Posted By: ' + new_data[i]["name"] + '</p>\n            </div>';
            // node.classList.add("item");
            parentNode.insertAdjacentHTML('afterbegin', my_node);
            // parentNode.appendChild(node)
            // console.log(parentNode)
        };
    });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Rpc3BsYXlxdWVzdGlvbnMuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwiZGVsYXkiLCJmYWRlT3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BsYXlfcXVlc3Rpb25zIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcmVudE5vZGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJuZXdfZGF0YSIsImRhdGEiLCJRdWVzdGlvbnMiLCJpIiwiY29uc29sZSIsImxvZyIsIm15X25vZGUiLCJpbnNlcnRBZGphY2VudEhUTUwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQUEsRUFBRUMsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFVO0FBQzNCRixNQUFFLFNBQUYsRUFBYUcsS0FBYixDQUFtQixJQUFuQixFQUF5QkMsT0FBekIsQ0FBaUMsTUFBakM7QUFDSCxDQUZEOztBQUlBSCxPQUFPSSxnQkFBUCxDQUF3QixNQUF4QixFQUFnQ0MsaUJBQWhDO0FBQ0EsU0FBU0EsaUJBQVQsR0FBNkI7QUFDekJDLFVBQU0sb0VBQU4sRUFBNEU7QUFDNUU7QUFDSUMsZ0JBQVEsS0FGZ0U7QUFHeEVDLGlCQUFTO0FBQ0wsNEJBQWdCO0FBRFgsU0FIK0QsRUFBNUUsRUFNQ0MsSUFORCxDQU1NO0FBQUEsZUFBYUMsU0FBU0MsSUFBVCxFQUFiO0FBQUEsS0FOTixFQU9DRixJQVBELENBT00sZ0JBQVE7QUFDVixZQUFJRyxhQUFhQyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQWpCO0FBQ0EsWUFBSUMsT0FBT0YsU0FBU0csYUFBVCxDQUF1QixPQUF2QixDQUFYO0FBQ0EsWUFBSUMsV0FBV0MsS0FBS0MsU0FBcEI7QUFDQTtBQUNBLGFBQUksSUFBSUMsQ0FBUixJQUFhSCxRQUFiLEVBQXNCO0FBQ2xCSSxvQkFBUUMsR0FBUixDQUFZTCxTQUFTRyxDQUFULEVBQVksSUFBWixDQUFaO0FBQ0E7QUFDQSxnQkFBSUcsNkZBRThCTixTQUFTRyxDQUFULEVBQVksSUFBWixDQUY5QixVQUVvREgsU0FBU0csQ0FBVCxFQUFZLFVBQVosQ0FGcEQsNEVBR3lDSCxTQUFTRyxDQUFULEVBQVksYUFBWixDQUh6QyxzRkFJeURILFNBQVNHLENBQVQsRUFBWSxNQUFaLENBSnpELDZCQUFKO0FBTUE7QUFDQVIsdUJBQVdZLGtCQUFYLENBQThCLFlBQTlCLEVBQTRDRCxPQUE1QztBQUNBO0FBQ0E7QUFDSDtBQUVKLEtBM0JEO0FBNEJILEMiLCJmaWxlIjoiZGlzcGxheV9xdWVzdGlvbnMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvZGlzcGxheXF1ZXN0aW9ucy5qc1wiKTtcbiIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLmxvYWRlcicpLmRlbGF5KDEwMDApLmZhZGVPdXQoJ3Nsb3cnKVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBkaXNwbGF5X3F1ZXN0aW9ucyk7XG5mdW5jdGlvbiBkaXNwbGF5X3F1ZXN0aW9ucygpIHtcbiAgICBmZXRjaCgnaHR0cHM6Ly9zdGFja292ZXJmbG93LWxpdGUtdjIuaGVyb2t1YXBwLmNvbS9hcGkvdjIvdXNlcnMvcXVlc3Rpb25zJywge1xuICAgIC8vIGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YyL3VzZXJzL3F1ZXN0aW9ucycse1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9fSlcbiAgICAudGhlbihyZXNwb25zZSA9PiAgcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWInKTtcbiAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICBsZXQgbmV3X2RhdGEgPSBkYXRhLlF1ZXN0aW9ucztcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3X2RhdGEpXG4gICAgICAgIGZvcih2YXIgaSBpbiBuZXdfZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdfZGF0YVtpXVtcImlkXCJdKTtcbiAgICAgICAgICAgIC8vIG5vZGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgdmFyIG15X25vZGUgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxhIGhyZWY9XCJ2aWV3Lmh0bWw/aWQ9JHtuZXdfZGF0YVtpXVsnaWQnXX1cIj4ke25ld19kYXRhW2ldW1wicXVlc3Rpb25cIl19PC9hPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDUgc3R5bGU9XCJjb2xvcjpncmV5OyBmb250LXNpemU6MTBweFwiPiR7bmV3X2RhdGFbaV1bXCJkYXRlX3Bvc3RlZFwiXX08L2g1PlxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPVwidGV4dC1hbGlnbjpyaWdodDsgZm9udC1zaXplOjEwcHhcIj5Qb3N0ZWQgQnk6ICR7bmV3X2RhdGFbaV1bXCJuYW1lXCJdfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAvLyBub2RlLmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIpO1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBteV9ub2RlKTtcbiAgICAgICAgICAgIC8vIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudE5vZGUpXG4gICAgICAgIH07XG5cbiAgICB9KTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==