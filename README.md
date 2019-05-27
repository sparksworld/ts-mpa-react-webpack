# ts-mpa-react-webpack
使用webpack4构建, 支持react + ts语法的多页面打包工具(当然不用react + tsx,同样可以用)


### 已完成功能
- 支持ts语法
- 支持多页面编译打包
- 增加autoprefixer自动添加前缀
- 支持scss语法
- 代码优化分割
- 开启多进程打包
- 美化控制台输出样式
- 使用pug语法
- 支持静态资源文件夹 

`2019-05-21 13:00`
- 添加命令行控制编译和输出目录  

    - 使用```cross-var```做平台之间的兼容处理
    - 使用`npm run dev/build -- --dt <pages目录下的文件名> `,即可按需`编译/打包`运行 

    ----
    > 如： `npm run dev -- --dt detail-page` 

    > 如果不传递参数，默认全量`编译/打包`

`2019-05-21 22:04`
- 添加环境变量，区分生产和编译环境 

    - 利用webpack函数方程获取mode，传递变量给pug模板，实现生产和编译的区分
    ----
    > 在```index.pug```中，获取编译环境请用`htmlWebpackPlugin.options.mode`


### 未完成功能
- 命令行一键编译上传oss

> 使用中若遇到问题，请发邮件到[228436652@qq.com](https://mail.qq.com/),谢谢
