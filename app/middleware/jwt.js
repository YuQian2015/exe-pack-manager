const jwt = require("koa-jwt2");
module.exports = options => {
    return jwt(options).unless(options.unless);
};
