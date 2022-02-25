import { Box, CircularProgress } from "@mui/material";
import ErrorComponent from "../../components/ErrorComponent";
import PostForm from "../../components/Forms/PostForm";
import Layout from '../../components/Layout';
import Posts from '../../components/Posts';
import useFetchData from "../../hooks/useFetchData";
import { getAllThreadIds, getThreadData } from '../../lib/threadLibrary';

type threadData = {
  id: string,
  thread: thread
}

const PostCount = ({ thread }: { thread: thread }) => {
  const url = `/post/count/${thread.id}`;
  const { data, error } = useFetchData<string>(url);
  return (
    <>
      {
        data ? (<span style={{ fontWeight: 'bold', fontSize: "1.5rem" }} >{` (${data})`}</span>)
          : error ? <ErrorComponent></ErrorComponent>
            : <CircularProgress></CircularProgress>
      }
    </>
  );
};

const Form = ({ thread }: { thread: thread }) => {
  const url = `/thread/${thread.id}`;
  const { data, error } = useFetchData<thread>(url);
  return (
    <>
      {
        data ? (
          <>
            {data.active ? <PostForm threadId={data.id}></PostForm>
              : (<Box color='white'
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#F4909D',
                  padding: '0.5rem',
                  margin: '1rem',
                  borderRadius: '50px',
                }}>
                <p>このスレッドは過去ログに格納されています</p>
              </Box>)
            }
          </>
        ) :
          error ? <ErrorComponent></ErrorComponent>
            : <CircularProgress></CircularProgress>
      }
    </>
  );
};

export default function Thread({ threadData }: { threadData: threadData | undefined }) {
  return (
    <>
      {
        (threadData) ?
          <Layout title="スレッド詳細">
            <span style={{ fontWeight: 'bold', fontSize: "1.5rem" }}>{threadData.thread.title}</span>
            <PostCount thread={threadData.thread}></PostCount>
            {!threadData.thread.active ? (
              <Box color='white'
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#F4909D',
                  padding: '0.5rem',
                  margin: '1rem',
                  borderRadius: '50px',
                }}>
                <p>このスレッドは過去ログに格納されています</p>
              </Box>
            ) : null}
            <Posts threadId={threadData.thread.id}></Posts>
            <Box sx={{ textAlign: "center", padding: "1rem" }}>
              <Form thread={threadData.thread}></Form>
            </Box>
          </Layout>
          : null
      }
    </>
  );
}

export async function getStaticProps({ params }: { params: pathParams }) {
  const threadData = await getThreadData(params.id);
  if (!threadData?.thread) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        threadData
      }
    };
  }
}

export async function getStaticPaths() {
  const paths = await getAllThreadIds();
  return {
    paths,
    fallback: true
  };
}
