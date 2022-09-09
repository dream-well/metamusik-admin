import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TableCard from "../TableCard";

export default function GraphTable({title, cols, query, searchParams}) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [{searchBy, searchText}, setFilter] = useState({});
  const filter = searchBy ? { [searchBy] : searchText } : {};
  console.log(filter);
  const { error, loading, data, previousData } = useQuery( query({searchBy, searchText}), {
    variables: {
      page: page,
      perPage: perPage,
      filter
    }
  } );

  const onPrev=() => {
    setPage(Math.max(page-1, 0))
  }

  const onNext = () => {
    const maxPage = Math.ceil((data?.metadata.count ?? 0) / perPage) - 1;
    setPage(Math.min(page+1, maxPage))
  }

  useEffect(() => {
    console.log(data);
  }, [data])
  return (
      <TableCard 
        rows={data?.data ?? []} cols={cols} className="w-full" title={title}
        page={page}
        perPage={perPage}
        total={!loading ? (data?.metadata.count ?? 0) : (previousData?.metadata.count ?? 0)}
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
