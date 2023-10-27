const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');

const pathServer = path.resolve(__dirname).split(path.sep);
const pathRoot = pathServer.slice(0, pathServer.length - 2).join(path.sep);

app.use(koaStatic(path.join(pathRoot, 'dist')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

router.post('/', async (ctx, next) => {
  const bodyRequest = ctx.request.body;
  const errors = {};
  for (const key in bodyRequest) {
    if (bodyRequest.hasOwnProperty(key)) {
      if (bodyRequest[key].length < 30) {
        errors[key] = `Недопустимые данные, длина должна быть больше 30 символов`;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      fields: errors,
    };
    return;
  }

  ctx.body = {
    status: 'success',
    msg: 'Ваша заявка успешно отправлена!',
  };
  ctx.status = 200;
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
