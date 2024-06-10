# VSCode代码格式化规范
本文使用 prettier 作为代码格式化工具

## 安装

```
npm install --save-dev --save-exact prettier
```

## 配置文件

在项目根目录创建 .prettierrc 文件，内容如下：

```json
{
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "quoteProps": "as-needed",
    "jsxSingleQuote": false,
    "trailingComma": "none",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "avoid",
    "htmlWhitespaceSensitivity": "ignore",
    "endOfLine": "auto"
}
```

## 命令行格式化

添加配置文件后，原本已存在项目的文件不会自动格式化，需要自行批量格式化一次
可以执行以下命令，文件后缀可根据需要调整

```shell
npx prettier --write --config .prettierrc "src/**/*.{js,json,vue,scss,css,md}"
```


