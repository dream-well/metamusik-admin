import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TableCardSearch from "../TableCardSearch";

export default function GraphTable({ title, cols, query, searchParams, onRowClick, orderBy = null }) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [showData, setShowData] = useState([]);
  const [{ searchBy, searchText }, setFilter] = useState({});
  const { error, loading, data, previousData } = useQuery(query({ searchBy, searchText }), {
    variables: {
      page: page,
      perPage: perPage,
    }
  });

  const onPrev = () => {
    setPage(Math.max(page - 1, 0))
  }

  const onNext = () => {
    const maxPage = Math.ceil((data?.metadata.count ?? 0) / perPage) - 1;
    setPage(Math.min(page + 1, maxPage))
  }

  useEffect(() => {
    setShowData(data?.data)
    if (orderBy) {
      // dataCopy.slice().sort(function (a, b) {
      var clone = data?.data.slice().sort(function (a, b) {
        var keyA = new Date(a[orderBy.field]);
        var keyB = new Date(b[orderBy.field]);
        // Compare the 2 dates
        if (orderBy.direction === "ASC") {
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
        } else if (orderBy.direction === "DESC") {
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
        }
        return 0;
      });
      setShowData(clone)
    }
  }, [data])
  return (
    <TableCardSearch
      rows={showData ?? []} cols={cols} className="w-full" title={title}
      page={page}
      perPage={perPage}
      total={!loading ? (data?.metadata.count ?? 0) : (previousData?.metadata.count ?? 0)}
      onPrev={onPrev}
      onNext={onNext}
      onChangePerPage={(v) => setPerPage(parseInt(v))}
      isLoading={loading}
      onSearch={({ searchBy, searchText }) => {
        console.log("OnSearch", { searchBy, searchText });
        setFilter({ searchBy, searchText })
      }}
      searchParams={searchParams}
      onRowClick={onRowClick}
    />
  )
}
