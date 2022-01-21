## 启动数据库

- 创建容器

```bash
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

- 进入容器

```bash
docker ps
docker exec -it [CONTAINER_ID] bash
```

- 进入 PostgreSQL

```bash
psql -U blog
```

- PostgreSQL 命令

```sql
-- 创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
-- 连接数据库
\c blog_development
-- 展示表
\dt
-- 展示数据
select * from users;
```

- 创建数据

```bash
# 数据迁移运行
yarn migration:run
# 运行项目开发环境
yarn dev
# 数据填充
node dist/seed.js
```

## 阿里云部署

- Docker 命令

```bash
# build app image
docker build . -t winter/node-web-app
# create app container
docker run --network=host -p 3000:3000 -d winter/node-web-app
# create pgsql container
docker run --network=host -v /home/winter/blog-data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

- 上传 SSH

```bash
ssh-copy-id root@mars
```

- 自动部署

```bash
ssh winter@mars "sh /home/winter/app/bin/deploy.sh"
ssh winter@mars 'bash -s' < bin/deploy.sh
```
