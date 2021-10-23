const app = require('./index');

const server = app.listen(3001, () => {
    console.log("Server app listening on port 3001!");
});

module.exports = server;