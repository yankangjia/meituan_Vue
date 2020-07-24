# 美团外卖项目
### 使用Vue开发开发的移动端美团外卖平台
[点击此处预览www.ykjzone.com:8000](http://www.ykjzone.com:8000)

## 开发环境
### 1. node环境配置
+ #### 首先下载安装nvm   https://github.com/coreybutler/nvm-windows/releases
+ #### 打开命令行，切换至项目目录
```
nvm install 10.16.0
nvm use 10.16.0
npm install
```

### 2. 安装vue-cli
#### ```vue-cli```是和```vue```进行深度组合的工具，可以快速帮我们创建```vue```项目，并且把一些脚手架相关的代码给我```
```npm install -g @vue/cli```

### 3. 安装sass
众所周知，css不是一门编程语言。他没法像js和python那样拥有逻辑处理的能力，甚至导入其他的css文件中的样式都做不到。而Sass就是为了解决css的这些问题。他它允许你使用变量、嵌套规则、 mixins、导入等众多功能，并且完全兼容css语法。Sass文件不能直接被网页所识别，写完Sass后，还需要专门的工具转化为css才能使用。
```
npm install node-sass@4.12.0 --save-dev
npm install sass-loader@7.0.3 --save-dev
```

### 4. 运行
在命令行进入到项目路径，运行```npm run serve```即可
