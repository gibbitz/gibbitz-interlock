# @gibbitz-interlock/cp2020-compendia
Mulitple Compendia and generator for R. Talisorian Games' Cyberpunk 2020 in Foundry Virtual Table Top (VTT) that pulls tabular data from the google sheets API into data usable as compendia

## TODO:
  * Determine how to make a module for a compendia
  * Update naming conventions if required
  * Rework code in current structure
  * Add buttons to control panel/sidebar to update data
  * Add button/modal to control panel/sidebar to add new compendia from a sheet

## Running locally
### Node
Requirements for the buildsystem are outlined in the [root package documentation](../../README.md#requirements). Be sure you can meet those requirements before attempting to run this code.

#### Installing
Before running the package, be sure to install nodejs dependencies see the [root package documentation](../../README.md#installing-dependencies) for details. Running the install scripts from the root package ensures interoperability of your local system and modules.

#### Other Scripts
To see other options for scripts you can always run
```BASH
$ npm run
```

### Foundry
Building the package produces a folder with the package name (cp2020-compendia) in the `./dist` folder.
I feed this to my local Foundry install using a [symbolic link (or symlink)](https://en.wikipedia.org/wiki/Symbolic_link)
After building the system the first time, I symlink my dist folder to my local FoundryVTT installs which are found in differing folders by OS:

#### Windows
```BATCH
%localappdata%/FoundryVTT/Data/modules/
```
#### macOS
```ZSH
~/Library/Application Support/FoundryVTT/Data/modules/
```
#### Linux (in order of availability)
```BASH
/home/$USER/.local/share/FoundryVTT/Data/modules/
/home/$USER/FoundryVTT/Data/modules/
/local/FoundryVTT/Data/modules/
```
In my case (on Xubuntu Linux) the command to make the symlink looks something like:
```BASH
ln -s /home/gibbitz/DEV/gibbitz-interlock/cp2020-system/dist/cp2020-system /home/gibbitz/.local/share/FoundryVTT/Data/modules
```
See the [unix manpage on symlinks](https://www.man7.org/linux/man-pages/man2/symlink.2.html) for documentation on how to use it in Linux and macOS.

Windows is slightly different than other unix-based OSes. For more info see this [symlink implementation on Windows](https://www.howtogeek.com/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/)