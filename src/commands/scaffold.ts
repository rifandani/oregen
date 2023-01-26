import { Flags } from "@oclif/core";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { reactBoilerplateUrl } from "../constants/scaffold.constant";
import { LogLevelEnum } from "../enums/global.enum";
import { BaseCommand } from "../helpers/BaseCommand.helper";
import { logger } from "../helpers/command.helper";

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
  getRepoNameFromUrl(flags: Scaffold["flags"], url: string) {
    if (["debug"].includes(flags["log-level"]))
      logger(`Get repo name from url`, flags["log-level"]);
    const splittedUrl = url.split("/");
    const repoName = splittedUrl[splittedUrl.length - 1].split(".")[0];

    return repoName;
  }

  async executeScaffolding(flags: Scaffold["flags"], url: string) {
    const args = [url];
    const repoName = this.getRepoNameFromUrl(flags, url);

    // specify the path, if available
    if (flags.path) {
      if (flags.path.charAt(0) === ".") {
        logger(
          `It's not possible to specify a relative path as an argument`,
          LogLevelEnum.error
        );
        return;
      }

      args.push(flags.path);
    }

    // start loading spinner
    if (["info", "debug"].includes(flags["log-level"]))
      logger(
        `Scaffolding project${
          repoName ? ` "${repoName}"` : ""
        }. Please wait...\n`,
        flags["log-level"]
      );

    // git clone a boilerplate project
    if (!flags["dry-run"]) {
      if (["DEBUG"].includes(flags["log-level"]))
        logger(`Executing git clone`, flags["log-level"]);
      await execAsync(`git clone ${args.join(" ")}`);
    }

    // success toast
    if (["info", "debug"].includes(flags["log-level"])) {
      logger(
        `Scaffolding project${repoName ? ` "${repoName}"` : ""} success.`,
        flags["log-level"]
      );

      if (repoName)
        logger(
          `You can access the project by typing "cd ${repoName}" in the root level of your project.`,
          flags["log-level"]
        );
    }
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
      logger(
        `The "dry-run" flag means no changes were made\n`,
        LogLevelEnum.info
      );
    }
  }
}
