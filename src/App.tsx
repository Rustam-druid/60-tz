import {useEffect, useState} from "react";
import {IMessageToSend, IPosts} from "./types";
import './App.css'
import Form from "./components/Form/Form.tsx";
import {preview} from "vite";

const App = () => {
    const url = 'http://146.185.154.90:8000/messages'
    const [posts, setPosts] = useState<IPosts[]>([])
    const [lastPost, setLastPost] = useState<null | string>(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
            if (response.ok) {
                const posts = await response.json()

                setPosts(posts.slice(-15).reverse())
            }
            ;

        }


        void fetchData();

        return
    }, []);

    const messageToSend = async (message: IMessageToSend) => {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({message}),
        })
        if (response.ok) {
            const newPost = await response.json()
            setPosts( (preview => [...preview, newPost]))
        }
        console.log(message)
    }


    return (
        <>
            <div className='container border border-black border-3'>
                <div className='row justify-content-center align-items-center'>
                    <Form message={messageToSend}/>
                    {posts.map((post) => (
                        <div key={post._id} className='col-6 mt-3 d-flex justify-content-center align-items-center'>
                            <div className=' PostCard p-3  '>
                                <h4>{post.message}</h4>
                                <h4 className='card-title Author'>{post.author}</h4>

                            </div>


                        </div>

                    ))}
                </div>

            </div>

        </>
    );
};

export default App;