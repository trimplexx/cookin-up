# Client Installation Guide

- node v20.X (check version via `node -v`, for multiple versions use nvm [info](https://github.com/nvm-sh/nvm/blob/master/README.md))
- npm v10.X
- Visual Studio Code

## Clone and install

1. After downloaded, open in Visual Studio Code and install extensions from settings.json file.

2. If you don't have yet yarn, install via:

```bash
$ npm i -g yarn
```

3. Go to root project directory and install all dependencies via:

```bash
$ yarn install
```

4. Run client via:

```bash
$ yarn run dev
```

Client local url: [http://localhost:5173](http://localhost:5173)

## Setting linter

1. In Visual Studio Code press Ctrl+Shift+P and type `Restart ESLint server`.
2. Then, press Ctrl+J and open output -> Eslint. If you have any errors after invoke ESlint daemon,
   try reload window (Ctrl+Shift+P, type `Reload window`) or rerun entire Visual Studio Code app.
3. Once ESlint server is running, toggle default formatter to Right Click -> Format Document With -> Configure
   default formatted and choose ESlint (in any .js file).
4. Set Editor: Tab Size - 2
5. Set Select End Of Line Sequence to LF
