import { CliUx } from "@oclif/core";
import { BaseCommand } from "../../helpers/BaseCommand.helper";

export default class Generate extends BaseCommand<typeof Generate> {
  static summary = "List of supported generated contents";
  static description =
    'List all supported generated contents which is "component", "hook", "view", and "store".';
  static examples = [`$ <%= config.bin %> <%= command.id %>`];

  static flags = {
    ...CliUx.ux.table.flags(),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Generate);

    const contents = [
      { name: "component" },
      { name: "hook" },
      { name: "view" },
      { name: "store" },
    ];

    CliUx.ux.table(
      contents,
      {
        name: {
          minWidth: 10,
        },
        id: {
          header: "ID",
          extended: true,
        },
      },
      {
        printLine: this.log.bind(this),
        ...flags, // parsed flags
      }
    );
  }
}
