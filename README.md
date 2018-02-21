Marketing Website
=============================

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)


## Branches

We use `master` branch _exclusively_ to deploy to Github Pages using `gulp deploy`.

We use `develop` to maintain the latest version of the website. Branch off to build new features, to apply fixes etc.

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

**jekyll**

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Deploy with Gulp

Make sure Gulp *is not* running in your Terminal.

Then run: `gulp deploy`


## Updating Ruby Dependencies

This project uses Bundler to manage Ruby Dependencies. To update all Dependencies run:

```
bundle update
```
  
