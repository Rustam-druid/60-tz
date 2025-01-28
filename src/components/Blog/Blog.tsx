import React from "react";
import {IPosts} from "../../types";

interface IProps {
    posts:IPosts[]
}
const Blog:React.FC<IProps> = ({posts}) => {
    return (
        <>
            {posts.map((post) => (
                <div key={post._id} className='col-6 mt-3 d-flex justify-content-center align-items-center'>
                    <div className=' PostCard p-3  '>
                        <h4>{new Date(post.datetime).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}</h4>
                        <h4>Сообщение: <p >{post.message}</p></h4> <hr/>
                        <h4 className='card-title Author'>Автор  <p>{post.author}</p></h4>

                    </div>


                </div>

            ))}
        </>
    );
};

export default Blog;