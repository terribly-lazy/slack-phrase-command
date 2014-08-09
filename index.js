module.exports = function(configuration) {
    return function(ee) {
        ee.on('roll', function(slack) {
            try {
                slack.replyUser(slack.text);
            } catch (e) {
                slack.error(e.toString());
            }
        });
    };
};
