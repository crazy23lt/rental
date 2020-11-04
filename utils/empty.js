const empty = function (obj) {
    for (const key in obj) {
        return false;
    }
    return true;
};
module.exports = empty;