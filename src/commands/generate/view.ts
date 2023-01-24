import { CliUx, Flags } from "@oclif/core";
import * as fsExtra from "fs-extra";
import { viewTestEnumValues } from "../../constants/view.constant";
import { ViewTestEnum } from "../../enums/global.enum";
import { BaseCommand } from "../../helpers/BaseCommand.helper";
import {
  getItemPath,
  replaceItemTemplateName,
} from "../../helpers/command.helper";
import jsRouteTemplate from "../../templates/view/jsRoute.template";
import jsViewModelTemplate from "../../templates/view/jsViewModel.template";
import testRouteTemplate from "../../templates/view/testRoute.template";
import testViewDefaultTemplate from "../../templates/view/testViewDefault.template";
import testViewModelTemplate from "../../templates/view/testViewModel.template";
import testViewTestingLibraryTemplate from "../../templates/view/testViewTestingLibrary.template";
import tsRouteTemplate from "../../templates/view/tsRoute.template";
import tsViewModelTemplate from "../../templates/view/tsViewModel.template";
import viewTemplate from "../../templates/view/view.template";
import { GenerateItemParams } from "../../types/command.type";

export default class GenerateView extends BaseCommand<typeof GenerateView> {
  static summary = "Create a view";
  static description =
    "Creates a new, generic view definition in the given or default project";
  static examples = [
    `$ <%= config.bin %> <%= command.id %> ReportDriver -p src/views/reports --with-test=testingLibrary --with-route --with-view-model`,
    `$ <%= config.bin %> <%= command.id %> Login,Dashboard --use-typescript`,
  ];

  static args = [
    {
      name: "name",
      description: "Name of the views that you want to be generated.",
      required: true,
    },
  ];

  static flags = {
    // type: Flags.string({
    //   char: "t",
    //   helpGroup: "VIEW",
    //   description:
    //     'The "view" key/type that you have configured in your config file.',
    //   default: "default",
    // }),
    path: Flags.string({
      char: "p",
      helpGroup: "VIEW",
      description: "The path where the view will be generated.",
      default: "src/views",
    }),
    "use-typescript": Flags.boolean({
      aliases: ["ut"],
      helpGroup: "VIEW",
      description:
        "Create all corresponding files using typescript instead of javascript.",
      default: false,
    }),
    "with-test": Flags.enum<ViewTestEnum>({
      aliases: ["wt"],
      helpGroup: "VIEW",
      description:
        "Create a corresponding test file with each view you generate.",
      options: viewTestEnumValues,
      default: ViewTestEnum.none,
    }),
    "with-route": Flags.boolean({
      aliases: ["wr"],
      helpGroup: "VIEW",
      description:
        "Create a corresponding route file with each view you generate.",
      default: false,
    }),
    "with-view-model": Flags.boolean({
      aliases: ["wvm"],
      helpGroup: "VIEW",
      description:
        "Create a corresponding view model file with each view you generate.",
      default: false,
    }),
  };

  async generateView(
    flags: GenerateView["flags"],
    itemName: string,
    { template, filename, itemPath }: GenerateItemParams
  ): Promise<void> {
    // start loading spinner
    CliUx.ux.action.start(`Generating view`);

    // make sure the view does not already exist in the path directory.
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
    const { args, flags } = await this.parse(GenerateView);

    // get user input view names
    const viewNames = args.name.split(",") as string[];

    viewNames.forEach(async (itemName) => {
      const usesTypescript = flags["use-typescript"];

      let template = null;
      let filename = null;
      let itemPath = null;

      // TODO: generate user custom-templates view instead of our templates

      template = viewTemplate;
      filename = usesTypescript
        ? `${itemName}.view.tsx`
        : `${itemName}.view.js`;
      itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

      if (flags["with-test"] !== ViewTestEnum.testingLibrary) {
        // remove `data-testid` from template
        template = template.replace(` data-testid="TemplateNameView"`, "");
      }

      // generate view
      await this.generateView(flags, itemName, {
        template,
        filename,
        itemPath,
      });

      // check if we also need to generate view test file
      if (flags["with-test"] !== ViewTestEnum.none) {
        // TODO: generate user custom-templates view test instead of our templates

        template =
          flags["with-test"] === ViewTestEnum.testingLibrary
            ? testViewTestingLibraryTemplate
            : testViewDefaultTemplate;
        filename = usesTypescript
          ? `${itemName}.view.test.tsx`
          : `${itemName}.view.test.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate view test
        await this.generateView(flags, itemName, {
          template,
          filename,
          itemPath,
        });

        if (flags["with-route"]) {
          template = testRouteTemplate;
          filename = usesTypescript
            ? `${itemName}.route.test.tsx`
            : `${itemName}.route.test.js`;
          itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

          // also generate view route test
          await this.generateView(flags, itemName, {
            template,
            filename,
            itemPath,
          });
        }

        if (flags["with-view-model"]) {
          template = testViewModelTemplate;
          filename = usesTypescript
            ? `${itemName}.viewModel.test.tsx`
            : `${itemName}.viewModel.test.js`;
          itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

          // also generate view viewModel test
          await this.generateView(flags, itemName, {
            template,
            filename,
            itemPath,
          });
        }
      }

      // check if we also need to generate view route file
      if (flags["with-route"]) {
        // TODO: generate user custom-templates view route instead of our templates

        template = usesTypescript ? tsRouteTemplate : jsRouteTemplate;
        filename = usesTypescript
          ? `${itemName}.route.tsx`
          : `${itemName}.route.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate view route
        await this.generateView(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // check if we also need to generate view viewModel file
      if (flags["with-view-model"]) {
        // TODO: generate user custom-templates view view model instead of our templates

        template = usesTypescript ? tsViewModelTemplate : jsViewModelTemplate;
        filename = usesTypescript
          ? `${itemName}.viewModel.tsx`
          : `${itemName}.viewModel.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate view viewModel
        await this.generateView(flags, itemName, {
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
