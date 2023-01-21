declare module "cfonts" {
  export function say(text: string, options: Record<string, unknown>): void;
}

declare module "replace" {
  export default function replace(options: Record<string, unknown>): void;
}
