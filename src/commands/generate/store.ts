import { CliUx, Flags } from "@oclif/core";
import * as fsExtra from "fs-extra";
import { BaseCommand } from "../../helpers/BaseCommand.helper";
import {
  getItemPath,
  replaceItemTemplateName,
} from "../../helpers/command.helper";
import jsTemplate from "../../templates/store/js.template";
import jsEntityAdapterTemplate from "../../templates/store/jsEntityAdapter.template";
import testDefaultTemplate from "../../templates/store/testDefault.template";
import testEntityAdapterTemplate from "../../templates/store/testEntityAdapter.template";
import tsTemplate from "../../templates/store/ts.template";
import tsEntityAdapterTemplate from "../../templates/store/tsEntityAdapter.template";
import { GenerateItemParams } from "../../types/command.type";

export default class GenerateStore extends BaseCommand<typeof GenerateStore> {
  static summary = "Create a redux store";
  static description =
    "Creates a new, generic redux store definition in the given or default project";
  static examples = [
    `$ <%= config.bin %> <%= command.id %> notification -p src/stores/reports --with-test`,
    `$ <%= config.bin %> <%= command.id %> Shipper,Driver --use-typescript --use-entity-adapter`,
  ];

  static args = [
    {
      name: "name",
      description: "Name of the redux stores that you want to be generated.",
      required: true,
    },
  ];

  static flags = {
    // type: Flags.string({
    //   char: "t",
    //   helpGroup: "STORE",
    //   description:
    //     'The "store" key/type that you have configured in your config file.',
    //   default: "default",
    // }),
    path: Flags.string({
      char: "p",
      helpGroup: "STORE",
      description: "The path where the redux store will be generated.",
      default: "src/stores",
    }),
    "use-typescript": Flags.boolean({
      aliases: ["ut"],
      helpGroup: "STORE",
      description:
        "Create all corresponding files using typescript instead of javascript.",
      default: false,
    }),
    "use-entity-adapter": Flags.boolean({
      aliases: ["uea"],
      helpGroup: "STORE",
      description:
        "Create all corresponding files using entity adapter instead of default template.",
      default: false,
    }),
    "with-test": Flags.boolean({
      aliases: ["wt"],
      helpGroup: "STORE",
      description:
        "Create a corresponding test file with each redux store you generate.",
      default: false,
    }),
  };

  async generateStore(
    flags: GenerateStore["flags"],
    itemName: string,
    { template, filename, itemPath }: GenerateItemParams
  ): Promise<void> {
    // start loading spinner
    CliUx.ux.action.start(`Generating redux store`);

    // make sure the store does not already exist in the path directory.
    if (fsExtra.existsSync(itemPath)) {
      CliUx.ux.action.stop(
        `"${filename}" already exists in this path "${itemPath}"`
      );
      // exit process
      this.exit(0);
    }

    if (!flags["dry-run"]) {
      // generate template file
      fsExtra.outputFileSync(itemPath, template);
      // replace the placeholder template name with the actual `itemName`
      replaceItemTemplateName(itemName, itemPath);
    }

    // success toast
    CliUx.ux.action.stop(
      `"${filename}" ${`was successfully created at`} "${itemPath}"`
    );
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(GenerateStore);

    // get user input store names
    const storeNames = args.name.split(",") as string[];

    storeNames.forEach(async (itemName) => {
      const usesTypescript = flags["use-typescript"];

      let template = null;
      let filename = null;
      let itemPath = null;

      // TODO: generate user custom-templates store instead of our templates

      template = usesTypescript ? tsTemplate : jsTemplate;
      filename = usesTypescript
        ? `${itemName}.store.ts`
        : `${itemName}.store.js`;
      itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

      if (flags["use-entity-adapter"]) {
        template = usesTypescript
          ? tsEntityAdapterTemplate
          : jsEntityAdapterTemplate;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);
      }

      // generate store
      await this.generateStore(flags, itemName, {
        template,
        filename,
        itemPath,
      });

      // check if we also need to generate store test file
      if (flags["with-test"]) {
        // TODO: generate user custom-templates store test instead of our templates

        template = flags["use-entity-adapter"]
          ? testEntityAdapterTemplate
          : testDefaultTemplate;
        filename = usesTypescript
          ? `${itemName}.store.test.ts`
          : `${itemName}.store.test.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate store test
        await this.generateStore(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // TODO: check if user input custom "type" flag
      // if (flags.type !== "default") {
      //   // read user defined config
      //   const explorer = cosmiconfig("regen");
      //   const userConfig = await explorer.search();

      //   if (!userConfig) {
      //     this.warn(
      //       'There is no config file detected. Please create one, by doing "oregen" config init".'
      //     );
      //     return;
      //   }
      // }
    });

    if (flags["dry-run"]) {
      this.log(`📝 NOTE: The "dry-run" flag means no changes were made`);
    }
  }
}
