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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/get_questions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/get_questions.js":
/*!*********************************!*\
  !*** ./src/js/get_questions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(window).on('load', function () {
    $('.loader').delay(1000).fadeOut('slow');
});

window.addEventListener('load', get_questions);

function show_question(data) {
    window.location.replace('http://127.0.0.1:42237/view.html');
    question = document.getElementById('question');
    question.innerHTML = data;
}

function get_questions() {
    fetch('https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions', {
        // fetch('http://127.0.0.1:5000/api/v2/questions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        } }).then(function (response) {
        return response.json();
    }).then(function (data) {
        var parentNode = document.getElementById('tab');
        var node = document.createElement('card');
        var new_data = data.Questions;

        var _loop = function _loop() {
            var div = document.createElement("div");

            // let span_id = document.createElement("span");
            // span_id.innerHTML = new_data[i]["id"];
            var qId = new_data[i]['id'];

            var span_question = document.createElement("span");
            span_question.innerHTML = '<a href="view.html?id=' + qId + '" id="question_body' + qId + '">' + new_data[i]["question"] + '</a>';

            var p_date = document.createElement("p");
            p_date.innerHTML = new_data[i]["date_posted"];

            var p_actions = document.createElement("p");

            var button_edit = document.createElement("button");
            button_edit.innerHTML = "Edit";
            var questionIdAttribute = document.createAttribute('data-id');
            questionIdAttribute.value = qId;

            button_edit.setAttributeNode(questionIdAttribute);
            button_edit.classList.add("btn");

            p_actions.appendChild(button_edit);

            var button_delete = document.createElement("button");
            button_delete.innerHTML = "Delete";
            var a = document.createAttribute("data-id");
            a.value = qId;

            button_delete.setAttributeNode(a);
            button_delete.classList.add("btn");

            p_actions.appendChild(button_delete);

            // div.appendChild(span_id);
            div.appendChild(span_question);
            div.appendChild(p_date);
            div.appendChild(p_actions);

            button_edit.addEventListener("click", function () {
                modifyQuestion(button_edit);
            });

            button_delete.addEventListener("click", function () {
                deleteQuestion(new_data[i]['id']);
            });

            parentNode.appendChild(div);
        };

        for (var i in new_data) {
            _loop();
        }
    });
}

// User can modify a question
function modifyQuestion(card) {
    var qId = card.getAttribute('data-id');
    var questionBody = document.getElementById('question_body' + qId);
    console.warn(questionBody.innerHTML);
    console.warn(qId);
    fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + id, {
        // fetch("http://127.0.0.1:5000/api/v2/questions/"+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(toJSON(card))
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.message === "Question not available") {
            alert("That question is available to be edited");
        } else {
            alert("Question has been updated!");
        }
        windows.location.href = "../dashboard.html";
    });
    return false;
}

function toJSON(card) {
    var cardData = new cardData(card);
    var object = {};

    cardData.forEach(function (value, key) {
        object[key] = value;
    });

    return object;
}

// User delete a question
function deleteQuestion(id) {
    if (confirm("Do you want to delete this question?")) {
        fetch("https://stackoverflow-lite-v2.herokuapp.com/api/v2/questions/" + id, {
            // fetch("http://127.0.0.1:5000/api/v2/questions/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            alert("Question has been deleted!");
            window.location.reload();
        });
    }
    return false;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldF9xdWVzdGlvbnMuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIm9uIiwiZGVsYXkiLCJmYWRlT3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldF9xdWVzdGlvbnMiLCJzaG93X3F1ZXN0aW9uIiwiZGF0YSIsImxvY2F0aW9uIiwicmVwbGFjZSIsInF1ZXN0aW9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwibmV3X2RhdGEiLCJRdWVzdGlvbnMiLCJkaXYiLCJxSWQiLCJpIiwic3Bhbl9xdWVzdGlvbiIsInBfZGF0ZSIsInBfYWN0aW9ucyIsImJ1dHRvbl9lZGl0IiwicXVlc3Rpb25JZEF0dHJpYnV0ZSIsImNyZWF0ZUF0dHJpYnV0ZSIsInZhbHVlIiwic2V0QXR0cmlidXRlTm9kZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiYnV0dG9uX2RlbGV0ZSIsImEiLCJtb2RpZnlRdWVzdGlvbiIsImRlbGV0ZVF1ZXN0aW9uIiwiY2FyZCIsImdldEF0dHJpYnV0ZSIsInF1ZXN0aW9uQm9keSIsImNvbnNvbGUiLCJ3YXJuIiwiaWQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRvSlNPTiIsIm1lc3NhZ2UiLCJhbGVydCIsIndpbmRvd3MiLCJocmVmIiwiY2FyZERhdGEiLCJvYmplY3QiLCJmb3JFYWNoIiwia2V5IiwiY29uZmlybSIsInJlbG9hZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVU7QUFDM0JGLE1BQUUsU0FBRixFQUFhRyxLQUFiLENBQW1CLElBQW5CLEVBQXlCQyxPQUF6QixDQUFpQyxNQUFqQztBQUNILENBRkQ7O0FBSUFILE9BQU9JLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDQyxhQUFoQzs7QUFFQSxTQUFTQyxhQUFULENBQXVCQyxJQUF2QixFQUE0QjtBQUN4QlAsV0FBT1EsUUFBUCxDQUFnQkMsT0FBaEIsQ0FBd0Isa0NBQXhCO0FBQ0FDLGVBQVdDLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBWDtBQUNBRixhQUFTRyxTQUFULEdBQXFCTixJQUFyQjtBQUVIOztBQUVELFNBQVNGLGFBQVQsR0FBeUI7QUFDckJTLFVBQU0sOERBQU4sRUFBcUU7QUFDckU7QUFDSUMsZ0JBQVEsS0FGeUQ7QUFHakVDLGlCQUFTO0FBQ0wsNEJBQWdCLGtCQURYO0FBRUwsNkJBQWlCLFlBQVlDLGFBQWFDLE9BQWIsQ0FBcUIsT0FBckI7QUFGeEIsU0FId0QsRUFBckUsRUFPQ0MsSUFQRCxDQU9NO0FBQUEsZUFBYUMsU0FBU0MsSUFBVCxFQUFiO0FBQUEsS0FQTixFQVFDRixJQVJELENBUU0sZ0JBQVE7QUFDVixZQUFJRyxhQUFhWCxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQWpCO0FBQ0EsWUFBSVcsT0FBT1osU0FBU2EsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsWUFBSUMsV0FBV2xCLEtBQUttQixTQUFwQjs7QUFIVTtBQUtOLGdCQUFJQyxNQUFNaEIsU0FBU2EsYUFBVCxDQUF1QixLQUF2QixDQUFWOztBQUVBO0FBQ0E7QUFDQSxnQkFBSUksTUFBTUgsU0FBU0ksQ0FBVCxFQUFZLElBQVosQ0FBVjs7QUFFQSxnQkFBSUMsZ0JBQWdCbkIsU0FBU2EsYUFBVCxDQUF1QixNQUF2QixDQUFwQjtBQUNBTSwwQkFBY2pCLFNBQWQsOEJBQW1EZSxHQUFuRCwyQkFBNEVBLEdBQTVFLFVBQW9GSCxTQUFTSSxDQUFULEVBQVksVUFBWixDQUFwRjs7QUFFQSxnQkFBSUUsU0FBU3BCLFNBQVNhLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBTyxtQkFBT2xCLFNBQVAsR0FBbUJZLFNBQVNJLENBQVQsRUFBWSxhQUFaLENBQW5COztBQUVBLGdCQUFJRyxZQUFZckIsU0FBU2EsYUFBVCxDQUF1QixHQUF2QixDQUFoQjs7QUFFQSxnQkFBSVMsY0FBY3RCLFNBQVNhLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7QUFDQVMsd0JBQVlwQixTQUFaLEdBQXdCLE1BQXhCO0FBQ0EsZ0JBQUlxQixzQkFBc0J2QixTQUFTd0IsZUFBVCxDQUF5QixTQUF6QixDQUExQjtBQUNBRCxnQ0FBb0JFLEtBQXBCLEdBQTRCUixHQUE1Qjs7QUFFQUssd0JBQVlJLGdCQUFaLENBQTZCSCxtQkFBN0I7QUFDQUQsd0JBQVlLLFNBQVosQ0FBc0JDLEdBQXRCLENBQTBCLEtBQTFCOztBQUVBUCxzQkFBVVEsV0FBVixDQUFzQlAsV0FBdEI7O0FBRUEsZ0JBQUlRLGdCQUFnQjlCLFNBQVNhLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQWlCLDBCQUFjNUIsU0FBZCxHQUEwQixRQUExQjtBQUNBLGdCQUFJNkIsSUFBSS9CLFNBQVN3QixlQUFULENBQXlCLFNBQXpCLENBQVI7QUFDQU8sY0FBRU4sS0FBRixHQUFVUixHQUFWOztBQUVBYSwwQkFBY0osZ0JBQWQsQ0FBK0JLLENBQS9CO0FBQ0FELDBCQUFjSCxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixLQUE1Qjs7QUFHQVAsc0JBQVVRLFdBQVYsQ0FBc0JDLGFBQXRCOztBQUVBO0FBQ0FkLGdCQUFJYSxXQUFKLENBQWdCVixhQUFoQjtBQUNBSCxnQkFBSWEsV0FBSixDQUFnQlQsTUFBaEI7QUFDQUosZ0JBQUlhLFdBQUosQ0FBZ0JSLFNBQWhCOztBQUVBQyx3QkFBWTdCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQVU7QUFDNUN1QywrQkFBZVYsV0FBZjtBQUNILGFBRkQ7O0FBSUFRLDBCQUFjckMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBVTtBQUM5Q3dDLCtCQUFlbkIsU0FBU0ksQ0FBVCxFQUFZLElBQVosQ0FBZjtBQUNILGFBRkQ7O0FBSUFQLHVCQUFXa0IsV0FBWCxDQUF1QmIsR0FBdkI7QUFyRE07O0FBSVYsYUFBSSxJQUFJRSxDQUFSLElBQWFKLFFBQWIsRUFBc0I7QUFBQTtBQWtEekI7QUFDSixLQS9ERztBQWdFSDs7QUFFRDtBQUNBLFNBQVNrQixjQUFULENBQXdCRSxJQUF4QixFQUE2QjtBQUN6QixRQUFJakIsTUFBTWlCLEtBQUtDLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBVjtBQUNBLFFBQUlDLGVBQWVwQyxTQUFTQyxjQUFULENBQXdCLGtCQUFnQmdCLEdBQXhDLENBQW5CO0FBQ0FvQixZQUFRQyxJQUFSLENBQWFGLGFBQWFsQyxTQUExQjtBQUNBbUMsWUFBUUMsSUFBUixDQUFhckIsR0FBYjtBQUNBZCxVQUFNLGtFQUFnRW9DLEVBQXRFLEVBQTBFO0FBQzFFO0FBQ0luQyxnQkFBUSxLQUY4RDtBQUd0RUMsaUJBQVM7QUFDTCw0QkFBZ0Isa0JBRFg7QUFFTCw2QkFBaUIsWUFBV0MsYUFBYUMsT0FBYixDQUFxQixPQUFyQjtBQUZ2QixTQUg2RDtBQU90RWlDLGNBQU1DLEtBQUtDLFNBQUwsQ0FBZUMsT0FBT1QsSUFBUCxDQUFmO0FBUGdFLEtBQTFFLEVBU0MxQixJQVRELENBU007QUFBQSxlQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxLQVROLEVBVUNGLElBVkQsQ0FVTSxnQkFBUTtBQUNWLFlBQUdaLEtBQUtnRCxPQUFMLEtBQWlCLHdCQUFwQixFQUE2QztBQUN6Q0Msa0JBQU0seUNBQU47QUFDSCxTQUZELE1BRUs7QUFDREEsa0JBQU0sNEJBQU47QUFDSDtBQUNHQyxnQkFBUWpELFFBQVIsQ0FBaUJrRCxJQUFqQixHQUF3QixtQkFBeEI7QUFDUCxLQWpCRDtBQWtCQSxXQUFPLEtBQVA7QUFDSDs7QUFFRCxTQUFTSixNQUFULENBQWdCVCxJQUFoQixFQUFzQjtBQUNsQixRQUFJYyxXQUFXLElBQUlBLFFBQUosQ0FBYWQsSUFBYixDQUFmO0FBQ0EsUUFBSWUsU0FBUyxFQUFiOztBQUVBRCxhQUFTRSxPQUFULENBQWlCLFVBQVV6QixLQUFWLEVBQWlCMEIsR0FBakIsRUFBdUI7QUFDcENGLGVBQU9FLEdBQVAsSUFBYzFCLEtBQWQ7QUFDSCxLQUZEOztBQUlBLFdBQU93QixNQUFQO0FBQ0g7O0FBSUQ7QUFDQSxTQUFTaEIsY0FBVCxDQUF3Qk0sRUFBeEIsRUFBMkI7QUFDdkIsUUFBR2EsUUFBUSxzQ0FBUixDQUFILEVBQW1EO0FBQy9DakQsY0FBTSxrRUFBZ0VvQyxFQUF0RSxFQUEwRTtBQUMxRTtBQUNJbkMsb0JBQVEsUUFGOEQ7QUFHdEVDLHFCQUFTO0FBQ0wsZ0NBQWdCLGtCQURYO0FBRUwsaUNBQWlCLFlBQVlDLGFBQWFDLE9BQWIsQ0FBcUIsT0FBckI7QUFGeEI7QUFINkQsU0FBMUUsRUFRQ0MsSUFSRCxDQVFNO0FBQUEsbUJBQVlDLFNBQVNDLElBQVQsRUFBWjtBQUFBLFNBUk4sRUFTQ0YsSUFURCxDQVNNLGdCQUFRO0FBQ1ZxQyxrQkFBTSw0QkFBTjtBQUNBeEQsbUJBQU9RLFFBQVAsQ0FBZ0J3RCxNQUFoQjtBQUNILFNBWkQ7QUFhSDtBQUNELFdBQU8sS0FBUDtBQUNILEMiLCJmaWxlIjoiZ2V0X3F1ZXN0aW9ucy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9nZXRfcXVlc3Rpb25zLmpzXCIpO1xuIiwiJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKXtcbiAgICAkKCcubG9hZGVyJykuZGVsYXkoMTAwMCkuZmFkZU91dCgnc2xvdycpXG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRfcXVlc3Rpb25zKTtcblxuZnVuY3Rpb24gc2hvd19xdWVzdGlvbihkYXRhKXtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnaHR0cDovLzEyNy4wLjAuMTo0MjIzNy92aWV3Lmh0bWwnKTtcbiAgICBxdWVzdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVzdGlvbicpO1xuICAgIHF1ZXN0aW9uLmlubmVySFRNTCA9IGRhdGE7XG5cbn1cblxuZnVuY3Rpb24gZ2V0X3F1ZXN0aW9ucygpIHtcbiAgICBmZXRjaCgnaHR0cHM6Ly9zdGFja292ZXJmbG93LWxpdGUtdjIuaGVyb2t1YXBwLmNvbS9hcGkvdjIvcXVlc3Rpb25zJyx7XG4gICAgLy8gZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMC9hcGkvdjIvcXVlc3Rpb25zJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgICAgICB9fSlcbiAgICAudGhlbihyZXNwb25zZSA9PiAgcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWInKTtcbiAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYXJkJyk7XG4gICAgICAgIGxldCBuZXdfZGF0YSA9IGRhdGEuUXVlc3Rpb25zO1xuICAgICAgICBmb3IodmFyIGkgaW4gbmV3X2RhdGEpe1xuICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgIC8vIGxldCBzcGFuX2lkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICAvLyBzcGFuX2lkLmlubmVySFRNTCA9IG5ld19kYXRhW2ldW1wiaWRcIl07XG4gICAgICAgICAgICBsZXQgcUlkID0gbmV3X2RhdGFbaV1bJ2lkJ107XG5cbiAgICAgICAgICAgIGxldCBzcGFuX3F1ZXN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBzcGFuX3F1ZXN0aW9uLmlubmVySFRNTCA9IGA8YSBocmVmPVwidmlldy5odG1sP2lkPSR7cUlkfVwiIGlkPVwicXVlc3Rpb25fYm9keSR7cUlkfVwiPiR7bmV3X2RhdGFbaV1bXCJxdWVzdGlvblwiXX08L2E+YDtcblxuICAgICAgICAgICAgbGV0IHBfZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgcF9kYXRlLmlubmVySFRNTCA9IG5ld19kYXRhW2ldW1wiZGF0ZV9wb3N0ZWRcIl07XG5cbiAgICAgICAgICAgIGxldCBwX2FjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICAgICAgbGV0IGJ1dHRvbl9lZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbl9lZGl0LmlubmVySFRNTCA9IFwiRWRpdFwiOyBcbiAgICAgICAgICAgIGxldCBxdWVzdGlvbklkQXR0cmlidXRlID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgICAgICAgICBxdWVzdGlvbklkQXR0cmlidXRlLnZhbHVlID0gcUlkO1xuXG4gICAgICAgICAgICBidXR0b25fZWRpdC5zZXRBdHRyaWJ1dGVOb2RlKHF1ZXN0aW9uSWRBdHRyaWJ1dGUpXG4gICAgICAgICAgICBidXR0b25fZWRpdC5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpXG5cbiAgICAgICAgICAgIHBfYWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25fZWRpdCk7XG5cbiAgICAgICAgICAgIGxldCBidXR0b25fZGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbl9kZWxldGUuaW5uZXJIVE1MID0gXCJEZWxldGVcIjtcbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgICAgIGEudmFsdWUgPSBxSWQ7XG5cbiAgICAgICAgICAgIGJ1dHRvbl9kZWxldGUuc2V0QXR0cmlidXRlTm9kZShhKTtcbiAgICAgICAgICAgIGJ1dHRvbl9kZWxldGUuY2xhc3NMaXN0LmFkZChcImJ0blwiKVxuXG5cbiAgICAgICAgICAgIHBfYWN0aW9ucy5hcHBlbmRDaGlsZChidXR0b25fZGVsZXRlKTtcblxuICAgICAgICAgICAgLy8gZGl2LmFwcGVuZENoaWxkKHNwYW5faWQpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW5fcXVlc3Rpb24pO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHBfZGF0ZSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocF9hY3Rpb25zKTtcblxuICAgICAgICAgICAgYnV0dG9uX2VkaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbW9kaWZ5UXVlc3Rpb24oYnV0dG9uX2VkaXQpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnV0dG9uX2RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBkZWxldGVRdWVzdGlvbihuZXdfZGF0YVtpXVsnaWQnXSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufSk7XG59XG5cbi8vIFVzZXIgY2FuIG1vZGlmeSBhIHF1ZXN0aW9uXG5mdW5jdGlvbiBtb2RpZnlRdWVzdGlvbihjYXJkKXtcbiAgICBsZXQgcUlkID0gY2FyZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICBsZXQgcXVlc3Rpb25Cb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXN0aW9uX2JvZHknK3FJZClcbiAgICBjb25zb2xlLndhcm4ocXVlc3Rpb25Cb2R5LmlubmVySFRNTClcbiAgICBjb25zb2xlLndhcm4ocUlkKTtcbiAgICBmZXRjaChcImh0dHBzOi8vc3RhY2tvdmVyZmxvdy1saXRlLXYyLmhlcm9rdWFwcC5jb20vYXBpL3YyL3F1ZXN0aW9ucy9cIitpZCwge1xuICAgIC8vIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2FwaS92Mi9xdWVzdGlvbnMvXCIraWQsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIkJlYXJlciBcIisgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodG9KU09OKGNhcmQpKVxuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZihkYXRhLm1lc3NhZ2UgPT09IFwiUXVlc3Rpb24gbm90IGF2YWlsYWJsZVwiKXtcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhhdCBxdWVzdGlvbiBpcyBhdmFpbGFibGUgdG8gYmUgZWRpdGVkXCIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYWxlcnQoXCJRdWVzdGlvbiBoYXMgYmVlbiB1cGRhdGVkIVwiKVxuICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3dzLmxvY2F0aW9uLmhyZWYgPSBcIi4uL2Rhc2hib2FyZC5odG1sXCJcbiAgICB9KVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdG9KU09OKGNhcmQpIHtcbiAgICBsZXQgY2FyZERhdGEgPSBuZXcgY2FyZERhdGEoY2FyZCk7XG4gICAgbGV0IG9iamVjdCA9IHt9O1xuXG4gICAgY2FyZERhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkgIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vLyBVc2VyIGRlbGV0ZSBhIHF1ZXN0aW9uXG5mdW5jdGlvbiBkZWxldGVRdWVzdGlvbihpZCl7XG4gICAgaWYoY29uZmlybShcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHF1ZXN0aW9uP1wiKSl7XG4gICAgICAgIGZldGNoKFwiaHR0cHM6Ly9zdGFja292ZXJmbG93LWxpdGUtdjIuaGVyb2t1YXBwLmNvbS9hcGkvdjIvcXVlc3Rpb25zL1wiK2lkLCB7XG4gICAgICAgIC8vIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2FwaS92Mi9xdWVzdGlvbnMvXCIraWQsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJRdWVzdGlvbiBoYXMgYmVlbiBkZWxldGVkIVwiKVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==