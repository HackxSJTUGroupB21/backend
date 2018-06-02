import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

import config from 'config';
import db from 'db';
import errorHandle from 'middleware/errorHandle';
import router from 'routes';
import serve from 'koa-static';


db.init();

const app = new Koa();

app
.use(cors())
.use(serve('.'))
.use(bodyParser())
.use(errorHandle())
.use(router.routes())
.use(router.allowedMethods());

app.listen(config.port);
