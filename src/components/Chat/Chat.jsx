import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import {
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import upload from "../../lib/upload";
import avatarPlaceholder from "../../assets/images/avatar.jpg";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const [file, setFile] = useState({
    file: null,
    url: "",
    type: "",
  });
  const endRef = useRef(null);
  const pickEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen((prev) => !prev);
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile({
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
        type: selectedFile.type,
      });
    }
  };
  const handleSend = async () => {
    let fileUrl = null;
    try {
      if (file.file) {
        fileUrl = await upload(file.file);
      }
      // update chat
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Timestamp.now(),
          ...(fileUrl && {
        file: fileUrl,
        fileName: file.file.name,
        fileType: file.type,
          }),
        }),
        sharedFiles: !file.type.startsWith("image/")
          ? arrayUnion({
          url: fileUrl,
          createdAt: Timestamp.now(),
        })
          : arrayUnion(...(chat?.sharedFiles || [])),
        sharedPhotos: file.type.startsWith("image/")
          ? arrayUnion({
          url: fileUrl,
          createdAt: Timestamp.now(),
        })
          : arrayUnion(...(chat?.sharedPhotos || [])),
      })

      const userIds = [currentUser.id, user.id];
      // update userchats
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log("error has occurred" + err);
    }
    setFile({
      file: null,
      url: "",
      type: "",
    });
    setText("");
  };
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || avatarPlaceholder} alt="avatar" />
          <div className="texts">
            <span>{user.username}</span>
            <p>
              {user.description}
            </p>
          </div>
        </div>
      </div>
      <div className='center'>
        {chat?.messages?.map((message) => (
          <React.Fragment key={message.createdAt.toMillis()}>
            <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`}>
              <div className='texts'>
                <div className="sender-info">
                  <img src={message.senderId === currentUser.id ? `${currentUser.avatar}` : `${user.avatar}`} alt="avatar" className="message-avatar" />
                  <h2>{message.senderId === currentUser.id ? `${currentUser.username}` : `${user.username}`}</h2>
                </div>
                {message.file && message.fileType.startsWith('image/') ? (
                  <img src={message.file} alt='img' />
                ) : (
                  message.file && (
                    <div className="file-message">
                      <FontAwesomeIcon icon={faFile} />
                      <a href={message.file} download>
                        {message.fileName}
                      </a>
                    </div>
                  )
                )}
                {message.text && <p className={`message-text ${message.senderId === currentUser.id ? 'own' : ''}`}>{message.text}</p>}
                <p className="message-date">
                  {new Date(message.createdAt.toDate()).toLocaleString()}
                </p>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
        {file.url && (
          <div className={'message own preview'}>
            <div className='texts'>
              {file.type.startsWith('image/') ? <img src={file.url} alt='img' /> : <a href={file.url} download>{file.file.name}</a>}
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="message-file">
            <FontAwesomeIcon
              icon={faFile}
              className={`icon ${
                isCurrentUserBlocked || isReceiverBlocked ? "disabled" : ""
              }`}
            />
          </label>
          <input
            type="file"
            id="message-file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div
          className={`emoji ${
            isCurrentUserBlocked || isReceiverBlocked ? "disabled" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faSmile}
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              open={open}
              className="emojiPicker"
              onEmojiClick={pickEmoji}
            />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;