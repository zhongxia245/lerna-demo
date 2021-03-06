# lerna 快速入门（二）ChangeLog

在现实开发中我们经常碰到一个老大难的问题就是 `changelog` 的梳理，在 `lerna` 中提供了一个非常有用的 `lerna-changelog` 的库，在一定的规范开发下会使得这个问题解决起来非常方便，在这边以这个仓库为例我给大家大概讲解下如何使用。

### STEP 1:

```
yarn add lerna-changelog -D
```

### STEP 2:

修改 lerna.json

```json
"changelog": {
  "repo": "zhongxia245/lerna-demo",
  "labels": {
    "feature":"Add Feature",
    "bug": ":bug fix",
    "enhancement": "Enhancement"
  },
  "cacheDir": ".changelog"
}
```

repo 如果不填的话，会自动去拿 `package.json` 里面的，但是很可能就报错了，因此最好写上去。

注意： `labels` 的 `key` 必须在 `github` 里面定义好了。
可以通过以下链接 `https://github.com/zhongxia245/lerna-demo/labels` 来进行 `labels` 的创建，接下来我在 `github` 上分别新增 `feature` 和 `bug`

### STEP 3:

因为生成 changlog 需要有操作 github 仓库的权限，因此需要 设置 GITHUB_AUTH 变量

```bash
export `GITHUB_AUTH` = 'xxxx'
```

如果没有 `GITHUB_AUTH`, 可以去 `https://github.com/settings/tokens` 这里申请

如果经常使用，则可以把 `GITHUB_AUTH` 写到 ~/.bash_profile

```bash
vim ~/.bash_profile
export GITHUB_AUTH = 'xxxx'

## 退出保存
source ~/.bash_profile
```

## 实践出真知

```bash
# 切出一个分支
git checkout -b feature/changlog

## 修改一些东西

# 提交分支,然后创建一个 PR ， merge 到 master 分支
git commit -am 'feature: add changelog , fixed #9'

git push
```

![](https://i.loli.net/2018/11/14/5bebec88a10ff.png)

> 注意： `Labels` 必须选 `lerna.json` 中 `labels`配置的值,否则无法生成日志。表现就是，运行 `lerna-changelog` 没有返回内容。

PR 合并到 master 后， 本地切换分支到 master 。 
```bash
#执行 lerna-changelog
node_modules/.bin/lerna-changelog

## Unreleased (2018-11-14)

#### New Feature
* [#9](https://github.com/zhongxia245/lerna-demo/pull/9) feature: add changelog , Closes [#6](https://github.com/zhongxia245/lerna-demo/issues/6) ([@zhongxia245](https://github.com/zhongxia245))

#### Committers: 1
- zhongxia ([@zhongxia245](https://github.com/zhongxia245))

# 顺便在 .gitignore 忽略 .changelog 文件夹
# .gitignore
+ .changelog

# 发布 npm 包
lerna publish

## 发布完后，把刚才生成的 changelog 复制到 release-note 里面去。 【不知道能不能自动在创建 release 的 note 去，而不用自己加。。。。】

```








## 参考文章

这个教程很详细，可以看这里。
[Lerna 教程](https://juejin.im/entry/586f00bc128fe100580a6f78)
