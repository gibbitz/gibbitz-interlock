# gibbitz-interlock
Monorepo for R. Talisorian's Interlock Foundry Virtual Table Top containing systems, compendia and roll tables

## Getting Started
Working on any of the @gibbitz-interlock packages should start with installing from this Monorepo. Building any of the packages and working with the dependencies with Compendia and Rolltables is best controlled by running them all locally. If changes are needed in more than one repository this makes managing all the dependent changes simpler

### Requirements
  * Node v18+
  * NPM v9.8.1+ (Workspaces were introduced in v7)
    * This repo was built using NPM if you can't work without Yarn, PNPM, Bun etc. You're free to fork your own repo

### Installing Dependencies
As a Node Monorepo, installing all the dependencies and linking the sub-packages can be done by installing from the root package.
From this directory run the following in your terminal/CMD Prompt
```BASH
$ npm i
```
or if you like to type:
```BASH
$ npm install
```
a critical peer-dependency is the foundryCli (`@foundryvtt/foundryvtt-cli`). Depending on your node settings this may or may not be installed with the above command. Before you continue, check your node_modules folder to be sure it installed and if not, run:
```BASH
$ npm i @foundryvtt/foundryvtt-cli
```

### Running locally
Building the packages produces a folder with the package name in the `./dist` folder for each package. These will need to be symlinked or copied into the local userData folder. These can currently be found in the following locations

#### Windows
```BATCH
%localappdata%/FoundryVTT/Data/
```

#### macOS
```ZSH
~/Library/Application Support/FoundryVTT/Data/
```

#### Linux (in order of availability)
```BASH
/home/$USER/.local/share/FoundryVTT/Data/
/home/$USER/FoundryVTT/Data/
/local/FoundryVTT/Data/
```

More info on how to use these folders can be found in the individual README files for each package.

## Contributing
