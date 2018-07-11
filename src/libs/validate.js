export const validateRequired = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('此项必填'));
    }
    else {
        callback();
    }
};

export const validateInteger = (rule, value, callback) => {
    setTimeout(() => {

        var regPos = /^\d+$/; //正整数
        if (regPos.test(value)) {
            callback();
        } else {
            callback(new Error('请输入整数'));
        }
    }, 1000);
}

export const validateNum = (rule, value, callback) => {
    setTimeout(() => {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(value) || regNeg.test(value)) {
            callback();
        } else {
            callback(new Error('请输入数字'));
        }
    }, 1000);
}