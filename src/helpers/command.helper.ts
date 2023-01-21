import { Config } from "@oclif/core";
import { OptionFlag } from "@oclif/core/lib/interfaces";
import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import snakeCase from "lodash/snakeCase";
import startCase from "lodash/startCase";
import replace from "replace";

export function replaceItemTemplateName(itemName: string, itemPath: string) {
  const commonReplaceOptions = {
    paths: [itemPath],
    recursive: false,
    silent: true,
  };

  // will replace the `templatename` in whichever format the user typed the item name in the command.
  replace({
    ...commonReplaceOptions,
    regex: "templatename",
    replacement: itemName,
  });

  // will replace the `TemplateName` in PascalCase
  replace({
    ...commonReplaceOptions,
    regex: "TemplateName",
    replacement: startCase(camelCase(itemName)).replace(/ /g, ""),
  });

  // will replace the `templateName` in camelCase
  replace({
    ...commonReplaceOptions,
    regex: "templateName",
    replacement: camelCase(itemName),
  });

  // will replace the `template-name` in kebab-case
  replace({
    ...commonReplaceOptions,
    regex: "template-name",
    replacement: kebabCase(itemName),
  });

  // will replace the `template_name` in snake_case
  replace({
    ...commonReplaceOptions,
    regex: "template_name",
    replacement: snakeCase(itemName),
  });

  // will replace the `TEMPLATE_NAME` in uppercase SNAKE_CASE
  replace({
    ...commonReplaceOptions,
    regex: "TEMPLATE_NAME",
    replacement: snakeCase(itemName).toUpperCase(),
  });
}

export function getItemPath(
  path: string,
  isFlat: boolean,
  itemName: string,
  filename: string
) {
  return `${path}${isFlat ? "" : `/${itemName}`}/${filename}`;
}

export function getCommonEnumFlagParser<T>(enumValues: T[]) {
  return async (
    input: string,
    _context: { argv: string[]; config: Config },
    _opts: OptionFlag<T>
  ) => {
    if (!enumValues.includes(input as T))
      console.error(
        `\nPlease choose within these values: ${JSON.stringify(enumValues)}`
      );

    return input as T;
  };
}
