const {
  publishTrendImg,
  getTrends
} = require("../model/userInfo")
const fs = require('fs');
const path = require('path'); // 引入 path 模块
const jwt = require('jsonwebtoken');
// 上传动态图片
module.exports.trendsImgs = async (ctx, next) => {
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
    const folderPath = path.join(global.__rootdir, 'images/trends');

    // 确保文件夹存在
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // 生成唯一的文件名
    const fileName = `image_${Date.now()}.${fileExtension}`;
    const filePath = path.join(folderPath, fileName);

    // 将数据写入文件
    fs.writeFileSync(filePath, dataBuffer);

    ctx.status = 200;
    ctx.body ={ src: `http://localhost:3000/images/trends/${fileName}`};
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }

}
module.exports.publishTrend = async (ctx, next) => {
  const data = ctx.request.body
  const token = ctx.header.authorization; // 从请求头获取Token
  if (token) {
    try {
      // 解析Token，获取用户信息
      const decoded = jwt.verify(token, "yanyulong");
      console.log(decoded);
      ctx.state.user = decoded;
    } catch (error) {
      ctx.throw(401, 'Invalid Token');
    }
  }
  const result = await publishTrendImg(data)
  ctx.body = {
    status: 200
  }
}

module.exports.getTrendList = async (ctx, next) => {
  try {
    const data = ctx.query
    const result = await getTrends(data)
    result.forEach(element => {
      element.imgs = element.imgs.length > 0 ? element.imgs.split(",") : []
    });
    ctx.body = {
      status:200,
      result
    }
  } catch (error) {
    ctx.throw(401, 'Invalid Token');
  }
  
}


