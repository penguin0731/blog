# 搭建 monorepo 工程

搭建 monorepo 工程的方案有三种：

- lerna：[https://lerna.js.org/](https://gitee.com/link?target=https%3A%2F%2Flerna.js.org%2F)
- yarn
- pnpm

这里我们采用更加简单方便的方案：pnpm。

## 初始化

创建名为 `monorepo`的目录，在该目录下打开终端进行初始化：

```shell
pnpm init
```

创建 `pnpm-workspace.yaml`文件，这是每个 monorepo 工程目录下必须有的文件，用来定义哪些目录被包含在工作区，工作区中的目录可以互相引用。

`pnpm-workspace.yaml`文件内容如下：

```yaml
packages:
  - 'components/*'
  - 'utils/*'
  - 'projects/*'
```

## 安装全局依赖

接下来我们要安装 monorepo 工程的全局依赖，这是工作区中所有项目都可以使用的。

### 安装 typescript

```
pnpm add typescript -D -w
```

-w 表示在工作区的根目录，即`monorepo`目录中运行。

### 安装测试工具

```shell
pnpm add jest jest-environment-jsdom @types/jest -D -w
```

为了能够让 jest 识别 ts 文件，我们还需要安装如下的两个依赖：

```shell
pnpm add ts-jest ts-node -D -w
```

### 安装 Rollup 打包工具

```shell
pnpm add rollup rollup-plugin-typescript2 @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-json @rollup/plugin-babel @babel/preset-env -D -w
```

## 编写工具

在 utils 目录中创建 my-tools 目录并初始化，然后编写代码：

```typescript
// src/sum.ts
export function sum(a:number, b:number):number {
  return a + b;
}
```

```typescript
// src/sub.ts
export function sub(a:number, b:number):number {
  return a - b;
}
```

```typescript
// src/index.ts
export * from "./sum.js";
export * from "./sub.js";
```

## 测试工具

在 my-tools 目录中创建 tests 目录，然后编写测试代码：

```js
// tests/sum.test.js
import { sum } from "../src/sum";

test("测试sum方法", () => {
  const result = sum(10, 3);
  expect(result).toBe(13);
});
```

```js
// tests/sub.test.js
import { sub } from "../src/sub";

test("测试sub方法", () => {
  const result = sub(10, 3);
  expect(result).toBe(7);
});
```

生成 jest 的配置文件 `jest.config.ts`：

```shell
npx jest --init
```

并把 `jest.config.ts`里面的 preset 设置为 `"ts-jest"`。

上面的配置文件配置后了，我们可以看到 `package.json` 中 scripts 的 test 命令已经变为 jest 了，执行 `pnpm test` 即可执行测试流程，理论上来讲 jest 跑测试这一块就能够跑的通了，但是还会提示你让你创建一个 ts 的配置文件：

```shell
npx tsc --init
```

这里我们修改了如下的配置：

- compilerOptions.target："ES6"
- compilerOptions.module："ES6"
- compilerOptions.declaration: true
- compilerOptions.declarationDir: "./dist/types"
- include：["./src"]

## 打包工具

在 my-tools 目录中创建 `rollup.config.js` 文件，配置如下：

```js
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

export default [
  // CommonJS
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // ESM
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // Browser-compatible
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.browser.js",
      format: "iife",
      name: "jsTools",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
      babel({
        exclude: "node_modules/**",
        extensions,
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
        ],
      }),
    ],
  },
];
```

在 `package.json`的 scripts 中配置命令 `"build": "rollup -c"`，执行 `pnpm build`即可打包。另外我们还需要修改`package.json`文件，这是对我们整个 my-tools 包的说明文件，重点的配置项目如下：

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "type": "module",
  "types": "dist/types/index.d.ts",
  "exports" : {
     "require": "./dist/index.cjs",
     "import": "./dist/index.js"
  }
}
```

## 引用工具

在 projects 目录中创建 my-project 目录并初始化，然后安装刚才写好的 my-tools 包：

```shell
pnpm add my-tools -w --filter my-project
```

--filter 表示要选择一个精确的包，这里指定的包就是 my-project

然后我们看一下 my-project 的 `package.json`文件，可以看到 my-tools 已经安装到 my-project 中了，并且是来自于工作区的。

```json
{
	"dependencies": {
    "my-tools": "workspace:^"
  }
}
```

在 my-project 目录中创建 `index.ts` 文件来使用 my-tools 的工具函数：

```typescript
// src/index.ts
import { sum, sub } from "my-tools";

console.log(sum(10, 3));
console.log(sub(10, 3));
```

接着生成 ts 的配置文件：

```shell
npx tsc --init
```

在 ts 的配置文件里指定输出目录

```json
{
	"compilerOptions": {
		"outDir": "./dist"
	}
}
```

编写 scripts 命令：

```json
{
	"scripts": {
		"start": "tsc && node ./dist/index.js"
	}
}
```

执行 `pnpm start`即可看到输出结果。