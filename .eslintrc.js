module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-alert": 0, // 关闭alert 警告
    "no-shadow": 0,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "@typescript-eslint/no-explicit-any": ["off"], // any 类型的警告关闭
    "linebreak-style": [0 , "windows"],
    'max-len' : ["error", {code : 300}], // 解决一行默认100个字符错误
    "global-require": 0, //  Unexpected require() (global-require)
    '@typescript-eslint/no-var-requires': 0, // Require statement not part of import statement (@typescript-eslint/no-var-requires)
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-unused-vars":"off", // 定义了不使用 不警告
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/ban-ts-ignore": "off",
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "error", // for e.returnvalue
          "request", // for Express requests
          "response", // for Express responses
          "config", // axios 的配置修改，添加请求头
          "data",
          "state",
          "pageParamObj",
        ]
      }
    ],

  },
};
