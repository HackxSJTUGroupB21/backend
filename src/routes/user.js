import sha1 from 'sha1';

import User from 'models/user';
import exception from 'class/exception';

import { calculateToken } from 'server/user';
import { request, summary, body, tags } from 'koa-swagger-decorator';

const tag = tags(['User']);
const userSchema = {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
};

export default class UserRouter {
  @request('POST', '/user/register')
  @summary('注册用户')
  @tag
  @body(userSchema)
  static async register(ctx) {
    const { name, password, keyword } = ctx.validatedBody;
    let user = await User.findOne({ name });
    if (user) throw new exception.ForbiddenError('name exsited');

    user = await User.create({
      name,
      passwordHash: sha1(password),
      token: calculateToken(),
      keyword,
    });

    ctx.body = user;
  }

  @request('post', '/user/login')
  @summary('用户登录')
  @tag
  @body({ name: { type: 'string', required: true },
  password: { type: 'string', required: true } })
  static async login(ctx) {
    const { name, password } = ctx.validatedBody;

    const user = await User.findOne({ name, passwordHash: sha1(password) });
    if (!user) throw new exception.ForbiddenError('wrong username or password');

    ctx.body = user;
  }

  @request('get', '/user')
  @summary('用户列表')
  @tag
  static async getAll(ctx) {
    const users = await User.find();
    ctx.body = { users };
  }
}

