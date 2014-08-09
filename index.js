var fs = require('fs'),
    _ = require('lodash');

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
    var phrases = configuration.phrases;
    phrases = (typeof phrases === "object" && phrases instanceof Array) ? phrases : [];

    if (typeof configuration.phraseFile === "string") {
        phrases = _.compact(_.union(phrases, fs.readFileSync(configuration.phraseFile).split("\n")));
    }

    function phrase() {
        if (phrases.length)
            return phrases[Math.floor(Math.random() * phrases.length)];

        return "This phrase command has not been properly configured."
    }

    function handler(slack) {
        try {
            slack.replyUser(phrase());
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
