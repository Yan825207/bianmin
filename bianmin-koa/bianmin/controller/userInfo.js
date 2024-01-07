const {
  Login,
  Register
} = require("../model/userInfo")
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path'); // 引入 path 模块
// 登录
module.exports.login = async (ctx, next) => {
  let data = ctx.request.body // 获取post参数
  const {
    username,
    phone,
  } = data
  const user = {
    username,
    phone
  }
  const result = await Login(data)
  console.log(result, 'result');
  // 生成token
  const token = jwt.sign(user, 'yanyulong', { expiresIn: '24h' });
  // 将token设置在响应头中
  ctx.set('Authorization', `Bearer ${token}`);
  let status = result.length ? 200 : 400
  ctx.body = {
    status: status,
    result,
    token: token
  }

}
// 注册
module.exports.register = async (ctx, next) => {
  let data = ctx.request.body // 获取post参数
  const result = await Register(data)
  const {
    username,
    phone,
  } = data
  const user = {
    username,
    phone,
    id:result.id
  }

  // 生成token
  const token = jwt.sign(user, 'yanyulong', { expiresIn: '24h' });
  console.log(token);
  // 将token设置在响应头中
  ctx.set('Authorization', `Bearer ${token}`);
  if (result.code == 200) {
    let ctx = {
      body:{}
    }
    console.log(token);
    ctx.status = 200
    ctx.body.token = token
  } else {
    ctx.status = 500
  }
  ctx.body = result
}

// 上传头像
module.exports.uploadUserAvatar = async (ctx, next) => {
  try {
    const base64Image = ctx.request.body.path;

    const matches = base64Image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      ctx.status = 400;
      ctx.body = "Invalid Base64 image format";
      return;
    }

    const fileExtension = matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    // 设置存储图片的文件夹路径
    const folderPath = path.join(global.__rootdir, 'images/avatar');

    // 确保文件夹存在
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // 生成唯一的文件名
    const fileName = `image_${Date.now()}.${fileExtension}`;
    const filePath = path.join(folderPath, fileName);

    // 将数据写入文件
    fs.writeFileSync(filePath, dataBuffer);
    console.log(filePath, dataBuffer, folderPath);

    ctx.status = 200;
    ctx.body = `http://localhost:3000/images/avatar/${fileName}`;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }

}
