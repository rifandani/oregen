export type CommandItemOption =
  | "component"
  | "hook"
  | "view"
  | "scaffold"
  | "store";

export type GenerateItemParams = {
  template: string;
  filename: string;
  itemPath: string;
};
