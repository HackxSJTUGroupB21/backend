import multer from 'koa-multer';
import _path from 'path';
import Doc from 'koa-swagger-decorator';
import config from '../config';
import User from 'models/user';

const {
  request, summary, tags, formData, middlewares, responses, query
} = Doc;


function getFileUrl(filename) {
  return `${config.baseUrl}/temp/${filename}`;
}
const tag = tags(['File']);

const storage = multer.diskStorage({
  destination: _path.resolve('temp/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });
export default class FileRouter {
  @request('post', '/file')
  @summary('上传文件接口')
  @tag
  @formData({
    file: { type: 'file', description: 'upload file, get url' }
  })
  @middlewares([upload.single('file')])
  @responses({
    200:
    { description: 'file upload success' },
    500:
    { description: 'something wrong about server' }
  })
  static async upload(ctx) {
    const { file } = ctx.req;
    file.url = getFileUrl(file.filename);
    ctx.body = { result: file };
  }

  @request('post', '/avatar')
  @summary('上传头像')
  @tag
  @query({
    avatarUrl: { type: 'string', description: '头像图片url' }
  })
  @responses({
    200:
    { description: 'file upload success' },
    500:
    { description: 'something wrong about server' }
  })
  static async updateAvatar(ctx) {
    const { avatarUrl } = ctx.req;
    const userId = ctx.user._id;
    const user = await User.findById(userId);
    user.avatarUrl = avatarUrl;
    const result = await user.save();
    ctx.body = { result };
  }
}