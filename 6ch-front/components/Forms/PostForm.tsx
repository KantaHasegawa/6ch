import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Backdrop, CircularProgress } from '@mui/material/';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import axios from "../../lib/axiosSettings";

const PostForm = ({ threadId }: { threadId: number }) => {
  const { mutate } = useSWRConfig();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const onChangeContent = (event: any) => {
    setContent(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setBackdrop(true);
    const params = {
      userName: username,
      content: content,
      threadId: threadId
    };
    try {
      await axios.post("/post/new", params);
      mutate(`/posts/${threadId}`);
      mutate(`/post/count/${threadId}`);
      mutate(`/thread/${threadId}`);
      enqueueSnackbar("書き込みに成功しました", { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("書き込みに失敗しました", { variant: 'error' });
    } finally {
      setUsername("");
      setContent("");
      setBackdrop(false);
      setOpen(false);
    }
  };

  return (
    <Box>
      <Button fullWidth size="large" variant="outlined" onClick={handleClickOpen}>
        書き込む
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box>
            <TextField
              id="un"
              label="名前"
              value={username}
              fullWidth
              variant="standard"
              onChange={onChangeUsername}
            />
            <TextField
              id="content"
              label="本文"
              value={content}
              fullWidth
              variant="standard"
              autoFocus
              multiline
              rows={5}
              onChange={onChangeContent}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={onSubmit} disabled={!content}>書き込み</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PostForm;
