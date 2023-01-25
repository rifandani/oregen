import { CliUx, Flags } from "@oclif/core";
import * as fsExtra from "fs-extra";
import {
  componentStyleEnumValues,
  componentTestEnumValues,
} from "../../constants/component.constant";
import { ComponentStyleEnum, ComponentTestEnum } from "../../enums/global.enum";
import { BaseCommand } from "../../helpers/BaseCommand.helper";
import {
  getCommonEnumFlagParser,
  getItemPath,
  replaceItemTemplateName,
} from "../../helpers/command.helper";
import openAiItemTemplateGenerator from "../../services/openAi.service";
import cssTemplate from "../../templates/component/css.template";
import jsTemplate from "../../templates/component/js.template";
import lazyTemplate from "../../templates/component/lazy.template";
import storyTemplate from "../../templates/component/story.template";
import testDefaultTemplate from "../../templates/component/testDefault.template";
import testEnzymeTemplate from "../../templates/component/testEnzyme.template";
import testTestingLibraryTemplate from "../../templates/component/testTestingLibrary.template";
import tsTemplate from "../../templates/component/ts.template";
import tsLazyTemplate from "../../templates/component/tsLazy.template";
import { GenerateItemParams } from "../../types/command.type";

export default class GenerateComponent extends BaseCommand<
  typeof GenerateComponent
> {
  static summary = "Create a component";
  static description =
    "Creates a new, generic component definition in the given or default project";
  static examples = [
    `$ <%= config.bin %> <%= command.id %> Box -p src/components/molecules -d "Create a counter component that increments by one when I click on the increment button" --with-test=enzyme --with-lazy --with-story`,
    `$ <%= config.bin %> <%= command.id %> Button,Modal --use-typescript --with-style=less`,
  ];

  static args = [
    {
      name: "name",
      description: "Name of the components that you want to be generated.",
      required: true,
    },
  ];

  static flags = {
    // type: Flags.string({
    //   char: "t",
    //   helpGroup: "COMPONENT",
    //   description:
    //     'The "component" key/type that you have configured in your config file.',
    //   default: "default",
    // }),
    path: Flags.string({
      char: "p",
      helpGroup: "COMPONENT",
      description: "The path where the component will be generated.",
      default: "src/components",
    }),
    describe: Flags.string({
      char: "d",
      helpGroup: "COMPONENT",
      description:
        "The description of the component you want to generate (e.g. Create a counter component that increments by one when I click on the increment button). You required to have `.env` file with `OPENAI_API_KEY` defined in it.",
      default: undefined,
    }),
    "use-typescript": Flags.boolean({
      aliases: ["ut"],
      helpGroup: "COMPONENT",
      summary: "Generate a typescript component.",
      default: false,
    }),
    "use-twmacro": Flags.boolean({
      aliases: ["utm"],
      helpGroup: "COMPONENT",
      summary: "Generate the component using runtime CSS-in-JS Twin Macro.",
      default: false,
      exclusive: ["with-style"],
    }),
    "with-lazy": Flags.boolean({
      aliases: ["wl"],
      helpGroup: "COMPONENT",
      description:
        "Create a corresponding lazy loaded component file (a file that lazy-loads your component out of the box and enables code splitting: https://reactjs.org/docs/code-splitting.html#code-splitting) with each component you generate.",
      default: false,
    }),
    "with-story": Flags.boolean({
      aliases: ["wsto"],
      helpGroup: "COMPONENT",
      description:
        "Create a corresponding story file with each component you generate.",
      default: false,
    }),
    "with-style": Flags.enum<ComponentStyleEnum>({
      aliases: ["wsty"],
      helpGroup: "COMPONENT",
      description:
        "Create a corresponding stylesheet file with each component you generate.",
      options: componentStyleEnumValues,
      default: ComponentStyleEnum.none,
      parse: getCommonEnumFlagParser(componentStyleEnumValues),
      exclusive: ["use-twmacro"],
    }),
    "with-test": Flags.enum<ComponentTestEnum>({
      aliases: ["wt"],
      helpGroup: "COMPONENT",
      description:
        "Create a corresponding test file with each component you generate.",
      options: componentTestEnumValues,
      default: ComponentTestEnum.none,
      parse: getCommonEnumFlagParser(componentTestEnumValues),
    }),
  };

  async generateComponent(
    flags: GenerateComponent["flags"],
    itemName: string,
    { template, filename, itemPath }: GenerateItemParams
  ): Promise<void> {
    // start loading spinner
    CliUx.ux.action.start(`Generating component`);

    // make sure the component does not already exist in the path directory.
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
        item: "component",
        isTest: true,
        itemTemplate: template,
        instructions: flags.describe,
      });

      // output the file from AI-generated template
      if (!flags["dry-run"] && aiGeneratedTemplate) {
        fsExtra.outputFileSync(itemPath, aiGeneratedTemplate.trim());
      }

      CliUx.ux.action.stop(
        `OpenAI successfully created the ${`"${filename}"`} component with the provided description`
      );
    }

    // success toast
    CliUx.ux.action.stop(
      `"${filename}" ${`was successfully created at`} "${itemPath}"`
    );
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(GenerateComponent);

    // get user input component names
    const componentNames = args.name.split(",") as string[];

    componentNames.forEach(async (itemName) => {
      const usesTypescript = flags["use-typescript"];

      let template = null;
      let filename = null;
      let itemPath = null;

      // TODO: generate user custom-templates component instead of our templates

      template = usesTypescript ? tsTemplate : jsTemplate;
      filename = usesTypescript ? `${itemName}.tsx` : `${itemName}.js`;
      itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

      if (flags["with-test"] !== ComponentTestEnum.testingLibrary) {
        // remove `data-testid` from template
        template = template.replace(` data-testid="TemplateName"`, "");
      }

      if (!flags["use-twmacro"]) {
        // delete templates related to twin.macro
        template = template.replace(`import tw from 'twin.macro';`, "");
        template = template.replace(
          `const Container = tw.div\`h-full w-full\`;`,
          ""
        );
        template = template.replaceAll("Container", "div"); // target: ES2021
      }

      if (flags["with-style"] !== ComponentStyleEnum.none) {
        // adjust stylesheet import accordingly
        const cssPath = `${itemName}.${flags["with-style"]}`; // e.g. Box.scss
        template = template.replace(`{styles.TemplateName}`, `"${itemName}"`);
        template = template.replace(
          `styles from './TemplateName.module.css'`,
          `'./${cssPath}'`
        );
        // delete templates related to twin.macro
        template = template.replace(`import tw from 'twin.macro';`, "");
        template = template.replace(
          `const Container = tw.div\`h-full w-full\`;`,
          ""
        );
        template = template.replaceAll("Container", "div"); // target: ES2021
      } else {
        // if there is no stylesheet, remove `className` attribute and style import from `jsTemplate`
        template = template.replace(` className={styles.TemplateName}`, "");
        template = template.replace(
          `import styles from './TemplateName.module.css';`,
          ""
        );
      }

      // generate component
      await this.generateComponent(flags, itemName, {
        template,
        filename,
        itemPath,
      });

      // check if we also need to generate component test file
      if (flags["with-test"] !== ComponentTestEnum.none) {
        // TODO: generate user custom-templates component test instead of our templates

        filename = usesTypescript
          ? `${itemName}.test.tsx`
          : `${itemName}.test.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        if (flags["with-test"] === ComponentTestEnum.testingLibrary) {
          template = testTestingLibraryTemplate;
        } else if (flags["with-test"] === ComponentTestEnum.enzyme) {
          template = testEnzymeTemplate;
        } else {
          template = testDefaultTemplate;
        }

        // also generate component test
        await this.generateComponent(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // check if we also need to generate component lazy file
      if (flags["with-lazy"]) {
        // TODO: generate user custom-templates component test instead of our templates

        template = usesTypescript ? tsLazyTemplate : lazyTemplate;
        filename = usesTypescript
          ? `${itemName}.lazy.tsx`
          : `${itemName}.lazy.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate component lazy
        await this.generateComponent(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // check if we also need to generate component story file
      if (flags["with-story"]) {
        // TODO: generate user custom-templates component test instead of our templates

        template = storyTemplate;
        filename = usesTypescript
          ? `${itemName}.stories.tsx`
          : `${itemName}.stories.js`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate component story
        await this.generateComponent(flags, itemName, {
          template,
          filename,
          itemPath,
        });
      }

      // check if we also need to generate component style file
      if (flags["with-style"] !== ComponentStyleEnum.none) {
        // TODO: generate user custom-templates component test instead of our templates

        template = cssTemplate;
        filename = `${itemName}.${flags["with-style"]}`;
        itemPath = getItemPath(flags.path, flags.flat, itemName, filename);

        // also generate component style
        await this.generateComponent(flags, itemName, {
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
