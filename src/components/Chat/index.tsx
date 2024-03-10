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
import io from 'socket.io-client';

// @ts-ignore
import message from './message.mp3';
import { generateChatId } from './utils';

const audio = new Audio(message);
// new

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const socket = io('http://localhost:3003/');
interface Props {
  handleClose: () => void;
  open: boolean;
}

export default function Chat({ open, handleClose }: Props) {
  const [formValues, setFormValues] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3003/user/all').then((res) => {
      setUsers(res.data);
    });

    // Обработчик получения нового сообщения
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Подписка на событие получения истории сообщений для комнаты
    socket.on('chatHistory', (history) => {
      setMessages(history);
    });

    return () => {
      socket.off('message');
      socket.off('chatHistory');
    };
  }, [open]);

  const onSendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && formValues.message !== '') {
      const message = {
        text: formValues.message,
        senderId: localStorage.getItem('userId'),
        chatId,
      };

      socket.emit('sendMessage', message);
      setFormValues({ message: '' });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onUserClick = (user: any) => {
    const id = generateChatId(user.id, localStorage.getItem('userId'));

    setChatId(id);
    socket.emit('joinChat', id);

    setCurrentRecipient(user);
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
                  {user?.firstName}
                </div>
              );
            })}
          </div>

          <div className="messages">
            <h1>{currentRecipient.firstName}</h1>
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
              onKeyDown={onSendMessage}
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
