const app = require("./app");
const http = require("http").Server(app);


const PORT = process.env.PORT || 8080;

http.listen(PORT, function() {
    console.log(`Express server running on port ${PORT}`);
})
