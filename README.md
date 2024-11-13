This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
react-markdown 插件
remark-gfm 插件支持更多语法
react-syntax-highlighter 代码高亮

prisma 把消息数据保存到数据库中
https://www.prisma.io/

<!-- 安装中开发中 -->

npm install prisma --save-dev

<!-- 初始化 -->

npx prisma init

<!-- 安装prisma插件  -->

<!-- 定义模型 -->

<!-- 根据命令生成数据库跟表 -->

npx prisma migrate dev --name init

<!-- 查看数据文件命令 -->

sqlite3 prisma/chatgpt-app.sqlite

<!-- 查看表 -->

.table

<!-- 查看表结构 -->

.schema Chat

<!--js中真正操作的库  生成 prisma client -->

npm i @prisma/client

<!-- 运行项目 -->

npx prisma generate

npx prisma studio

<!-- 安装azure openai -->

npm azure openai
https://www.npmjs.com/package/@azure/openai

注册账号，然后进行免费使用，目前为实现
