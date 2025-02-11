<br>
<h1 align="center">FreeIMUI</h1>

<p align="center">基于Vue3.0实现的IM聊天组件，Typescript类型支持</p>

<p align="center">
  <a href="https://www.npmjs.com/package/free-imui">
    <img src="https://img.shields.io/badge/-v0.1.26-ff69b4" alt="NPM version" />
  </a>
</p>

<p align="center">
  <a href="https://moonholder.github.io/free-imui/">🧑‍💻 Interactive Docs <sup>Beta</sup></a>
</p>

<br>

## 特性

- 不依赖任何第三方组件库
- Typescript类型支持
- 可任意扩展聊天消息类型

<br>

## 安装

### vite

```bash
npm i -S free-imui-neo
```

```ts
// main.js or main.ts
import FreeIMUI from 'free-imui-neo'
import 'free-imui-neo/dist/index.css'

const app = createApp(App)

app.use(freeIMUI)

app.mount('#app')
```

```vue
<template>
  <free-im :userInfo="userInfo" ref="freeIM" />
</template>

<script setup lang="ts">
//当前登录人
const userInfo = {
  id: '66',
  nickname: '',
  avatar: '',
}
</script>
```

## License

[MIT](./LICENSE) License &copy; 2022-PRESENT [King](https://github.com/kinggq)
