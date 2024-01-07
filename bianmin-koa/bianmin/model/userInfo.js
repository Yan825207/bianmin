const { query } = require("../db/query")
// 登录
module.exports.Login = async (data) => {
  const { name, password } = data
  return await query(`select * from user where username = "${name}" and password = "${password}"`)
}
//  上传动态
module.exports.publishTrendImg = async (data) => {
  const { content, fileList,id} = data
  const imgs = fileList.join(",")
  return await query(`INSERT INTO trend (userId, content, imgs)
  VALUES ('${id}', '${content}', '${imgs}');
  `)
}

// 注册
module.exports.Register = async (data) => {

  const { 
    username,
    age, 
    password,
    avatar = null,
    phone,
    gender=null
   } = data

   const isName =  await query(`SELECT * FROM USER WHERE username = '${username}'`)
   if(isName.length > 0){
     return {
      code:500,
      message:"用户名"+username+"已存在"
     }
   }
  
  const result = await query(`INSERT INTO user (username, age, password, mobile, gender,avatar) VALUES ("${username}", "${age}", "${password}","${phone}", "${gender}","${avatar}")`)
   return{
    code : 200,
    result:result,
    id:result.insertId
   }
}

module.exports.getTrends = async(data)=>{
  const {pageNum ,pageSize} = data
  return await query(`SELECT trend.*, user.username, user.avatar FROM trend JOIN user ON trend.userId = user.id ORDER BY trend.created DESC LIMIT ${(pageNum - 1) * 10},${pageSize};`)
}


 