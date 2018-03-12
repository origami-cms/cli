![Origami CLI](screenshot.jpg)

# Origami CLI [WIP]

Origami CLI is a tool that makes building websites for Origami CMS even easier.

## Installation
Install Origami CLI globally on your machine for easiest use:
`yarn global add origami-cli`.

This will install a global tool that you can run from anywhere with the command `origami`.

---

## Commands


### `origami`
By default, running `origami` in your shell will run the `origami run` command.

---

### `origami run`
Runs the Origami app in the current directory. This command looks for the `.origami` file, and if it cannot be found, will exit.

#### Usage:
`origami run`

---

### `origami new [directory]`
Create a new installation of Origami, downloads the packages, and sets up the `.origami` file.

#### Usage:
`origami new my-site`

#### Options:
- `directory` - Optional parameter to initialize the app in a new directory. You can use nested folder structure here to for path's that don't yet exist. EG: `origami new path/to/new/folder`.

---

## Help
Run `origami help` to see a full list of the commands and flags.
