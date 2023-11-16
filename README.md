# inventive-sdk
SDK library for types, function calls and React components to embed Inventive content in any web app

# Getting Started

## Commit message

We use [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) to enforce commit message style.
Here is a [list of rules](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules) to follow.

```
<type>: <short summary>
  │             │
  │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  └─⫸ Commit Type: build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test
```

## Manual publish
1. Make sure you are logged into your npm for `--scope=@inventive`:
    ```bash
    npm login --scope=@inventive
    ```
2. Make sure the version number is properly bumped
3. In the command line, run the following command:
    ```bash
    yarn publish:npm
    ```
    it will build the package and publish it to the npm registry under the said version number.

