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
            return '\n                    <div class="card" style="color: #80808F;">\n                        <span>\n                            ' + answer.answer + '\n                        </span>\n                        <div class="upvote">\n                            <a class="upvote my-button"><i class="fas fa-thumbs-up"></i></a>\n                            <a class="downvote my-button"><i class="fas fa-thumbs-down"></i></a>\n                        </div>\n                        <h5 style="color:grey; font-size:15px; text-align:right;">Posted by: ' + answer.name + '</h5>\n                    </div>\n                    ';
        }).join("") + '\n                ';

        if (data.length == 0) {
            answers.innerHTML = answers.innerHTML + "<div>No answers posted</div>";
        } else {
            answers.innerHTML = answers.innerHTML + content;
        }
    });
}

// Upvote an answer
function upvote(answer_id) {
    // fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/upvote", {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers" + answer_id + "/upvote", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var answer = data.Answer;
        var row = document.getElementById("answer_" + answer_id);

        var content = "<span>" + answer.answer_id + "</span><p>" + answer.answer + "</p><p>" + answer.date_posted + "</p><span>" + answer.status + "</span><button onclick='upvote(" + answer.answer_id + ")''>Upvote</button>";

        alert('Answer upvoted');
        window.location.href = "../dashboard";
        row.innerHTML = content;
    });
}

// Downvote an answer
function downvote(answer_id) {
    // fetch("http://127.0.0.1:5000/api/v2/answers"+answer_id+"/downvote", {
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/answers" + answer_id + "/downvote", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var answer = data.Answer;
        var row = document.getElementById("answer_" + answer_id);

        var content = "<span>" + answer.answer_id + "</span><p>" + answer.answer + "</p><p>" + answer.date_posted + "</p><span>" + answer.status + "</span><button onclick='downvote(" + answer.answer_id + ")''>Downvote</button>";

        alert("Answer downvoted");
        window.location.href = "../dashboard.html";
        row.innerHTML = content;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    singleQuestion();
    loadAnswers();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NpbmdsZVF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJvbiIsImRlbGF5IiwiZmFkZU91dCIsImdldFBhcmFtIiwicGFyYW0iLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImdldCIsInF1ZXN0aW9uX2lkIiwic2luZ2xlUXVlc3Rpb24iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJkYXRhIiwiUXVlc3Rpb24iLCJxdWVzdGlvbiIsImxvYWRBbnN3ZXJzIiwiYW5zd2VycyIsImNvbnRlbnQiLCJBbnN3ZXJzIiwibWFwIiwiYW5zd2VyIiwibmFtZSIsImpvaW4iLCJsZW5ndGgiLCJ1cHZvdGUiLCJhbnN3ZXJfaWQiLCJBbnN3ZXIiLCJyb3ciLCJkYXRlX3Bvc3RlZCIsInN0YXR1cyIsImFsZXJ0IiwiaHJlZiIsImRvd252b3RlIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztB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QkFBMUIsRUFBOEMsWUFBSTtBQUM5Q2pDO0FBQ0FlO0FBQ0gsQ0FIRCxFIiwiZmlsZSI6InNpbmdsZV9xdWVzdGlvbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9zaW5nbGVRdWVzdGlvbi5qc1wiKTtcbiIsIiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLmxvYWRlcicpLmRlbGF5KDEwMDApLmZhZGVPdXQoJ3Nsb3cnKVxufSlcblxuLy8gVXNlciBnZXQgYSBzaW5nbGUgcXVlc3Rpb25cbmZ1bmN0aW9uIGdldFBhcmFtKHBhcmFtKXtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQocGFyYW0pO1xuICB9XG5cbnZhciBxdWVzdGlvbl9pZCA9IGdldFBhcmFtKCdpZCcpO1xuZnVuY3Rpb24gc2luZ2xlUXVlc3Rpb24oKXtcbiAgICAvLyBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvcXVlc3Rpb25zL1wiK3F1ZXN0aW9uX2lkLCB7XG4gICAgZmV0Y2goXCJodHRwczovL3N0YWNrb3ZlcmZsb3ctbGl0ZS12Mi5oZXJva3VhcHAuY29tL2FwaS92Mi9xdWVzdGlvbnMvXCIrcXVlc3Rpb25faWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIisgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKVxuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25cIikuaW5uZXJIVE1MID0gZGF0YS5RdWVzdGlvbi5xdWVzdGlvbjtcbiAgICB9KVxufVxuXG4vLyBEaXNwbGF5IEFuc3dlcnNcbmZ1bmN0aW9uIGxvYWRBbnN3ZXJzKCl7XG4gICAgICAgICAgICAvLyBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvcXVlc3Rpb25zL1wiK3F1ZXN0aW9uX2lkK1wiL2Fuc3dlcnNcIiwgICB7XG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vc3RhY2tvdmVyZmxvdy1saXRlLXYyLmhlcm9rdWFwcC5jb20vYXBpL3YyL3F1ZXN0aW9ucy9cIitxdWVzdGlvbl9pZCtcIi9hbnN3ZXJzXCIsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFuc3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcnNcIik7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5BbnN3ZXJzLm1hcChhbnN3ZXIgPT4gYFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIHN0eWxlPVwiY29sb3I6ICM4MDgwOEY7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkeyBhbnN3ZXIuYW5zd2VyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1cHZvdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInVwdm90ZSBteS1idXR0b25cIj48aSBjbGFzcz1cImZhcyBmYS10aHVtYnMtdXBcIj48L2k+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZG93bnZvdGUgbXktYnV0dG9uXCI+PGkgY2xhc3M9XCJmYXMgZmEtdGh1bWJzLWRvd25cIj48L2k+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDUgc3R5bGU9XCJjb2xvcjpncmV5OyBmb250LXNpemU6MTVweDsgdGV4dC1hbGlnbjpyaWdodDtcIj5Qb3N0ZWQgYnk6ICR7IGFuc3dlci5uYW1lIH08L2g1PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYCkuam9pbihcIlwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzLmlubmVySFRNTCA9IGFuc3dlcnMuaW5uZXJIVE1MICsgXCI8ZGl2Pk5vIGFuc3dlcnMgcG9zdGVkPC9kaXY+XCJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5pbm5lckhUTUwgPSBhbnN3ZXJzLmlubmVySFRNTCArIGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG59XG5cblxuLy8gVXB2b3RlIGFuIGFuc3dlclxuZnVuY3Rpb24gdXB2b3RlKGFuc3dlcl9pZCl7XG4gICAgLy8gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjUwMDAvYXBpL3YyL2Fuc3dlcnNcIithbnN3ZXJfaWQrXCIvdXB2b3RlXCIsIHtcbiAgICBmZXRjaChcImh0dHBzOi8vc3RhY2tvdmVyZmxvdy1saXRlLXYyLmhlcm9rdWFwcC5jb20vYXBpL3YyL2Fuc3dlcnNcIithbnN3ZXJfaWQrXCIvdXB2b3RlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIilcbiAgICAgICAgfSxcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IGFuc3dlciA9IGRhdGEuQW5zd2VyO1xuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJfXCIrYW5zd2VyX2lkKTtcblxuICAgICAgICBsZXQgY29udGVudCA9IFwiPHNwYW4+XCIrYW5zd2VyLmFuc3dlcl9pZCtcIjwvc3Bhbj48cD5cIithbnN3ZXIuYW5zd2VyK1xuICAgICAgICBcIjwvcD48cD5cIithbnN3ZXIuZGF0ZV9wb3N0ZWQrXCI8L3A+PHNwYW4+XCIrYW5zd2VyLnN0YXR1cytcbiAgICAgICAgXCI8L3NwYW4+PGJ1dHRvbiBvbmNsaWNrPSd1cHZvdGUoXCIrYW5zd2VyLmFuc3dlcl9pZCtcIiknJz5VcHZvdGU8L2J1dHRvbj5cIjtcblxuICAgICAgICBhbGVydCgnQW5zd2VyIHVwdm90ZWQnKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi4vZGFzaGJvYXJkXCJcbiAgICAgICAgcm93LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgfSk7XG59XG5cbi8vIERvd252b3RlIGFuIGFuc3dlclxuZnVuY3Rpb24gZG93bnZvdGUoYW5zd2VyX2lkKXtcbiAgICAvLyBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvYW5zd2Vyc1wiK2Fuc3dlcl9pZCtcIi9kb3dudm90ZVwiLCB7XG4gICAgZmV0Y2goXCJodHRwczovL3N0YWNrb3ZlcmZsb3ctbGl0ZS12Mi5oZXJva3VhcHAuY29tL2FwaS92Mi9hbnN3ZXJzXCIrYW5zd2VyX2lkK1wiL2Rvd252b3RlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIilcbiAgICAgICAgfSxcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IGFuc3dlciA9IGRhdGEuQW5zd2VyO1xuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJfXCIrYW5zd2VyX2lkKTtcblxuICAgICAgICBsZXQgY29udGVudCA9IFwiPHNwYW4+XCIrYW5zd2VyLmFuc3dlcl9pZCtcIjwvc3Bhbj48cD5cIisgYW5zd2VyLmFuc3dlcitcbiAgICAgICAgXCI8L3A+PHA+XCIrYW5zd2VyLmRhdGVfcG9zdGVkK1wiPC9wPjxzcGFuPlwiK2Fuc3dlci5zdGF0dXMrXG4gICAgICAgIFwiPC9zcGFuPjxidXR0b24gb25jbGljaz0nZG93bnZvdGUoXCIrYW5zd2VyLmFuc3dlcl9pZCtcIiknJz5Eb3dudm90ZTwvYnV0dG9uPlwiO1xuXG4gICAgICAgIGFsZXJ0KFwiQW5zd2VyIGRvd252b3RlZFwiKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi4vZGFzaGJvYXJkLmh0bWxcIlxuICAgICAgICByb3cuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB9KTtcbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PntcbiAgICBzaW5nbGVRdWVzdGlvbigpXG4gICAgbG9hZEFuc3dlcnMoKVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==