import { CliUx, Flags } from "@oclif/core";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { reactBoilerplateUrl } from "../constants/scaffold.constant";
import { BaseCommand } from "../helpers/BaseCommand.helper";

const execAsync = promisify(exec);

export default class Scaffold extends BaseCommand<typeof Scaffold> {
  static summary = "Init a new project";
  static description = "Initialize a new project using react boilerplate.";
  static examples = [
    `$ <%= config.bin %> <%= command.id %>`,
    `$ <%= config.bin %> <%= command.id %> -u https://github.com/rifandani/frontend-template-graphql.git`,
  ];

  static flags = {
    // type: Flags.string({
    //   char: "t",
    //   helpGroup: "SCAFFOLD",
    //   description:
    //     'The "store" key/type that you have configured in your config file.',
    //   default: "default",
    // }),
    path: Flags.string({
      char: "p",
      helpGroup: "SCAFFOLD",
      description: "The path where the new react project will be generated.",
      required: false,
    }),
    url: Flags.string({
      char: "u",
      helpGroup: "SCAFFOLD",
      description:
        "The url in which you want to use to init the new project instead of the default react project.",
      required: false,
    }),
  };

  // Get a repo name from input user `url` or config file `cliConfigFile.scaffold.default.url`
  getRepoNameFromUrl(url: string) {
    const splittedUrl = url.split("/");
    const repoName = splittedUrl[splittedUrl.length - 1].split(".")[0];

    return repoName;
  }

  async executeScaffolding(flags: Scaffold["flags"], url: string) {
    const args = [url];
    const repoName = this.getRepoNameFromUrl(url);

    // specify the path, if available
    if (flags.path) {
      if (flags.path.charAt(0) === ".") {
        console.warn(
          `It's not possible to specify a relative path as an argument`
        );
        return;
      }
      args.push(flags.path);
    }

    // start loading spinner
    CliUx.ux.action.start(`Scaffolding project`);

    // git clone a boilerplate project
    if (!flags["dry-run"]) {
      await execAsync(`git clone ${args.join(" ")}`);
    }

    // success toast
    CliUx.ux.action.stop(
      `"${repoName}" was successfully created${
        flags.path ? ` at "./${flags.path}"` : "."
      }`
    );
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Scaffold);

    // generate a custom user project
    if (flags.url) {
      await this.executeScaffolding(flags, flags.url);
    } else {
      // generate a default react project
      await this.executeScaffolding(flags, reactBoilerplateUrl);
    }

    if (flags["dry-run"]) {
      this.log(`📝 NOTE: The "dry-run" flag means no changes were made`);
    }
  }
}
