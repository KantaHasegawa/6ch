import { Box, CircularProgress, Tooltip } from '@mui/material';
import Link from 'next/link';
import useFetchData from '../hooks/useFetchData';
import conversionDateTime from '../lib/conversionDateTime';
import ErrorComponent from './ErrorComponent';
import ThreadForm from './Forms/ThreadForm';

const Thread = ({ thread }: { thread: thread }) => {
  const url = `/post/count/${thread.id}`;
  const { data, error } = useFetchData<string>(url);
  return (
    <>
      {
        (data !== null) ?
          (
            <Box sx={{ margin: "1rem", backgroundColor: "#F5F5F5" }}>
              <Box sx={{ paddingLeft: "0.5rem", paddingTop: "1px" }}>
                <Tooltip title="スレッド詳細へ移動" placement="top" followCursor>
                  <div style={{ display: 'inline' }}>
                    <Link href={`/threads/${thread.id}`}>
                      <a style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{thread.title} ({data})</a>
                    </Link>
                  </div>
                </Tooltip>
                <p>{conversionDateTime(thread.createdAt)}</p>
              </Box>

            </Box>
          )
          : error ? (<ErrorComponent error={error}></ErrorComponent>)
            : (<CircularProgress></CircularProgress>)
      }
    </>
  );
};

const Threads = () => {
  const url = "/threads";
  const { data, error } = useFetchData<thread[]>(url);
  return (
    <Box>
      <Box sx={{ textAlign: "center", padding: "1rem" }}>
        <ThreadForm></ThreadForm>
      </Box>
      {
        (data) ? (
          <>
            {
              data.map((item, i) => {
                return (
                  <Thread thread={item} key={i}></Thread>
                );
              })
            }
          </>
        )
          : error ? (<ErrorComponent error={error}></ErrorComponent>)
            : (<CircularProgress></CircularProgress>)
      }
      <Box sx={{ textAlign: "center", padding: "1rem" }}>
        <ThreadForm></ThreadForm>
      </Box>
    </Box>
  );
};

export default Threads;
