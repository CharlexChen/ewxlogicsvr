# 使用官方Node.js镜像作为基础镜像，用于运行应用
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制所需文件与目录到工作目录
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY ./dist ./
COPY ./build ./
COPY .env* ./

# 安装依赖
RUN corepack --version && npm install -g corepack && corepack enable && pnpm install --production

# 暴露应用运行的端口
EXPOSE 3010

# 启动NestJS应用
CMD ["pnpm", "run", "start:prod"]