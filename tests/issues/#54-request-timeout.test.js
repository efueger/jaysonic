const { expect } = require("chai");
const Jaysonic = require("../../src");

const tcpserver = new Jaysonic.server.tcp({ port: 9997 });
const httpserver = new Jaysonic.server.http({ port: 9996 });
const wss = new Jaysonic.server.ws({ port: 6665 });

const tcpclient = new Jaysonic.client.tcp({ port: 9997, timeout: 0 });
const httpclient = new Jaysonic.client.http({ port: 9996, timeout: 0 });
const wsclient = new Jaysonic.client.ws({
  url: "ws://127.0.0.1:6665",
  timeout: 0
});

const timeout = () => new Promise((resolve) => {
  setTimeout(() => resolve("timeout"), 10);
});

tcpserver.method("timeout", timeout);
httpserver.method("timeout", timeout);
wss.method("timeout", timeout);

describe("#54 Request timeout", () => {
  describe("tcp", () => {
    it("should return object for request timeout", (done) => {
      tcpserver.listen().then(() => {
        tcpclient.connect().then(() => {
          tcpclient
            .request()
            .send("timeout")
            .catch((error) => {
              expect(error).to.be.eql({
                jsonrpc: "2.0",
                error: { code: -32000, message: "Request Timeout" },
                id: null
              });
              done();
            });
        });
      });
    });
  });
  describe("ws", () => {
    it("should return object for request timeout", (done) => {
      wss.listen().then(() => {
        wsclient.connect().then(() => {
          wsclient
            .request()
            .send("timeout")
            .catch((error) => {
              expect(error).to.be.eql({
                jsonrpc: "2.0",
                error: { code: -32000, message: "Request Timeout" },
                id: null
              });
              done();
            });
        });
      });
    });
  });
  describe("http", () => {
    it("should return object for request timeout", (done) => {
      httpserver.listen().then(() => {
        httpclient
          .request()
          .send("timeout")
          .catch((error) => {
            expect(error).to.be.eql({
              jsonrpc: "2.0",
              error: { code: -32000, message: "Request Timeout" },
              id: null
            });
            done();
          });
      });
    });
  });
});
