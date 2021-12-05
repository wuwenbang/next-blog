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

- 创建数据库

```sql
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```
