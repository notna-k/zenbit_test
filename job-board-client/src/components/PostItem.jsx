import React from 'react';
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
    const router = useNavigate()

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.head}</strong>
                <h4>{props.post.skills}</h4>
                <h4>{props.post.salary}</h4>
                <div>
                    {props.post.body}
                </div>
            </div>

        </div>
    );
};

export default PostItem;
