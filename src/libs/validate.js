export const validateRequired = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('此项必填'));
    }
    else {
        callback();
    }
};

export const validateNum = (rule, value, callback) => {
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'));
        } else {
            callback();
        }
    }, 1000);
}