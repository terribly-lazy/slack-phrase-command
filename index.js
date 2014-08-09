var _ = require('lodash');

module.exports = function(configuration) {
    var listenOn = (function(name) {
        switch (typeof name) {
            case "string":
                return [name];
            case "object":
                if (name instanceof Array) {
                    return name;
                }
            //fallthrough
            default:
                return ["phrase"];
        }
    })(configuration.command);

    function handler(slack) {
        try {
            slack.replyUser(slack.text);
        } catch (e) {
            slack.error(e.toString());
        }
    }

    return function(ee) {
        _.forEach(listenOn, function(commandName) {
            ee.on(commandName, handler);
        });
    };
};
