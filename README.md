# Documentation Boilerplate

The following repository contains a generic [Docusaurus](https://docusaurus.io/) setup used across all my project websites. This avoids me having to keep them all in sync, which would be an impossible task.

## Development

To work on the website, clone this repository, clone another of my projects (for example [Clipanion](https://github.com/arcanis/clipanion)), run an install in both, then run the following command:

```
DOC_PROJECT_CWD=~/path/to/clipanion yarn start
```

## Deployment

> You probably shouldn't use my boilerplate for your projects, as I make no guarantee that I won't make breaking changes.

I use Netlify to deploy my open-source websites, with the following configuration on each one:

**Base directory**

```
website
```

**Build command**

```
curl https://raw.githubusercontent.com/arcanis/mael.dev-docs/main/install.sh | tee /dev/stderr | bash
```

**Publish directory**

```
website/build
```
