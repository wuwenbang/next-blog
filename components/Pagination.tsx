import Link from 'next/link';
import { FC, memo, useMemo } from 'react';

interface Props {
  pageNum: number;
  pageSize: number;
  count: number;
  urlMaker?: (page: number) => string;
}
const defaultUrlMaker = (n) => `?page=${n}`;
const Pagination: FC<Props> = ({
  pageNum,
  pageSize,
  count,
  urlMaker = defaultUrlMaker,
}) => {
  // 页码总数
  const pageTotal = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [count, pageSize]);
  // 页码列表
  const pageList = useMemo(() => {
    const list: number[] = [];
    for (let i = 1; i <= pageTotal; i++) {
      list.push(i);
    }
    return list;
  }, [pageTotal]);

  return (
    <footer>
      <span>
        共 {count} 篇文章，当前在第 {pageNum} / {pageTotal} 页。
      </span>
      <span>
        {pageNum > 1 && (
          <Link href={urlMaker(pageNum - 1)}>
            <a>上一页</a>
          </Link>
        )}
        {pageList.map((page) => (
          <Link key={page} href={urlMaker(page)}>
            <a style={{ margin: 4, padding: 4 }}>{page}</a>
          </Link>
        ))}
        {pageNum < pageTotal && (
          <Link href={urlMaker(pageNum + 1)}>
            <a>下一页</a>
          </Link>
        )}
      </span>
    </footer>
  );
};

export default memo(Pagination);
