import { CircularProgress, circularProgressClasses, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import ErrorComponent from "../../components/ErrorComponent";
import Layout from "../../components/Layout";
import useFetchData from "../../hooks/useFetchData";
import axios from "../../lib/axiosSettings";
import conversionDateTime from "../../lib/conversionDateTime";

const NotActiveThread = ({ thread }: { thread: thread }) => {
  const url = `/post/count/${thread.id}`;
  const { data, error } = useFetchData<string>(url);
  return (
    <>
      {
        (data !== null) ?
          (
            <Box >
              <Link href={`/threads/${thread.id}`}>
                <a>{conversionDateTime(thread.createdAt)} {thread.title} ({data}) </a>
              </Link>
            </Box>
          )
          : error ? (<ErrorComponent error={error}></ErrorComponent>)
            : (<CircularProgress></CircularProgress>)
      }
    </>
  );
};

const NotActive = () => {
  const [pageCount, setPageCount] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const url = `/threads/not-active/${page}`;
  const { data, error } = useFetchData<thread[]>(url);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    type page = {
      pages: number
    };
    const featchPageCount = async () => {
      const { data } = await axios.get<page>("/threads/count/not-active");
      setPageCount(data.pages);
    };
    featchPageCount();
  }, []);

  return (
    <Layout title="過去ログ">
      <h2>過去ログ一覧</h2>
      {
        data ? (
          <>
            <Box sx={{ minHeight: '38rem' }}>
              {
                data.map((item, key) => {
                  return (
                    <NotActiveThread thread={item} key={key}></NotActiveThread>
                  );
                }
                )
              }
            </Box>
            <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
            </Box>
          </>
        ) : error ? <ErrorComponent></ErrorComponent>
        : <CircularProgress></CircularProgress>
      }
    </Layout >
  );
};

export default NotActive;
