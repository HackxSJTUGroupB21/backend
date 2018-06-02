import multer from 'koa-multer';
import _path from 'path';
import Doc from 'koa-swagger-decorator';
import config from '../config';
import url from 'url';
import qs from 'querystring';
import mkdirp from 'mkdirp';
const {
  request,
  summary,
  tags,
  formData,
  middlewares,
  responses,
  query,
} = Doc;


function getFileUrl(filename, userId) {
  return userId ? `${config.baseUrl}/avatar/${userId}/${filename}` : `${config.baseUrl}/temp/${filename}`;
}
const tag = tags(['File']);

const storage = multer.diskStorage({
  destination: _path.resolve('temp/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const face_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const q = qs.parse(url.parse(req.url).query);
    const dir = _path.resolve(`avatar/${q.userId}`);
    mkdirp.sync(dir);
    return cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, 'avatar.jpg')
});

const upload = multer({
  storage
});
export default class FileRouter {
  @request('post', '/file')
  @summary('上传文件接口')
  @tag
  @formData({
    file: {
      type: 'file',
      description: 'upload file, get url'
    }
  })
  @middlewares([upload.single('file')])
  @responses({
    200: {
      description: 'file upload success'
    },
    500: {
      description: 'something wrong about server'
    }
  })
  static async upload(ctx) {
    const {
      file
    } = ctx.req;
    file.url = getFileUrl(file.filename);
    ctx.body = {
      result: file
    };
  }

  @request('post', '/avatarFile')
  @summary('上传头像接口')
  @tag
  @query({ userId: { type: 'string' } })
  @formData({
    file: {
      type: 'file',
      description: 'upload file, get url'
    }
  })
  @middlewares([multer({ storage: face_storage }).single('file')])
  @responses({
    200: {
      description: 'file upload success'
    },
    500: {
      description: 'something wrong about server'
    }
  })
  static async avatarFileupload(ctx) {
    const {
      file
    } = ctx.req;
    file.url = getFileUrl(file.filename, ctx.user.userId);
    ctx.body = {
      result: file
    };
  }
}
