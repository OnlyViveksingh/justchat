import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const Channel = ({ user = null, db = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { uid, displayName, photoURL } =user;

    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderby('createdAt')
                .limit(180)
                .onsnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMessages(data);
                });
            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = e => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();

        if (db) {
            db.collection('messages').add({
                text: newmessage,
                createAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    }

    return (
        <>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <Message {...message}/>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    value={newmessage}
                    onChange={handleOnChange}
                    placeholder="Type your message here..."
                />
                <buttobn type="submit" disabled={!newmessage}>
                    Send
                </buttobn>
            </form>
        </>
    );
};

export default Channel;