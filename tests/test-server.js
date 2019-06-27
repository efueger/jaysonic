const Jaysonic = require("../src");

const server = new Jaysonic.server.tcp({ host: "127.0.0.1", port: 8100 });
const serverHttp = new Jaysonic.server.http({
  host: "127.0.0.1",
  port: 8800
});

server.method("add", ([a, b]) => a + b);

server.method("greeting", ({ name }) => `Hello ${name}`);

server.method("typeerror", ([a]) => {
  if (typeof a === "number") {
    throw new TypeError();
  }
});

serverHttp.method("add", ([a, b]) => a + b);

serverHttp.method("greeting", ({ name }) => `Hello ${name}`);

serverHttp.method("typeerror", ([a]) => {
  if (typeof a === "number") {
    throw new TypeError();
  }
});

module.exports = { server, serverHttp };
