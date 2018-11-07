# 快速入门

[《lerna github》](https://github.com/lerna/lerna#getting-started)

Lerna 是一个优化使用 git 和 npm 管理多包存储库的工作流程的工具。

|  名称     | 概念                  | 存在问题                                                                                                                                | 使用案例                                                                                                                       |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| multirepo | 每个 npm 包一个仓库   | issue 管理混乱,changeLog 难于整合 core-module 更新麻烦                                                                                  | [roolup](https://github.com/rollup)                                                                                            |
| monorepo  | 单代码仓库多个 npm 包 | 使用同一个代码仓库，每个 module 单独发布，但是每次更新后，使用同一个版本号, repo 体积可能会比较大，项目模块多，构建工具需要支持全部模块 | [babel](https://github.com/babel/babel/tree/master/packages) , [React](https://github.com/facebook/react/tree/master/packages) |

## 快速开始

```bash
# 创建项目
git init hoho-lerna && cd hoho-lerna

# 初始化 git 仓库, 后续 lern publish 包的必须条件
git init

# 指定 git 仓库的地址(换成自己的 git 仓库地址)
git remove add origin https://github.com/zhongxia245/lerna-demo.git

# 初始化项目
lerna init

# 创建模块项目
mkdir packages/hoho-lerna-core && cd packages/hoho-lerna-core

# 初始化package.json
npm init -y

# 同上面操作， 创建模块 hoho-lerna-module-a / hoho-lerna-module-b
```

最终大概这样（doc 是为了写这个文档创建的，别在意）

<img src="https://i.loli.net/2018/11/07/5be22816f157d.png" width="200px"/>

## lerna 常用命令

 目前就用到了三个命令`lerna add` , `lerna bootstrap` , `lerna publish`

### 1. lerna add

添加同一个仓库下的模块依赖到 package.json 并且做软链接到 `node_module`

![](https://i.loli.net/2018/11/07/5be22a27758b3.png)

比如：`hoho-lerna-module-a` 依赖模块 `hoho-lerna-core`

```bash
cd packages/hoho-lerna-module-a

# 安装依赖core模块到 module-a
# 不添加 scope，表示默认添加repo 下的所有包里面
lerna add hoho-lerna-core --scope=hoho-lerna-module-a

# 此时 module-a 的 package.json 和 node_module 应该会多出了 hoho-lerna-core
```

### 2. lerna bootstrap

这个命令会自动处理 repo 下，模块的包依赖，然后把依赖包做软链接到模块中的 `node_module`。

**`lerna bootstrap`和 `lerna add` 的区别？**

第一次添加依赖管理后 `lerna add` 后面都用 `lerna bootstrap`

`lerna bootstrap` 只要 package.json 已经有依赖包列表,就可以使用。

```
"dependencies": {
    "hoho-lerna-core": "^0.0.3"
}
```

### 3. lerna publish

把 `packages`下的包分为上传到 npm 仓库去。

```bash
# 上传需要先登录 npm
# 输入帐号，密码，邮箱 （没有的话，去 npmjs 注册一下）
npm login

# 提交代码
git commit -a 'lerna init'
git push

# publish 包
lerna publish
```

`lerna publish` 的大致流程？

1. 本地打 tag (eg:`git tag 0.0.1`)
2. 自动更新依赖包的版本
3. 把各个包发布到 npm
4. 把 tag 和相对应的 commit 给 push 到仓库
