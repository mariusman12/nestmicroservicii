import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ReservetionsModule } from './reservetions.module';
import {Logger} from 'nestjs-pino'
import { ConfigService } from '@nestjs/config';
import * as  cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(ReservetionsModule);

  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.useLogger(app.get(Logger))
  app.use(cookieParser())
  const configService= app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();


/* 

const api = new WooCommerceRestApi({
  url: "https://shop.mstar.ro",
  consumerKey: "ck_25d5fe7bb3c97d435721b59991e39ee78be3dc74",
  consumerSecret: "cs_c890bd0e6944466efdae1126f570641c62fca821",
  version: "wc/v3"
});


const username = 'serverbackend';
const password = 'GenerareParola@2023@2121@22';


const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

const newUser = {
  username: 'newuser2322',
  email: 'newuser2322@example.com',
  password: 'a_strong_password',
  roles: ["subscriber"],
  is_super_admin: false
};

axios.post('https://magazin.innovativesharks.ro/wp-json/wp/v2/users', newUser, {
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log('________________________________')
  console.log('________________________________')
  console.log('________________________________')
  console.log('________________________________')
  console.log('User created:', response.data);
  console.log('________________________________')
  console.log('________________________________')
  console.log('________________________________')
})
.catch(error => {
  console.error('Error creating user:', error);
});


app.get("/wocomerceapi", (req, res) => {
  api.get("products/categories")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
});

*/