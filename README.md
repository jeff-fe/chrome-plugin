# Chrome 扩展：白名单限制

## 功能

- 限制网站访问的白名单管理
- 阻止白名单外的网站访问，并跳转至 blocked.html
- 在 popup 中添加和删除白名单网站
- 在 action 上显示被阻止的网站数量

## 使用方法

1. 下载或克隆本项目
2. 在 Chrome 中加载扩展
3. 在 popup 中添加或删除白名单网站
4. 访问白名单外的网站，将被阻止并跳转至 blocked.html

## 注意

- 由于 Chrome 的限制，无法直接在 popup 中打开 blocked.html，因此访问被阻止时，会显示 blocked.html 的页面，并提示在 popup 中添加该网站
