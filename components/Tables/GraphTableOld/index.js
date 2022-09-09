import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TableCard from "../TableCard";

export default function GraphTableOld({title, cols, query, searchParams}) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [{searchBy, searchText}, setFilter] = useState({});
  const filter = searchBy ? { [searchBy] : searchText } : {};
  console.log(filter);
  const [cursor, setCursor] = useState('');
  const { error, loading, data, previousData } = useQuery( query({searchBy, searchText}), {
    variables: {
      before: 1,
      after: perPage,
      cursor: Buffer.from(Number(page * perPage).toString()).toString('base64'),
      filter
    }
  } );

  const onPrev=() => {
    if(!data?.data.pageInfo.hasPrevPage) return;
    setPage(Math.max(page-1, 0))
    setCursor(data?.data.pageInfo.startCursor);
  }

  const onNext = () => {
    if(data?.data.totalCount != perPage) return;
    setPage(page + 1)
    setCursor(data?.data.pageInfo.endCursor); 
  }

  useEffect(() => {
    console.log(data);
  }, [data])
  return (
      <TableCard 
        rows={data?.data.edges.map(each => each.node) ?? []} cols={cols} className="w-full" title={title}
        page={page}
        perPage={perPage}
        total={''}
        onPrev={onPrev}
        onNext={onNext}
        onChangePerPage={(v) => setPerPage(parseInt(v))}
        isLoading={loading}
        onSearch={({searchBy, searchText}) => {
          console.log("OnSearch", {searchBy, searchText});
          setFilter({searchBy, searchText})
        }}
        searchParams={searchParams}
      />
  )
}
