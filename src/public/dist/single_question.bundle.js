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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/singleQuestion.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/singleQuestion.js":
/*!**********************************!*\
  !*** ./src/js/singleQuestion.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(window).on('load', function () {
    $('.loader').delay(1000).fadeOut('slow');
});

// User get a single question
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

var question_id = getParam('id');
function singleQuestion() {
    // fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id, {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + question_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("question").innerHTML = data.Question.question;
    });
}

// Display Answers
function loadAnswers() {
    // fetch("http://127.0.0.1:5000/api/v2/questions/"+question_id+"/answers",   {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + question_id + "/answers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var answers = document.getElementById("answers");
        var content = '\n                    ' + data.Answers.map(function (answer) {
            return '\n                    <div class="card" style="color: #80808F;">\n                        <span>\n                            ' + answer.answer + '\n                        </span>\n                        <div class="upvote">\n                            <a  id="upvotebutton" href="https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers/' + answer.id + '" class="upvote my-button">Upvote<i class="fas fa-thumbs-up"></i></a>\n                            <a id="downvotebutton" href="https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers/' + answer.id + '" class="downvote my-button">Downvote<i class="fas fa-thumbs-down"></i></a>\n                        </div>\n                        <h5 style="color:grey; font-size:15px; text-align:left;">Posted by: ' + answer.name + '</h5>\n                    </div>\n                    ';
        }).join("") + '\n                ';

        if (data.length == 0) {
            answers.innerHTML = answers.innerHTML + "<div>No answers posted</div>";
        } else {
            answers.innerHTML = answers.innerHTML + content;
        }
    });
}

document.getElementById("answers").addEventListener('click', upvotedownvote);

// Upvote/downvote an answer
function upvotedownvote(e) {
    var upvotebutton = document.getElementById('upvotebutton');
    var downvotebutton = document.getElementById('downvotebutton');

    e.preventDefault();
    var target = e.target;
    var url = target.getAttribute('href');

    if (target.classList.contains('upvote')) {
        console.log(url);
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "status": "upvote"
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setTimeout(function () {
                target.style.color = 'green';
                downvotebutton.style.color = 'blue';
            }, 1000);
        });
    } else if (target.classList.contains('downvote')) {
        console.log(url);
        // fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/downvote", {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "status": "downvote"
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setTimeout(function () {
                target.style.color = 'green';
                upvotebutton.style.color = 'blue';
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    singleQuestion();
    loadAnswers();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NpbmdsZVF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImRlbGF5IiwiZmFkZU91dCIsImdldFBhcmFtIiwicGFyYW0iLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImdldCIsInF1ZXN0aW9uX2lkIiwic2luZ2xlUXVlc3Rpb24iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJkYXRhIiwiUXVlc3Rpb24iLCJxdWVzdGlvbiIsImxvYWRBbnN3ZXJzIiwiYW5zd2VycyIsImNvbnRlbnQiLCJBbnN3ZXJzIiwibWFwIiwiYW5zd2VyIiwiaWQiLCJuYW1lIiwiam9pbiIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cHZvdGVkb3dudm90ZSIsImUiLCJ1cHZvdGVidXR0b24iLCJkb3dudm90ZWJ1dHRvbiIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidXJsIiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJjb2xvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3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SUFWTCxDQVVVLGdCQUFRO0FBQ1ZtQyx1QkFBVyxZQUFNO0FBQ2JWLHVCQUFPVyxLQUFQLENBQWFDLEtBQWIsR0FBcUIsT0FBckI7QUFDQWYsNkJBQWFjLEtBQWIsQ0FBbUJDLEtBQW5CLEdBQTJCLE1BQTNCO0FBQ0gsYUFIRCxFQUdHLElBSEg7QUFJSCxTQWZMO0FBZ0JIO0FBRUo7O0FBR0RsQyxTQUFTZ0IsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaER6QjtBQUNBZTtBQUNILENBSEQsRSIsImZpbGUiOiJzaW5nbGVfcXVlc3Rpb24uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvc2luZ2xlUXVlc3Rpb24uanNcIik7XG4iLCIkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmxvYWRlcicpLmRlbGF5KDEwMDApLmZhZGVPdXQoJ3Nsb3cnKVxufSlcblxuLy8gVXNlciBnZXQgYSBzaW5nbGUgcXVlc3Rpb25cbmZ1bmN0aW9uIGdldFBhcmFtKHBhcmFtKSB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCkuZ2V0KHBhcmFtKTtcbn1cblxudmFyIHF1ZXN0aW9uX2lkID0gZ2V0UGFyYW0oJ2lkJyk7XG5mdW5jdGlvbiBzaW5nbGVRdWVzdGlvbigpIHtcbiAgICAvLyBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvcXVlc3Rpb25zL1wiK3F1ZXN0aW9uX2lkLCB7XG4gICAgZmV0Y2goXCJodHRwczovL3N0YWNrb3ZlcmZsb3ctbGl0ZS12Mi5oZXJva3VhcHAuY29tL2FwaS92Mi9xdWVzdGlvbnMvXCIgKyBxdWVzdGlvbl9pZCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25cIikuaW5uZXJIVE1MID0gZGF0YS5RdWVzdGlvbi5xdWVzdGlvbjtcbiAgICAgICAgfSlcbn1cblxuLy8gRGlzcGxheSBBbnN3ZXJzXG5mdW5jdGlvbiBsb2FkQW5zd2VycygpIHtcbiAgICAvLyBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvcXVlc3Rpb25zL1wiK3F1ZXN0aW9uX2lkK1wiL2Fuc3dlcnNcIiwgICB7XG4gICAgZmV0Y2goXCJodHRwczovL3N0YWNrb3ZlcmZsb3ctbGl0ZS12Mi5oZXJva3VhcHAuY29tL2FwaS92Mi9xdWVzdGlvbnMvXCIgKyBxdWVzdGlvbl9pZCArIFwiL2Fuc3dlcnNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKVxuICAgICAgICB9XG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IGFuc3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcnNcIik7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IGBcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLkFuc3dlcnMubWFwKGFuc3dlciA9PiBgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgc3R5bGU9XCJjb2xvcjogIzgwODA4RjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7IGFuc3dlci5hbnN3ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXB2b3RlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgIGlkPVwidXB2b3RlYnV0dG9uXCIgaHJlZj1cImh0dHBzOi8vc3RhY2tvdmVyZmxvdy1saXRlLXYyLmhlcm9rdWFwcC5jb20vYXBpL3YyL2Fuc3dlcnMvJHthbnN3ZXIuaWR9XCIgY2xhc3M9XCJ1cHZvdGUgbXktYnV0dG9uXCI+VXB2b3RlPGkgY2xhc3M9XCJmYXMgZmEtdGh1bWJzLXVwXCI+PC9pPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBpZD1cImRvd252b3RlYnV0dG9uXCIgaHJlZj1cImh0dHBzOi8vc3RhY2tvdmVyZmxvdy1saXRlLXYyLmhlcm9rdWFwcC5jb20vYXBpL3YyL2Fuc3dlcnMvJHthbnN3ZXIuaWR9XCIgY2xhc3M9XCJkb3dudm90ZSBteS1idXR0b25cIj5Eb3dudm90ZTxpIGNsYXNzPVwiZmFzIGZhLXRodW1icy1kb3duXCI+PC9pPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg1IHN0eWxlPVwiY29sb3I6Z3JleTsgZm9udC1zaXplOjE1cHg7IHRleHQtYWxpZ246bGVmdDtcIj5Qb3N0ZWQgYnk6ICR7IGFuc3dlci5uYW1lfTwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgKS5qb2luKFwiXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5zd2Vycy5pbm5lckhUTUwgPSBhbnN3ZXJzLmlubmVySFRNTCArIFwiPGRpdj5ObyBhbnN3ZXJzIHBvc3RlZDwvZGl2PlwiXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuaW5uZXJIVE1MID0gYW5zd2Vycy5pbm5lckhUTUwgKyBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJzXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXB2b3RlZG93bnZvdGUpXG5cblxuLy8gVXB2b3RlL2Rvd252b3RlIGFuIGFuc3dlclxuZnVuY3Rpb24gdXB2b3RlZG93bnZvdGUoZSkge1xuICAgIGNvbnN0IHVwdm90ZWJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cHZvdGVidXR0b24nKTtcbiAgICBjb25zdCBkb3dudm90ZWJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3dudm90ZWJ1dHRvbicpO1xuXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc3QgdXJsID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Vwdm90ZScpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHVybCk7XG4gICAgICAgIGZldGNoKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJ1cHZvdGVcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgZG93bnZvdGVidXR0b24uc3R5bGUuY29sb3IgPSAnYmx1ZSc7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rvd252b3RlJykpIHtcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgICAgLy8gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YyL2Fuc3dlcnNcIithbnN3ZXJfaWQrXCIvZG93bnZvdGVcIiwge1xuICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiZG93bnZvdGVcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgdXB2b3RlYnV0dG9uLnN0eWxlLmNvbG9yID0gJ2JsdWUnO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBzaW5nbGVRdWVzdGlvbigpXG4gICAgbG9hZEFuc3dlcnMoKVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==