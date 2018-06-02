# hackx sjtu 相由音生 后端服务


## 本地开发测试

#### 项目分为两部分

- 后端主体使用Node.js为前端提供服务
- 机器学习部分相对独立，使用Flask暴露相关Api供Node.js调用

```
// Node.js开发测试
npm install
npm run start

// Flask开发测试
cd face_gen
python server.py
```

## 项目结构

```
- src                    # 源代码目录
 |- class                # class
   |- exception.js       # 异常处理类
 |- middleware           # 中间件
   |- errorHandle.js     # 错误处理中间件
 |- models               # 数据库模型
 |- routes               # 路由
 |- server               # 针对某一模型的服务，如计算用户的 Token
 |- utils                # 工具
   |- pathCheck.js       # 路径检查
 |- config.js            # 配置文件
 |- db.js                # 数据库连接实例
 |- jsconfig.json        # VSCode 配置文件
 |- main.js              # 入口文件
```