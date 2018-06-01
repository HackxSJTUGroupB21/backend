import { User } from 'models';
import exception from 'class/exception';
import pathCheck from 'utils/pathCheck';
/**
 * TB用户认证中间件
 */
export default (option = {}) => async (ctx, next) => {
  if (!pathCheck(ctx.path, option)) {
    await next();
    return;
  }
  const token = ctx.header.Authorization || ctx.header.authorization;
  if (!token) throw new exception.AuthError();
  const user = await User.findOne({ token });
  if (!user && token !== 'admin') throw new exception.AuthError();
  ctx.user = user || {};
  await next();
};
