import Router from 'koa-router';

import auth from 'middleware/auth';
import { wrapper } from 'koa-swagger-decorator';

const router = new Router();
wrapper(router);

router.swagger({ title: 'HACKX-SERVER', description: 'API DOC', version: '1.0.0' });
router.use(auth({ excludes: ['/oauth/check', '/oauth/token', '/user/register', '/user/login'] }));
router.mapDir(__dirname);
export default router;
