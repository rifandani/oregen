import { Config } from "@oclif/core";
import { OptionFlag } from "@oclif/core/lib/interfaces";
import consola from "consola";
import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import snakeCase from "lodash/snakeCase";
import startCase from "lodash/startCase";
import replace from "replace";
import { LogLevelEnum } from "../enums/global.enum";

/**
 * Output message to the consola based on the `logLevel` input.
 */
export function logger(
  message: string,
  logLevelOption: LogLevelEnum,
  output?: any
) {
  const instance = consola.create({
    defaults: {
      tag: logLevelOption,
    },
  });

  const flags: Record<LogLevelEnum, () => void> = {
    [LogLevelEnum.error]: () =>
      output ? instance.error(message, output) : instance.error(message),
    [LogLevelEnum.warn]: () =>
      output ? instance.warn(message, output) : instance.warn(message),
    [LogLevelEnum.info]: () =>
      output ? instance.info(message, output) : instance.info(message),
    [LogLevelEnum.debug]: () =>
      output
        ? instance.log(`🔎 ${message}`, output)
        : instance.log(`🔎 ${message}`),
  };

  flags[logLevelOption]();
}

/**
 * Replace the placeholder "template name" with the actual "item" name.
 * "item" is a placeholder that could be replaced by "component" / "hook" / "view".
 */
export function replaceItemTemplateName(
  itemName: string,
  itemPath: string,
  flags: { ["log-level"]: LogLevelEnum }
) {
  const commonReplaceOptions = {
    paths: [itemPath],
    recursive: false,
    silent: true,
  };

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing lowercase "templatename" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "templatename",
    replacement: itemName,
  });

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing PascalCase "TemplateName" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "TemplateName",
    replacement: startCase(camelCase(itemName)).replace(/ /g, ""),
  });

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing camelCase "templateName" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "templateName",
    replacement: camelCase(itemName),
  });

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing kebab-case "template-name" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "template-name",
    replacement: kebabCase(itemName),
  });

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing snake_case "template_name" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "template_name",
    replacement: snakeCase(itemName),
  });

  if (["debug"].includes(flags["log-level"]))
    logger(
      `Replacing SNAKE_CASE "TEMPLATE_NAME" with the actual "itemName"`,
      flags["log-level"]
    );
  replace({
    ...commonReplaceOptions,
    regex: "TEMPLATE_NAME",
    replacement: snakeCase(itemName).toUpperCase(),
  });
}

/**
 * Get template "item" path.
 */
export function getItemPath(
  path: string,
  isFlat: boolean,
  itemName: string,
  filename: string
) {
  return `${path}${isFlat ? "" : `/${itemName}`}/${filename}`;
}

/**
 * Log error when user input outside of default choices.
 */
export function getCommonEnumFlagParser<T>(enumValues: T[]) {
  return async (
    input: string,
    _context: { argv: string[]; config: Config },
    _opts: OptionFlag<T>
  ) => {
    if (!enumValues.includes(input as T))
      consola.error(
        `\nPlease choose within these values: ${JSON.stringify(enumValues)}`
      );

    return input as T;
  };
}
