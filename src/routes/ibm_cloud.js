
import { request, summary, tags, query } from 'koa-swagger-decorator';
import { speech_to_text } from '../utils/speechToText';
import rp from 'request-promise';
import User from 'models/user';
import config from 'config';
const tag = tags(['IBM CLOUD']);


export default class IBMRouter {
  @request('GET', '/speechToText')
  @summary('语音转文本')
  @tag
  @query({ audio_name: { type: 'string', description: '音频文件名称' } })
  static async speech(ctx) {
    const { audio_name } = ctx.validatedQuery;
    const result = await speech_to_text(audio_name);
    ctx.body = { result };
  }

  @request('GET', '/analizeText')
  @summary('分析文本情绪')
  @tag
  @query({ text: { type: 'string', description: '文本字符' } })
  static async speech(ctx) {
    ctx.body = { result: 'sad' };
  }

  @request('POST', '/generateAvatars')
  @summary('上传头像, 生成各种表情的头像')
  @tag
  @query({ avatarName: { type: 'string', description: '头像文件名' } })
  static async generate(ctx) {
    const { avatarName } = ctx.query;
    const avatarUrl = `${config.baseUrl}/avatar/${avatarName}`;
    const userId = ctx.user._id;
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { avatarUrl } },
      {
        upsert: true,
        new: true,
      });
    const classes = ['origin', 'angry', 'contemptuous', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
    const result = {};
    classes.forEach((c, idx) => {
      result[c] = `config.baseUr/generated/${ctx.user._id}/${idx + 1}-images.jpg`;
    });
    ctx.body = { result };
  }

  @request('GET', '/avatars')
  @summary('获取各种表情的头像')
  @tag
  static async getAvata(ctx) {
    const classes = ['origin', 'angry', 'contemptuous', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
    const user = await User.findById(ctx.user._id);
    if (!user.avatarUrl) throw new Error('还未上传头像');
    const result = {};
    classes.forEach((c, idx) => {
      result[c] = `${config.baseUrl}/generated/${ctx.user._id}/${idx + 1}-images.jpg`;
    });
    ctx.body = { result };
  }
}

