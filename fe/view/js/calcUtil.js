angular.module('appModule')
    .factory("calcUtil", function () {

        function isNullOrEmpty(val) {
            return val == null || val === "" || (val instanceof Array && val.length <= 0);
        }

        /**
         * 判断是否为数字,允许以0开头
         * @param num
         * @returns {boolean}
         */
        function isNum(num) {
            return /^(-?\d+)(\.\d+)?$/.test(num);
        }

        /**
         * 两个数字相加
         * @param arg1
         * @param arg2
         * @returns {number}
         */
        function add(arg1, arg2) {
            if (!isNum(arg1) || !isNum(arg2)) {
                return 0;
            }

            var r1 = new BigDecimal(arg1 + "");
            var r2 = new BigDecimal(arg2 + "");
            return Number(r1.add(r2).toString());
        }

        //
        /**
         * 对传入的参数求合计,计算结果按照默认的精度进行四舍五入
         * @returns {null} or {Number}
         */
        function sum() {
            var result = 0;
            var allNull = true;
            for (var i = 0; i < arguments.length; i++) {
                if (isNum(arguments[i])) {
                    allNull = false;
                    result = add(arguments[i], result);
                }
            }
            return allNull ? null : Number(roundUp(result, 2));
        }

        /**
         * 对传入的数组的指定列求合计 array:要求和的数组 properties:要求和的列(数组形式)
         * 计算结果按照默认的精度进行四舍五入
         * @param array 数组
         * @param properties 要合计的列名
         * @param startRow 合计开始的行(第一行为1)
         * @param endRow 合计结束的行
         * @returns {null}
         */
        function sumArray(array, properties, startRow, endRow) {
            if (isNullOrEmpty(array) || isNullOrEmpty(properties)) {
                return null;
            }
            var start = 1;
            if (!isNullOrEmpty(startRow)) {
                start = startRow < array.length ? startRow : array.length;
            }
            var end = array.length;
            if (!isNullOrEmpty(endRow)) {
                end = endRow < array.length ? endRow : array.length;
            }
            var result = 0;
            var allNull = true;
            for (var i = start - 1; i < end; i++) {
                for (var j = 0; j < properties.length; j++) {
                    if (isNum(array[i][properties[j]])) {
                        allNull = false;
                        result = add(array[i][properties[j]], result);
                    }
                }
            }
            return allNull ? null : Number(roundUp(result, 2));
        }

        /**
         * 按指定的小数位数进行四舍五入
         * @param num
         * @param digit
         * @returns {*}
         */
        function roundUp(num, digit) {
            if (!isNum(num) || !isNum(digit)) {
                return null;
            }
            var r = new BigDecimal(num + "");
            return Number(r.setScale(digit, MathContext.ROUND_HALF_UP).toString());
        }

        /**
         * 按指定的小数位数进行截位,多余位数舍去
         * @param num
         * @param digit
         * @returns {*}
         */
        function floor(num, digit) {
            if (!isNum(num) || !isNum(digit)) {
                return null;
            }
            var r = new BigDecimal(num + "");
            return Number(r.setScale(digit, MathContext.ROUND_FLOOR).toString());
        }

        /**
         * 两个数字相乘 计算结果按照传入的精度(未设置则为2)进行四舍五入
         * @param arg1
         * @param arg2
         * @param digit
         * @returns {*}
         */
        function multiply(arg1, arg2, digit) {
            if (!isNum(arg1) || !isNum(arg2)) {
                return null;
            }

            var r1 = new BigDecimal(arg1 + "");
            var r2 = new BigDecimal(arg2 + "");

            return Number(r1.multiply(r2).setScale(digit || 2, MathContext.ROUND_HALF_UP).toString());
        }

        // 判断是否整除
        function isNoRemainder(arg1, arg2) {
            if (!isNum(arg1) || !isNum(arg2) || Number(arg2) == 0) {
                return null;
            }

            var mathContext = new MathContext(24, MathContext.PLAIN, MathContext.DEFAULT_LOSTDIGITS, MathContext.ROUND_HALF_UP);

            var r1 = new BigDecimal(arg1 + "");
            var r2 = new BigDecimal(arg2 + "");

            // 判断结果是否整数
            return /^[0-9]*$/.test(r1.divide(r2, mathContext).toString());
        }

        return {
            isNullOrEmpty: isNullOrEmpty,
            isNum: isNum,
            add: add,
            sum: sum,
            sumArray : sumArray,
            roundUp: roundUp,
            floor: floor,
            multiply: multiply,
            isNoRemainder: isNoRemainder
        };
    });