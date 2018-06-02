
import { request, summary, tags, query } from 'koa-swagger-decorator';
import { speech_to_text } from '../utils/speechToText';
import rp from 'request-promise';

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
  @summary('生成各种表情的头像')
  @tag
  @query({ avatarName: { type: 'string', description: '头像文件名' } })
  static async generate(ctx) {
    const classes = ['angry', 'contemptuous', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
    const result = {};
    classes.forEach(c => {
      result[c] = 'example img url';
    });
    ctx.body = { result };
  }

  @request('GET', '/avatars')
  @summary('获取各种表情的头像')
  @tag
  static async getAvata(ctx) {
    const classes = ['angry', 'contemptuous', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
    const result = {};
    classes.forEach(c => {
      result[c] = 'example img url';
    });
    ctx.body = { result };
  }
}

