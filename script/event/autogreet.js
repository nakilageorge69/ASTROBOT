const cron = require('node-cron');

module.exports.config = {
    name: "autogreet",
    version: "1.0.0",
};

let isCronStarted = false;

module.exports.handleEvent = async function({ api }) {
    if (!isCronStarted) {
        startAutoGreet(api);
        isCronStarted = true;
    }
};

function startAutoGreet(api) {
    // Morning greeting at 8 AM
    cron.schedule('0 8 * * *', async function () {
        try {
            const message = "Good morning! Wishing you a wonderful day ahead!";
            api.createPost(message).catch(() => {});
        } catch (error) {
            console.error("Error during morning greeting:", error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Manila",
    });

    // Afternoon greeting at 12 PM
    cron.schedule('0 12 * * *', async function () {
        try {
            const message = "Good afternoon! Hope your day is going well!";
            api.createPost(message).catch(() => {});
        } catch (error) {
            console.error("Error during afternoon greeting:", error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Manila",
    });

    // Evening greeting at 6 PM
    cron.schedule('0 18 * * *', async function () {
        try {
            const message = "Good evening! Hope you had a productive day!";
            api.createPost(message).catch(() => {});
        } catch (error) {
            console.error("Error during evening greeting:", error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Manila",
    });
}
