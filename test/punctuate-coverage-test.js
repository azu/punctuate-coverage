import {coverage} from "../src/punctuate-coverage"
import assert from "power-assert"
describe("punctuate-coverage", function () {
    describe("#coverage", function () {
        it("should return object", function () {
            var results = coverage([__dirname + "/fixtures/README.md"]);
            assert(results.files.length > 0);
            assert.equal(typeof results.files[0].source, "object");
            assert.equal(typeof results.files[0].filename, "string");
        });
    });
});