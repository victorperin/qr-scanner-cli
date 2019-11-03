# Contributing to QR Scanner CLI

:tada: First off all, thanks for taking the time to contribute in project! :+1:

The following is a set of guidelines for contributing to QR Scanner CLI. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[How the development workflow works](#how-the-development-workflow-works)

[To-do before finishing a pull request!](#to-do-before-finishing-a-pull-request)
* [Check the cli commands upgraded](#commands-to-check-before-finishing-a-pull-request)
* [Husky the pre-commit flow](#husky-the-pre-commit-flow)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Jest Styleguide](#specs-styleguide)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONFUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [me@victorperin.ninja](mailto:me@victorperin.ninja).

## How the development workflow works?

The development starts when you select an issue to contribute, adding some message in the issue to moderator asking to participate in that issue, when attribuited to you, create a fork of project and start coding :man_technologist:.

You need to get some precautions before to commit your code, please check the [To-do before finishing a pull request!](#to-do-before-finishing-a-pull-request)

Don't forgot the tests if you are creating a feature, and check twice the orthography if you are creating a documentation ou fixing that

We have an community chimes in with helpful advice if you have questions.

* [Telegram Community - NodeSchool Campinas](https://t.me/nodeschool_campinas)

## To-do before finishing a pull request

Bellow you can get some informations to keep your code acceptable in the pull request, be attempt to follow the guideline at maximum to not being rejected or need to make changes, remember to make changes concized in the theme of issue not try to do something unnecessary. Keep changes easy for others to understand and, in the case of a change request of your pull request, keep an eye out, if you keep in hold too long time without response the pull the request can be canceled by the moderator and reatribuited to another person.

### Commands to check before finishing a pull request!

Every command of the CLI inside the project must be operative and the tests before your changes cannot fail on commit, if you implemented a new feature and this feature increments or decrements the operations, you need to update the test file and the [readme.md](./readme.md) or open an [issue](https://github.com/victorperin/qr-scanner-cli/issues/new) for changing the documentation with a great description for what to do and referencing the feature.

### Husky the pre-commit flow

Husky is an hook that operates before commit changes in the project the hook lint the commit message with commitlint to follow a guideline, on the development of this project you need to follow some those to can commit your project, the commit message has 

#### Remember to follow it, otherwise your code will be rejected

The commit message need keep a standard, so we chose to use the commitlint with conventional commits configuration, the fully documentation can be [find here](https://www.npmjs.com/package/@commitlint/config-conventional), but the abstract of the documentation will be bottom:

The commitmessage need to start with a type, the acceptable type's is:
```javascript
types => [ 'build','ci','chore','docs','feat','fix','perf','refactor','revert','style','test' ]
```

And the type-case is ruled by lowercase always if is in uppercase or camelcase is not valid.

After the type is optional to describe the scope of changes also in lowercase to be valid and if is used need to be inside pharentesis other case if is not used need to be nothing has changed.

And ```:``` with the message of commit objective; the full commit message wold'nt finish with ```.``` and can't pass to 72 chars or will be disconsidered by hook.

> To keep pretty, please dedicate an space before the message commit

These are some cases to exemplify the commit message:

**Commit message**|**Accpetable**
-----|-----
TYPE:commit message|:x:
Type:commit message|:x:
type:commit message|:white_check_mark:
:commit message|:x:
type: commit message is too long to this way i can exemplification everything and keep my history today|:x:
type: commit message.|:x: 
type: commit message|:white_check_mark:
type(SCOPE): commit message|:x:
type(Scope): commit message|:x:
type(): commit message|:x:
type(scope): commit message|:white_check_mark:

More examples you can find in the full documentation.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for QR Scanner CLI. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out with the maximum information for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one referencing the last issue.

#### Before Submitting A Bug Report

* **Check if the bug exists in another opened issue.** You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem and if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined your bug is related to, create an issue on repository and provide the following information by filling in.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started terminal, e.g. which command exactly you used in the terminal. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you moved the cursor to the end of a line, explain if you used the mouse, or a keyboard.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Can you reproduce the problem with another image?**
* **Did the problem start happening recently** (e.g. after updating to a new version of CLI) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of CLI?** What's the most recent version in which the problem doesn't happen? You can download older versions of CLI from [the releases page](https://github.com/victorperin/qr-scanner-cli/releases).
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.
* If the problem is related to directly the files? **does the problem happen for all files or only some?** Does the problem happen only when working with local or remote files (e.g. on network drives), with large files or with files in a specific encoding? Is there anything else special about the files you are using?

Include details about your configuration and environment:

* **Which version of CLI are you using?** You can get the exact version by running `qrscanner --version` in your terminal.
* **What's the name and version of the OS you're using**?
* **Are you running the CLI in a virtual machine?** If so, which VM software are you using and which operating systems and versions are used for the host and the guest?
* **Which keyboard layout are you using?** Are you using a US layout or some other layout?

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for the CLI, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

* **Check if you're using the latest version** the feature can be there already.
* **Check if there's already which provides that enhancement.**
* **Perform a [cursory search](https://github.com/victorperin/qr-scanner-cli/search?q=+is%3Aissue)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/), create an issue on repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Atom which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most users and isn't something that can or should be implemented.
* **Specify the name and version of the OS you're using.**

### Your First Code Contribution

Unsure where to begin contributing to QR Scanner CLI? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

### Pull Requests

The process described here has several goals:

- Maintain QR Scanner's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible QR Scanner's
- Enable a sustainable system for QR Scanner's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow the [styleguides](#styleguides)
2. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Conventional Commits Style

We have very precise rules over how our git commit messages can be formatted. This leads to ***more readable messages*** that are easy to follow when looking through the ***project history***. For follow the rules we bring to this file the [commit message format](#commit-message-format)

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 72 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://www.conventionalcommits.org))

```
docs(contributing): update conventional commits style
```
```
fix(release): need to depend on latest node.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

#### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

#### Before Commit

We use the husky to keep the changes acceptables and you can find some information of this [right here.](#husky-the-pre-commit-flow)

### Eslint and Prettier Styleguide

The organization of the code is provided by prettier and the eslint configuration. They can be found in the project root, both named like [.prettierrc](.prettierrc) to prettier configuration and [.eslintrc.json](.eslintrc.json) for the eslint configuration file.

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
    * Local Modules (using relative paths)
* Place class properties in the following order:
    * Class methods and properties (methods starting with `static`)
    * Instance methods and properties

### Specs Styleguide

- Include thoughtfully-worded, well-structured [Jest](https://jestjs.io/) specs in the `./tests` folder.
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.
- Treat `expect` as a expectation how an operation must complete.

#### Example

```javascript
test('a dog barks when is happy', () => {
  # spec here
  expect('dog barks').toBeTruthy()
})
```
