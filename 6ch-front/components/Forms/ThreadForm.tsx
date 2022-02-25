import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Backdrop, CircularProgress } from '@mui/material/';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import axios from "../../lib/axiosSettings";

type newThreadResult = {
  id: number
}

const ThreadForm = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

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
    try {
      const threadParams = {
        title: title
      };
      const { data } = await axios.post<newThreadResult>("/thread/new", threadParams);
      const postParams = {
        userName: username,
        content: content,
        threadId: data.id
      };
      await axios.post("/post/new", postParams);
      mutate(`/threads`);
      router.push(`/threads/${data.id}`);
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
        スレッドを作成
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
              label="タイトル"
              value={title}
              fullWidth
              variant="standard"
              autoFocus
              onChange={onChangeTitle}
            />
            <TextField
              id="content"
              label="本文"
              value={content}
              fullWidth
              variant="standard"
              multiline
              rows={5}
              onChange={onChangeContent}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={onSubmit} disabled={!content || !title}>作成</Button>
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

export default ThreadForm;
