# srun-cli
[![](https://badge.fury.io/js/srun.png)](http://npmjs.com/package/srun-cli)
[![](https://img.shields.io/github/issues/lizheming/srun-cli.svg)](https://github.com/lizheming/srun-cli/issues)
[![](https://img.shields.io/github/forks/lizheming/srun-cli.svg)](https://github.com/lizheming/srun-cli/network)
[![](https://img.shields.io/github/stars/lizheming/srun-cli.svg)](https://github.com/lizheming/srun-cli/stargazers)
[![Dependency Status](https://david-dm.org/lizheming/srun-cli.svg)](https://david-dm.org/lizheming/srun-cli)

[![](https://nodei.co/npm/srun-cli.png?downloads=true&stars=true)](http://npmjs.com/package/srun-cli)

深澜命令行版客户端

## 安装

`npm install -g srun-cli`

### 注意

0. 使用之前需要确保有 nodejs 环境，如果没有请上 http://nodejs.org 下载安装
1. 默认认证服务器配置为中国地质大学(北京)的服务器地址，如果是其他学校使用需要使用 `srun config set server [服务器地址]` 命令修改服务器地址。

## 使用方法 

1. 登录: `srun login -u [学号] -p`
2. 注销: `srun logout -u [学号] -p`
3. 强制注销: `srun logout -f`
4. 查看登陆账号: `srun who`
5. 查看配置: `srun config ls`
6. 更多相关命令请查看 `srun help`

## 如何升级版本

`npm update -g srun-cli`

## 界面预览

![](https://raw.githubusercontent.com/lizheming/srun-cli/master/example/screenshot.png)

## License

[GPL](https://github.com/lizheming/srun-cli/blob/master/LICENSE)