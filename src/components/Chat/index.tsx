import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import './Chat.scss';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDate } from 'date-fns';

// @ts-ignore
import message from './message.mp3';

const audio = new Audio(message);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  handleClose: () => void;
  open: boolean;
}

export default function Chat({ open, handleClose }: Props) {
  const [formValues, setFormValues] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getMessages();
  }, [currentRecipient.id]);

  useEffect(() => {
    const id = setInterval(getMessages, 2000);

    return () => clearInterval(id);
  }, [currentRecipient.id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSend = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const userId = localStorage.getItem('userId');
      const sender = (await axios.get(`http://localhost:3001/users/${userId}`)).data;

      const payload = {
        text: formValues.message,
        createDate: new Date(),
        sender,
        recipient: currentRecipient,
      };
      await axios.post('http://localhost:3001/messages', payload);
      setFormValues({});
      getMessages();
      audio.play();
    }
  };

  const getUsers = async () => {
    const users = (await axios.get('http://localhost:3001/users')).data;
    setUsers(users);
  };

  const onUserClick = (user: any) => {
    setCurrentRecipient(user);
  };

  const getMessages = async () => {
    const userId = localStorage.getItem('userId');
    const messages = (await axios.get(`http://localhost:3001/messages?sender.id=${currentRecipient.id}&recipient.id=${userId}`)).data;
    const messagesAdd = (await axios.get(`http://localhost:3001/messages?sender.id=${userId}&recipient.id=${currentRecipient.id}`)).data;
    setMessages([...messages, ...messagesAdd]);
  };

  const userType = (user: any) => {
    if (String(user.id) === localStorage.getItem('userId')) {
      return 'isMe';
    }
    if (currentRecipient.id === user.id) {
      return 'active';
    }

    return '';
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Чат
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="chat__content">
          <div className="chat__users">
            {users.map((user) => {
              return (
                <div onClick={() => onUserClick(user)} className={`chat__user ${userType(user)}`}>
                  {user?.name}
                </div>
              );
            })}
          </div>

          <div className="messages">
            <h1>{currentRecipient.name}</h1>
            {messages
              .sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime())
              .map((message, index, arr) => {
                const nextMessage = arr[index + 1];
                const isNewDate = getDate(message?.createDate) !== getDate(nextMessage?.createDate);
                return (
                  <>
                    <div className={String(message.sender.id) === localStorage.getItem('userId') ? 'message message--my' : 'message'}>{message.text}</div>
                    {isNewDate && (
                      <div style={{ margin: '0 auto' }}>{nextMessage?.createDate ? new Date(nextMessage?.createDate).toLocaleDateString() : ''}</div>
                    )}
                  </>
                );
              })}

            <TextField
              sx={{ marginTop: 'auto' }}
              id="input-with-icon-textfield"
              label="Отправить сообщение"
              onChange={onChange}
              onKeyDown={onSend}
              name="message"
              value={formValues?.message || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SendIcon />
                  </InputAdornment>
                ),
              }}
              variant="filled"
              fullWidth
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
