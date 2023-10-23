import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";


import PostList from "../components/PostList";


function Posts() {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await PostService.getAll();
            setPosts([...posts, ...response.data])
        }
    }, [])





    return (
        <div className="App">

            <hr style={{margin: '15px 0'}}/>


            <PostList  posts={posts} title="Посты про JS"/>



        </div>
    );
}

export default Posts;