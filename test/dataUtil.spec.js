const assert = require("assert");
const DataUtil = require("../lib/dataUtil");
const yaml = require("node-yaml");
const MockDataWriter = require("./util/mockDataWriter");

describe("Setting the datawriter", function() {
  it("Defaults to node-yaml if dependency is missing", function() {
    const datUtil = new DataUtil();
    assert.equal(datUtil.dataWriter.getClassType(), "node-yaml");
  });

  it("Defaults to injected mock if dependency is present in ctor", function() {
    const mockDataWriter = new MockDataWriter();
    const datUtil = new DataUtil(mockDataWriter);
    assert.equal(datUtil.dataWriter.getClassType(), "mock");
  });
});
