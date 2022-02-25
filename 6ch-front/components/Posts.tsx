import { CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useFetchData from "../hooks/useFetchData";
import conversionDateTime from "../lib/conversionDateTime";
import ErrorComponent from "./ErrorComponent";

const Post = ({ post, index }: { post: post, index: number }) => {
  return (
    <Box sx={{ margin: "0.5rem", backgroundColor: "#F5F5F5" }}>
      <Box sx={{padding: "0.3rem"}}>
        <span style={{fontSize: '1.1rem' }}>{index}</span>
        <span style={{ fontSize: '0.9rem', marginLeft: "0.3rem" }}>{post.userName}</span>
        <Typography sx={{ margin: '0.3rem' , whiteSpace: "pre-wrap"}}>{post.content}</Typography>
        <span style={{ fontSize: '0.9rem' }}>{conversionDateTime(post.createdAt)}</span>
      </Box>
    </Box>
  );
};

const Posts = ({ threadId }: { threadId: number }) => {
  const { data, error } = useFetchData<post[]>(`/posts/${threadId}`);
  return (
    <Box>
      {
        (data) ?
          (
            <Box>
              {
                data.map((item, key) => {
                  return (
                    <Post post={item} index={key + 1} key={key}></Post>
                  );
                })
              }
            </Box>
          ) : error ? <ErrorComponent error={error}></ErrorComponent>
            : <CircularProgress></CircularProgress>
      }
    </Box>
  );
};

export default Posts;
