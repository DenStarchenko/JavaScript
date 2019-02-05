'use strict';

(function () {

    function validateRegexp(value, pattern, flags) {
        var reg = new RegExp(pattern, flags);

        return reg.test(value);
    }

     function validateNumber(value, min, max) {
        value = parseInt(value);

        if (isNaN(value)) {
            return false;
        }

        if (min && parseInt(min) > value) {
            return false;
        }

        if (max && parseInt(max) < value) {
            return false;
        }

        return true;
    }

    function validateValue(value, dataset) {

    	let checkvalid = dataset.validator;
    	if (checkvalid === 'number'){
    		return validateNumber(value, dataset.validatorMin, dataset.validatorMax);
    	} else if (checkvalid === 'letters'){
    		return validateRegexp(value, '^[a-zа-яё]+$', 'i');
    	} else if (checkvalid = 'regexp') {
    		return validateRegexp(value, dataset.validatorPattern);
    	} else {return true;}
    }

    function checkInput(input) {
        var value = input.value;
        if (input.dataset.hasOwnProperty('required') && !value) {
            return false;
        }

        if (input.dataset.validator && value){
        	return validateValue(value, input.dataset)
        }
        else {
        	return true;
        }
    }

    window.validateForm = function (options) {
        var form = document.getElementById(options.formId);
        var inputs = Array.from(
            document.querySelectorAll('#' + options.formId + ' input')
        );

        form.addEventListener('focus', function (event) {
            
            if (event.target.tagName === 'INPUT') {
                event.target.classList.remove(options.inputErrorClass);
            }
        }, true);

        form.addEventListener('blur', function (event) {
            var target = event.target;
            if (target.tagName === 'INPUT') {
                if (!checkInput(target)) {
                    target.classList.add(options.inputErrorClass);
                }
            }
        }, true);

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass);

            var hasError = false;
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];

                if (!checkInput(input)) {
                    input.classList.add(options.inputErrorClass);
                    hasError = true;
                }
            }

            if (hasError) {
                form.classList.add(options.formInvalidClass);
            } else {
                form.classList.add(options.formValidClass);
            }
        });
    };
}());
