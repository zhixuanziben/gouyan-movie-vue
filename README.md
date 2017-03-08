# 项目介绍
  这是一个基于vue全家桶制作的在线电影影讯网站，利用豆瓣api的接口获取数据，模仿猫眼电影制作的webapp，实现了当前热映电影，即将上映电影，电影详细信息，短评和长评论信息，影星个人信息，以及电影查询的功能

# 技术栈
  vue + vue-router + vue-resource

# 在线demo
  https://zhixuanziben.github.io/gouyan-demo/dist/index.html#/inTheaters

# 项目git截图
  ![image](https://github.com/zhixuanziben/gouyan-movie-vue/raw/master/gouyan.gif)  

# 运行项目
``` bash
# 克隆整个项目到本地
git clone https://github.com/zhixuanziben/gouyan-movie-vue.git

# 切换到项目所在文件夹
cd gouyan-movie-vue

# 安装依赖
npm install

# 打开浏览器，输入localhost:8080即可访问
npm run dev

# 感谢
  数据的接口调用的是豆瓣电影api(官方)，文档地址：https://developers.douban.com/wiki/?title=movie_v2
  豆瓣电影评论信息接口调用的api(非官方)，github地址：https://github.com/jokermonn/-Api/blob/master/DoubanMovie.md