'use strict';

(function () {

    //Проверка, введены ли цифры в названии товара (при помощи регулярного выражения)
    /**
    * @param {Number} value
    * @param {pattern} Regular
    * @param {flags}  regularFlag
    * @return param {reg.test(value)} boolean(true,false)
    */
    function validateRegexp(value, pattern, flags) {
        var reg = new RegExp(pattern, flags);

        return reg.test(value);
    }

    //проверка корректности введенного числа 
    /**
    * @param {value} Number
    * @param {min} Number [минимальное значения для скидки(data-validator-min(0))]
    */
    function validateNumber(value, min) {
        value = parseInt(value);

        if (isNaN(value)) {
            return false;
        }

        if (min && parseInt(min) > value) {
            return false;
        }

        return true;
    }

    //вызов функции валидации 2-ой уровень
    /**
    * @param {value} Number
    * @param {datasey} Object [объект хранящий атрибуты(dataset) тегов ]
    */
    function validateValue(value, dataset) {

    	let checkvalid = dataset.validator;
    	if (checkvalid === 'number'){
    		return validateNumber(value, dataset.validatorMin);
    	} else if (checkvalid === 'letters'){
    		return validateRegexp(value, '^[a-zа-яё]+$', 'i');
    	} else {return true;}
    }

    //вызов функции валидации 1-ый уровень
    /**
    * @param {input} Object [Объект тега input]
    *
    */
    function checkInput(input) {
        var value = input.value;
        if (!value) {
            return false;
        }

        if (input.dataset.validator && value){
        	return validateValue(value, input.dataset)
        }
        else {
        	return true;
        }
    }

    //функция для распределения скидки по всей таблице в колонке (Цена со скидкой)
    /**
    * @param {discount} Number [скидка]
    * @param {arrOld} array [массив исходных цен на товары]
    * @param {sum} Number [сумма всех товаров, для оценки пропорции каждого товара]
    * @param {maxValue} Number [Находим максимальную цену товара. В случае если скидка
    * распределится с остатком, этот остаток уходит в цену самого дорогого товара 
    * (остаток 1 руб иногда бывает). Для примера распределение при дефолтных значениях скидки
    * в 10 руб. Остаток будет 1 руб.]
    * @return param {newArr} array [массив с распределением скидки по позициям, пропорционально]
    */
    function reducePrice(discount,arrOld,sum,maxValue) { 
        discount = parseInt(discount);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        var indexMaxValue;

        var newArr = arrOld.map( (el,index) => {          
            if (el === maxValue){
                el = Math.ceil((el * discount)/sum); 
                indexMaxValue = index;
            }
            else {
                el = Math.floor((el * discount)/sum);
            }
            return el;
        });

        if (newArr.reduce(reducer) < discount){
            newArr[indexMaxValue] += discount - newArr.reduce(reducer);
        }
        return newArr;
    }


    //Главная функция при запуске валидации формы, отсюда все начинается.
    /**
    * @param {options} Object [Объект со всеми данными формы. При изменении значений в до-
    * кументе index.html, достаточно к ним добавить соответствующий класс данного объекта,
    * таким образом программа подстроится под все новые значения.]
    */
    window.validateForm = function (options) {

        //Сохранение табличных данных в переменные
        var form = document.getElementById(options.formId);
        var OldPrice = Array.from(
            document.querySelectorAll('.' + options.ClassOldPrice)
            );
        var NewPrice = Array.from(
            document.querySelectorAll('.' + options.ClassNewPrice)
            );
         var inputs = Array.from(
            document.querySelectorAll('#' + options.formId + ' input')
        );
         var ProductionName = Array.from(
            document.querySelectorAll('.' + options.ClassProductionName)
        );
          var submit_reduce = document.querySelector('.reduce');
          var submit_add = document.querySelector('.add');
          
        //Добавление событий на элемент form (focus,blur,click)
        //Для обработки focus и blur, события добавлены к форме
        //События click добавлены к каждой кнопке отдельно
        //При фокусе очищаются всплывающие надписи с error или success
        form.addEventListener('focus', function (event) {

            var classLi = form.classList;

            if (event.target.tagName === 'INPUT') {
                event.target.classList.remove(options.inputErrorClass);
                classLi.remove(options.formInvalidClassDiscount);
                classLi.remove(options.formInvalidClassPrice);
                classLi.remove(options.formValidClass);
                classLi.remove(options.formInvalidClass);
            }
        }, true);

        //При потери фокусе очищаются всплывающие надписи с error
        //Предварительно проходят проверку на введение корректности данных
         form.addEventListener('blur', function (event) {
            var target = event.target;
            if (target.tagName === 'INPUT') {
                if (!checkInput(target)) {
                    target.classList.add(options.inputErrorClass);
                    if (!checkInput(inputs[2])){
                        form.classList.add(options.formInvalidClassDiscount);
                    }
                }
            }
        }, true);


        //Обработка кнопки "Применить".
            submit_reduce.addEventListener('click', function(event) {
            event.preventDefault();
        //Очищение предыдущих надписей
            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass); 
            var sumOldPrice = 0;
            var arrOldPrice = [];
            var maxValueProduction = 0;

            //нахождение суммы всех товаров, а так же максимального значения цены товара.
            for ( let i = 0 ; i < OldPrice.length; i++){
                arrOldPrice[i] = OldPrice[i].innerHTML;
                sumOldPrice += Number(OldPrice[i].innerHTML);
                if (OldPrice[i].innerHTML > maxValueProduction){
                    maxValueProduction = OldPrice[i].innerHTML;
                }
            }

            var newArrDiscount = reducePrice(inputs[2].value,arrOldPrice,sumOldPrice,maxValueProduction);
            
        //Заполнение столбца "Цена со скидкой".
            for ( let i = 0 ; i < NewPrice.length; i++){
                NewPrice[i].textContent = OldPrice[i].innerHTML - newArrDiscount[i];
            }
        });

        //Обработка кнопки 'Добавить'.
            submit_add.addEventListener('click', function (event) {

            event.preventDefault();
        //очищение предыдущих надписей
            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass);

            var Product = inputs[0].value;
            var Price = inputs[1].value;
            //Заполнение массива значениями из столбца "Название продукта"
            var arrProduct = ProductionName.map( el => {
                return el.textContent;
            });
            //аналогичное заполнение с ценой 
            var arrPrice = NewPrice.map( el => {
                return el.textContent;
            });

            //Проверка корректности введенных данных, в полях "Продукты" и "Цена".
            //Добавление соответствующего класса к форме, который будет выводить сообщение
            if (!arrProduct.includes(Product)){
                 form.classList.add(options.formInvalidClass);
                 return ;
            } else if( !(arrPrice.includes(Price) && (arrProduct.indexOf(Product) === arrPrice.indexOf(Price))) ){
                 form.classList.add(options.formInvalidClassPrice);
                 return ;
            } else {
                form.classList.add(options.formValidClass)
                return ;
            }
        });
    };
}());
