import { expect, test } from "@oclif/test";

describe("generate:component", () => {
  test
    .stdout()
    .command(["generate:component"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world");
    });

  test
    .stdout()
    .command(["generate:component", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff");
    });
});
