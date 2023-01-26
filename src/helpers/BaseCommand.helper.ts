import { Command, Flags, Interfaces } from "@oclif/core";
import { LogLevelEnum } from "../enums/global.enum";

export type BaseCommandFlags<T extends typeof Command> =
  Interfaces.InferredFlags<typeof BaseCommand["globalFlags"] & T["flags"]>;

export abstract class BaseCommand<T extends typeof Command> extends Command {
  // add the --json flag
  static enableJsonFlag = true;

  // define flags that can be inherited by any command that extends BaseCommand
  static globalFlags = {
    "log-level": Flags.enum<LogLevelEnum>({
      summary: "Specify level for logging.",
      helpGroup: "GLOBAL",
      options: Object.values(LogLevelEnum),
      default: LogLevelEnum.info,
    }),
    flat: Flags.boolean({
      description:
        "Generate the files in the mentioned path instead of creating new folder for it.",
      helpGroup: "GLOBAL",
      default: false,
    }),
    "dry-run": Flags.boolean({
      description: "Show what will be generated without writing to disk.",
      helpGroup: "GLOBAL",
      default: false, // default value if flag not passed (can be a function that returns a boolean)
    }),
  };

  protected flags!: BaseCommandFlags<T>;

  public async init(): Promise<void> {
    await super.init();
    const { flags } = await this.parse(
      this.constructor as Interfaces.Command.Class
    );
    this.flags = flags;
  }

  protected async catch(err: Error & { exitCode?: number }): Promise<any> {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(err);
  }

  protected async finally(_: Error | undefined): Promise<any> {
    // called after run and catch regardless of whether or not the command errored
    return super.finally(_);
  }
}
