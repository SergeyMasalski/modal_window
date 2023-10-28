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
      const responseKey = 'input' + key[0].toUpperCase() + key.slice(1);

      switch (key) {
        case 'name':
          if (bodyRequest[key].length < 2) errors[responseKey] = `Недопустимые данные, длина должна не меньше 2 символов`;
          break;
        case 'phone':
          if (bodyRequest[key].includes('_')) errors[responseKey] = `Заполните телефон полностью`;
          break;
        case 'email':
          if (bodyRequest[key].length < 10) errors[responseKey] = `Недопустимые данные, длина должна не меньше 10 символов`;
          break;
        case 'message':
          if (bodyRequest[key].length < 2) errors[responseKey] = `Недопустимые данные, длина должна не меньше 2 символов`;
          break;

        default:
          break;
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
