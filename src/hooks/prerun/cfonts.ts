import { Hook } from "@oclif/core";
import cfonts from "cfonts";

const hook: Hook<"prerun"> = async function ({ config, Command }) {
  cfonts.say(config.name, {
    font: "block",
    colors: ["cyan", "yellow"],
    letterSpacing: 2,
    lineHeight: 0.1,
    space: true,
    gradient: true,
    independentGradient: true,
    transitionGradient: true,
  });

  // Command.flags as BaseCommandFlags<typeof Command>;
};

export default hook;
