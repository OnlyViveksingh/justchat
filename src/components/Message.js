import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return (
        <div>
            {photoURL ? (
                <img src={photoURL} alt="Avatar" width={45} height={45}/>               
            ) : null}
            {displayName ? <p>{displayName}</p> : null}
            {createdAt ?.seconds ? (
                <span>
                    {formatRelative(new Date(createAt.seconds = 1000), new Date()
                    )}
                </span>
            ) : null}
            <p>{text}</p>
        </div>
    )
};

export default Message;