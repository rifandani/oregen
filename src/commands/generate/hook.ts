import { CliUx, Flags } from "@oclif/core";
import { cosmiconfig } from "cosmiconfig";
import * as fsExtra from "fs-extra";
import { hookTestEnumValues } from "../../constants/hook.constant";
import { HookTestEnum } from "../../enums/global.enum";
import { BaseCommand } from "../../helpers/BaseCommand.helper";
import {
  getCommonEnumFlagParser,
  getItemPath,
  replaceItemTemplateName,
} from "../../helpers/command.helper";
import openAiItemTemplateGenerator from "../../services/openAi.service";
import jsTemplate from "../../templates/hook/js.template";
import testDefaultTemplate from "../../templates/hook/testDefault.template";
import testTestingLibraryTemplate from "../../templates/hook/testTestingLibrary.template";
import tsTemplate from "../../templates/hook/ts.template";
import { GenerateItemParams } from "../../types/command.type";

export default class GenerateHook extends BaseCommand<typeof GenerateHook> {
  static summary = "Create a hook";
  static description =
    "Creates a new, generic hook definition in the given or default project";
  static examples = [
    `$ <%= config.bin %> <%= command.id %> useLocationListFilter -p src/hooks/locations -d "Create a custom react hook that will fetch pokemon list, full with filter, and paginations" --with-test`,
    `$ <%= config.bin %> <%= command.id %> useAuth,useLogout --use-typescript`,
  ];

  static args = [
    {
      name: "name",
      description: "Name of the hooks that you want to be generated.",
      required: true,
    },
  ];

  static flags = {
    type: Flags.string({
      char: "t",
      helpGroup: "HOOK",
      description:
        'The "hook" key/type that you have configured in your config file.',
      default: "default",
      deprecated: {
        message: "Not supported yet.",
      },
    }),
    path: Flags.string({
      char: "p",
      helpGroup: "HOOK",
      description: "The path where the hook will be generated.",
      default: "src/hooks",
    }),
    describe: Flags.string({
      char: "d",
      helpGroup: "HOOK",
      description:
        "The description of the hook you want to generate (e.g. Create a counter hook that increments by one when I click on the increment button).",
      default: undefined,
    }),
    "use-typescript": Flags.boolean({
      aliases: ["ut"],
      helpGroup: "HOOK",
      summary: "Generate a typescript hook.",
      default: false,
    }),
    "with-test": Flags.enum<HookTestEnum>({
      aliases: ["wt"],
      helpGroup: "HOOK",
      description:
        "Create a corresponding test file with each hook you generate.",
      options: hookTestEnumValues,
      default: HookTestEnum.none,
      parse: getCommonEnumFlagParser(hookTestEnumValues),
    }),
  };

  async generateHook(
    flags: GenerateHook["flags"],
    itemName: string,
    { template, filename, itemPath }: GenerateItemParams
  ): Promise<void> {
    // start loading spinner
    CliUx.ux.action.start(`Generating hook`);

    // make sure the hook does not already exist in the path directory.
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

    // check if we need to generate AI-generated test template instead
    if (flags.describe) {
      const aiGeneratedTemplate = await openAiItemTemplateGenerator({
        item: "hook",
        isTest: true,
        itemTemplate: template,
        instructions: flags.describe,
      });

      // output the file from AI-generated template
      if (!flags["dry-run"] && aiGeneratedTemplate) {
        fsExtra.outputFileSync(itemPath, aiGeneratedTemplate.trim());
      }

      CliUx.ux.action.stop(
        `OpenAI successfully created the ${`"${filename}"`} hook with the provided description`
      );
    }

    // success toast
    CliUx.ux.action.stop(
      `"${filename}" ${`was successfully created at`} "${itemPath}"`
    );
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(GenerateHook);

    // get user input hook names
    const hookNames = args.name.split(",") as string[];

    hookNames.forEach(async (itemName) => {
      const usesTypescript = flags["use-typescript"];

      let template = null;
      let filename = null;
      let itemPath = null;

      // TODO: generate user custom-templates hook instead of our templates

      template = usesTypescript ? tsTemplate : jsTemplate;
      filename = usesTypescript ? `${itemName}.tsx` : `${itemName}.js`;
      itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

      // generate hook
      await this.generateHook(flags, itemName, {
        template,
        filename,
        itemPath,
      });

      // check if we also need to generate hook test file
      if (flags["with-test"] !== HookTestEnum.none) {
        // TODO: generate user custom-templates hook test instead of our templates

        template =
          flags["with-test"] === HookTestEnum.testingLibrary
            ? testTestingLibraryTemplate
            : testDefaultTemplate;
        filename = usesTypescript
          ? `${itemName}.test.tsx`
          : `${itemName}.test.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate hook test
        await this.generateHook(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // TODO: check if user input custom "type" flag
      if (flags.type !== "default") {
        // read user defined config
        const explorer = cosmiconfig("regen");
        const userConfig = await explorer.search();

        if (!userConfig) {
          this.warn(
            'There is no config file detected. Please create one, by doing "oregen" config init".'
          );
          return;
        }
      }
    });

    if (flags["dry-run"]) {
      this.log(`📝 NOTE: The "dry-run" flag means no changes were made`);
    }
  }
}
