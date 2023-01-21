oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @rifandani/oregen
$ oregen COMMAND
running command...
$ oregen (--version)
@rifandani/oregen/1.1.0 win32-x64 node-v16.15.0
$ oregen --help [COMMAND]
USAGE
  $ oregen COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g @rifandani/oregen
$ oregen COMMAND
running command...
$ oregen (--version)
@rifandani/oregen/1.0.0 win32-x64 node-v16.15.0
$ oregen --help [COMMAND]
USAGE
  $ oregen COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g @rifandani/oregen
$ oregen COMMAND
running command...
$ oregen (--version)
@rifandani/oregen/0.0.0 win32-x64 node-v16.15.0
$ oregen --help [COMMAND]
USAGE
  $ oregen COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g oclif-hello-world
$ oex COMMAND
running command...
$ oex (--version)
oclif-hello-world/0.0.0 darwin-x64 node-v16.13.1
$ oex --help [COMMAND]
USAGE
  $ oex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oregen autocomplete [SHELL]`](#oregen-autocomplete-shell)
* [`oregen commands`](#oregen-commands)
* [`oregen generate`](#oregen-generate)
* [`oregen generate component NAME`](#oregen-generate-component-name)
* [`oregen generate hook NAME`](#oregen-generate-hook-name)
* [`oregen generate store NAME`](#oregen-generate-store-name)
* [`oregen generate view NAME`](#oregen-generate-view-name)
* [`oregen help [COMMAND]`](#oregen-help-command)
* [`oregen plugins`](#oregen-plugins)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin)
* [`oregen plugins:inspect PLUGIN...`](#oregen-pluginsinspect-plugin)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin-1)
* [`oregen plugins:link PLUGIN`](#oregen-pluginslink-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-1)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-2)
* [`oregen plugins update`](#oregen-plugins-update)
* [`oregen scaffold`](#oregen-scaffold)

## `oregen autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ oregen autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ oregen autocomplete

  $ oregen autocomplete bash

  $ oregen autocomplete zsh

  $ oregen autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.10/src/commands/autocomplete/index.ts)_

## `oregen commands`

list all the commands

```
USAGE
  $ oregen commands [--json] [-h] [--hidden] [--tree] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
  --tree             show tree of commands

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.2.2/src/commands/commands.ts)_

## `oregen generate`

List of supported generated contents

```
USAGE
  $ oregen generate [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [--columns <value> | -x]
    [--sort <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  List of supported generated contents

  List all supported generated contents which is "component", "hook", "view", and "store".

EXAMPLES
  $ oregen generate
```

_See code: [dist/commands/generate/index.ts](https://github.com/rifandani/oregen/blob/v1.1.0/dist/commands/generate/index.ts)_

## `oregen generate component NAME`

Create a component

```
USAGE
  $ oregen generate component [NAME] [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [-t <value>] [-p
    <value>] [-d <value>] [--use-typescript] [--with-lazy] [--with-story] [--with-style none|css|scss|less|styl]
    [--with-test none|default|enzyme|testingLibrary]

ARGUMENTS
  NAME  Name of the components that you want to be generated.

COMPONENT FLAGS
  -d, --describe=<value>                            The description of the component you want to generate (e.g. Create a
                                                    counter component that increments by one when I click on the
                                                    increment button).
  -p, --path=<value>                                [default: src/components] The path where the component will be
                                                    generated.
  -t, --type=<value>                                [default: default] The "component" key/type that you have configured
                                                    in your config file.
  --use-typescript                                  Generate a typescript component.
  --with-lazy                                       Create a corresponding lazy loaded component file (a file that
                                                    lazy-loads your component out of the box and enables code splitting:
                                                    https://reactjs.org/docs/code-splitting.html#code-splitting) with
                                                    each component you generate.
  --with-story                                      Create a corresponding story file with each component you generate.
  --with-style=(none|css|scss|less|styl)            [default: none] Create a corresponding stylesheet file with each
                                                    component you generate.
  --with-test=(none|default|enzyme|testingLibrary)  [default: none] Create a corresponding test file with each component
                                                    you generate.

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  Create a component

  Creates a new, generic component definition in the given or default project

EXAMPLES
  $ oregen generate component Box -p src/components/molecules -d "Create a counter component that increments by one when I click on the increment button" --with-test=enzyme --with-lazy --with-story

  $ oregen generate component Button,Modal --use-typescript --with-style=less
```

## `oregen generate hook NAME`

Create a hook

```
USAGE
  $ oregen generate hook [NAME] [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [-t <value>] [-p
    <value>] [-d <value>] [--use-typescript] [--with-test none|default|testingLibrary]

ARGUMENTS
  NAME  Name of the hooks that you want to be generated.

HOOK FLAGS
  -d, --describe=<value>                     The description of the hook you want to generate (e.g. Create a counter
                                             hook that increments by one when I click on the increment button).
  -p, --path=<value>                         [default: src/hooks] The path where the hook will be generated.
  -t, --type=<value>                         [default: default] The "hook" key/type that you have configured in your
                                             config file.
  --use-typescript                           Generate a typescript hook.
  --with-test=(none|default|testingLibrary)  [default: none] Create a corresponding test file with each hook you
                                             generate.

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  Create a hook

  Creates a new, generic hook definition in the given or default project

EXAMPLES
  $ oregen generate hook useLocationListFilter -p src/hooks/locations -d "Create a custom react hook that will fetch pokemon list, full with filter, and paginations" --with-test

  $ oregen generate hook useAuth,useLogout --use-typescript
```

## `oregen generate store NAME`

Create a redux store

```
USAGE
  $ oregen generate store [NAME] [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [-t <value>] [-p
    <value>] [--use-typescript] [--use-entity-adapter] [--with-test]

ARGUMENTS
  NAME  Name of the redux stores that you want to be generated.

STORE FLAGS
  -p, --path=<value>    [default: src/stores] The path where the redux store will be generated.
  -t, --type=<value>    [default: default] The "store" key/type that you have configured in your config file.
  --use-entity-adapter  Create all corresponding files using entity adapter instead of default template.
  --use-typescript      Create all corresponding files using typescript instead of javascript.
  --with-test           Create a corresponding test file with each redux store you generate.

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  Create a redux store

  Creates a new, generic redux store definition in the given or default project

EXAMPLES
  $ oregen generate store notification -p src/stores/reports --with-test

  $ oregen generate store Shipper,Driver --use-typescript --use-entity-adapter
```

## `oregen generate view NAME`

Create a view

```
USAGE
  $ oregen generate view [NAME] [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [-t <value>] [-p
    <value>] [--use-typescript] [--with-test none|default|testingLibrary] [--with-route] [--with-view-model]

ARGUMENTS
  NAME  Name of the views that you want to be generated.

VIEW FLAGS
  -p, --path=<value>                         [default: src/views] The path where the view will be generated.
  -t, --type=<value>                         [default: default] The "view" key/type that you have configured in your
                                             config file.
  --use-typescript                           Create all corresponding files using typescript instead of javascript.
  --with-route                               Create a corresponding route file with each view you generate.
  --with-test=(none|default|testingLibrary)  [default: none] Create a corresponding test file with each view you
                                             generate.
  --with-view-model                          Create a corresponding view model file with each view you generate.

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  Create a view

  Creates a new, generic view definition in the given or default project

EXAMPLES
  $ oregen generate view ReportDriver -p src/views/reports --with-test=testingLibrary --with-route --with-view-model

  $ oregen generate view Login,Dashboard --use-typescript
```

## `oregen help [COMMAND]`

Display help for oregen.

```
USAGE
  $ oregen help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oregen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.22/src/commands/help.ts)_

## `oregen plugins`

List installed plugins.

```
USAGE
  $ oregen plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oregen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.12/src/commands/plugins/index.ts)_

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oregen plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oregen plugins:inspect myplugin
```

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oregen plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oregen plugins:link myplugin
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins update`

Update installed plugins.

```
USAGE
  $ oregen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `oregen scaffold`

Init a new project

```
USAGE
  $ oregen scaffold [--json] [--log-level debug|info|warn|error] [--flat] [--dry-run] [-t <value>] [-p
    <value>] [-u <value> | --use-react-native]

SCAFFOLD FLAGS
  -p, --path=<value>  The path where the new react project will be generated.
  -t, --type=<value>  [default: default] The "store" key/type that you have configured in your config file.
  -u, --url=<value>   The url in which you want to use to init the new project instead of the default react project.
  --use-react-native  Initialize a new react native project instead of react project.

GLOBAL FLAGS
  --dry-run                            Show what will be generated without writing to disk.
  --flat                               Generate the files in the mentioned path instead of creating new folder for it.
  --json                               Format output as json.
  --log-level=(debug|info|warn|error)  Specify level for logging.

DESCRIPTION
  Init a new project

  Initialize a new project using react boilerplate.

EXAMPLES
  $ oregen scaffold

  $ oregen scaffold -p path/native-app --use-react-native

  $ oregen scaffold -u https://github.com/rifandani/frontend-template-graphql.git
```

_See code: [dist/commands/scaffold.ts](https://github.com/rifandani/oregen/blob/v1.1.0/dist/commands/scaffold.ts)_
<!-- commandsstop -->
* [`oregen autocomplete [SHELL]`](#oregen-autocomplete-shell)
* [`oregen commands`](#oregen-commands)
* [`oregen help [COMMAND]`](#oregen-help-command)
* [`oregen plugins`](#oregen-plugins)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin)
* [`oregen plugins:inspect PLUGIN...`](#oregen-pluginsinspect-plugin)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin-1)
* [`oregen plugins:link PLUGIN`](#oregen-pluginslink-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-1)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-2)
* [`oregen plugins update`](#oregen-plugins-update)

## `oregen autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ oregen autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ oregen autocomplete

  $ oregen autocomplete bash

  $ oregen autocomplete zsh

  $ oregen autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.10/src/commands/autocomplete/index.ts)_

## `oregen commands`

list all the commands

```
USAGE
  $ oregen commands [--json] [-h] [--hidden] [--tree] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
  --tree             show tree of commands

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.2.2/src/commands/commands.ts)_

## `oregen help [COMMAND]`

Display help for oregen.

```
USAGE
  $ oregen help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oregen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.22/src/commands/help.ts)_

## `oregen plugins`

List installed plugins.

```
USAGE
  $ oregen plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oregen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.12/src/commands/plugins/index.ts)_

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oregen plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oregen plugins:inspect myplugin
```

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oregen plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oregen plugins:link myplugin
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins update`

Update installed plugins.

```
USAGE
  $ oregen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
* [`oregen autocomplete [SHELL]`](#oregen-autocomplete-shell)
* [`oregen commands`](#oregen-commands)
* [`oregen help [COMMAND]`](#oregen-help-command)
* [`oregen plugins`](#oregen-plugins)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin)
* [`oregen plugins:inspect PLUGIN...`](#oregen-pluginsinspect-plugin)
* [`oregen plugins:install PLUGIN...`](#oregen-pluginsinstall-plugin-1)
* [`oregen plugins:link PLUGIN`](#oregen-pluginslink-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-1)
* [`oregen plugins:uninstall PLUGIN...`](#oregen-pluginsuninstall-plugin-2)
* [`oregen plugins update`](#oregen-plugins-update)

## `oregen autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ oregen autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ oregen autocomplete

  $ oregen autocomplete bash

  $ oregen autocomplete zsh

  $ oregen autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.10/src/commands/autocomplete/index.ts)_

## `oregen commands`

list all the commands

```
USAGE
  $ oregen commands [--json] [-h] [--hidden] [--tree] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
  --tree             show tree of commands

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.2.2/src/commands/commands.ts)_

## `oregen help [COMMAND]`

Display help for oregen.

```
USAGE
  $ oregen help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oregen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.22/src/commands/help.ts)_

## `oregen plugins`

List installed plugins.

```
USAGE
  $ oregen plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oregen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.12/src/commands/plugins/index.ts)_

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oregen plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oregen plugins:inspect myplugin
```

## `oregen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oregen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oregen plugins add

EXAMPLES
  $ oregen plugins:install myplugin 

  $ oregen plugins:install https://github.com/someuser/someplugin

  $ oregen plugins:install someuser/someplugin
```

## `oregen plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oregen plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oregen plugins:link myplugin
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oregen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oregen plugins unlink
  $ oregen plugins remove
```

## `oregen plugins update`

Update installed plugins.

```
USAGE
  $ oregen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
* [`oex hello PERSON`](#oex-hello-person)
* [`oex hello world`](#oex-hello-world)
* [`oex help [COMMAND]`](#oex-help-command)
* [`oex plugins`](#oex-plugins)
* [`oex plugins:inspect PLUGIN...`](#oex-pluginsinspect-plugin)
* [`oex plugins:install PLUGIN...`](#oex-pluginsinstall-plugin)
* [`oex plugins:link PLUGIN`](#oex-pluginslink-plugin)
* [`oex plugins:uninstall PLUGIN...`](#oex-pluginsuninstall-plugin)
* [`oex plugins update`](#oex-plugins-update)

## `oex hello PERSON`

Say hello

```
USAGE
  $ oex hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/oclif/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `oex hello world`

Say hello world

```
USAGE
  $ oex hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `oex help [COMMAND]`

Display help for oex.

```
USAGE
  $ oex help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oex.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `oex plugins`

List installed plugins.

```
USAGE
  $ oex plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oex plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `oex plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oex plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oex plugins:inspect myplugin
```

## `oex plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oex plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ oex plugins add

EXAMPLES
  $ oex plugins:install myplugin 

  $ oex plugins:install https://github.com/someuser/someplugin

  $ oex plugins:install someuser/someplugin
```

## `oex plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oex plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ oex plugins:link myplugin
```

## `oex plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oex plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oex plugins unlink
  $ oex plugins remove
```

## `oex plugins update`

Update installed plugins.

```
USAGE
  $ oex plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
