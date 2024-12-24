# gibbitz-interlock-cp2020
A FoundryVTT system for Cyberpunk 2020 carrying from work done in fork https://github.com/gibbitz/cyberpunk2020-fvtt-homebrew

## Running locally
### Node
Requirements for the buildsystem are outlined in the [root package documentation](../../README.md#requirements). Be sure you can meet those requirements before attempting to run this code.

#### Installing
Before running the package, be sure to install nodejs dependencies see the [root package documentation](../../README.md#installing-dependencies) for details. Running the install scripts from the root package ensures interoperability of your local system and modules.

#### Development Builds
After install, to run the system in development mode, use:
```BASH
$ npm run dev
```
This will watch all JS and SCSS files in the package and rebuild the dist folder on changes. Unfortunately, Foundry doesn't run on HMR, so to see your changes you will need to refresh the page.

#### Bundling
When you are ready to create a final bundle, run:
```BASH
$ npm run build
```
This will create a compressed bundle to allow faster load times that should be ready to release

#### Other Scripts
To see other options for scripts you can always run
```BASH
$ npm run
```

### Foundry
Building the package produces a folder with the package name (cp2020-system) in the `./dist` folder.
I feed this to my local Foundry install using a [symbolic link (or symlink)](https://en.wikipedia.org/wiki/Symbolic_link)
After building the system the first time, I symlink my dist folder to my local FoundryVTT installs which are found in differing folders by OS:

#### Windows
```BATCH
%localappdata%/FoundryVTT/Data/systems/
```
#### macOS
```ZSH
~/Library/Application Support/FoundryVTT/Data/systems/
```
#### Linux (in order of availability)
```BASH
/home/$USER/.local/share/FoundryVTT/Data/systems/
/home/$USER/FoundryVTT/Data/systems/
/local/FoundryVTT/Data/systems/
```
In my case (on Xubuntu Linux) the command to make the symlink looks something like:
```BASH
ln -s /home/gibbitz/DEV/gibbitz-interlock/cp2020-system/dist/cp2020-system /home/gibbitz/.local/share/FoundryVTT/Data/systems
```
See the [unix manpage on symlinks](https://www.man7.org/linux/man-pages/man2/symlink.2.html) for documentation on how to use it in Linux and macOS.

Windows is slightly different than other unix-based OSes. For more info see this [symlink implementation on Windows](https://www.howtogeek.com/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/)

## Contributing
Contributions to the repository are welcome. In order to develop the system there are some peer dependencies that will need installing first:
  * _FoundryVTT_: this system was initially developed on v11.315
  * _@foundryvtt/foundryvtt-cli_: the CLI is leveraged for packaging and is also enforced as a peer dependency through NPM/Yarn
> note: the below are not currently required, but putting here for roadmap
  * _imagemagick_: [future state] imageMagick will likely be used to provide fancy image manipulation to Avatars and character art. It's inclusion is not 100% determined yet as most of what it can do can be done in node canvas at a CPU cost that I need to evaluate at that time. Regardless the choice, the module should be enforced by NPM/Yarn