/**
 * Allows simple simulation of writing to disk without writing contents
 * Used for testing
 */
class MockDataWriter {
  constructor(inputMock) {
    if (inputMock) {
      this.inputMock = inputMock;
    }
  }
  readSync() {
    if (this.inputMock) return this.inputMock;
    return {
      pull_request_limit: 10,
      comment_reply: "Default comment reply",
      preset_exemption: "PRJ-0000"
    };
  }
  write() {
    // This will no-op because we don't want to write any data to the disk
  }

  getClassType() {
    return "mock";
  }
}

module.exports = MockDataWriter;
