import Link from 'next/link';
import { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

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
        第 {pageNum} / {pageTotal} 页
      </span>
      <span>
        {pageNum > 1 && (
          <Link href={urlMaker(pageNum - 1)}>
            <PageNumber>上一页</PageNumber>
          </Link>
        )}
        {pageList.map((page) => (
          <Link key={page} href={urlMaker(page)}>
            <PageNumber
              style={
                pageNum === page ? { color: 'dodgerblue' } : { color: '#333' }
              }
            >
              {page}
            </PageNumber>
          </Link>
        ))}
        {pageNum < pageTotal && (
          <Link href={urlMaker(pageNum + 1)}>
            <PageNumber>下一页</PageNumber>
          </Link>
        )}
      </span>
    </footer>
  );
};

export default memo(Pagination);

export const PageNumber = styled.a`
  padding: 4px;
  margin: 0 4px;
  cursor: pointer;
  &:hover {
    color: dodgerblue;
  }
`;
