import { getAccessToken } from '../server/oauth';
import { request, summary, tags } from 'koa-swagger-decorator';
const tag = tags(['Oauth']);

export default class Oauth {

  @request('GET', '/oauth/token')
  @summary('获取access_token')
  @tag
  static async token(ctx) {
    const result = await getAccessToken();
    ctx.body = result;
  }
}
