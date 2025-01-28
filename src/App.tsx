import {useCallback, useEffect, useState} from "react";
import {IMessageToSend, IPosts} from "./types";
import './App.css'
import Form from "./components/Form/Form.tsx";
import axios from "axios";
import Blog from "./components/Blog/Blog.tsx";



const App = () => {
    const url = 'http://146.185.154.90:8000/messages'
    const [posts, setPosts] = useState<IPosts[]>([])
    const [lastPost, setLastPost] = useState<null | string>(null)


    const fetch = useCallback(async (datatime: string | null) => {
        const urlDate = datatime !== null ? `${url}?datetime=${datatime}` : url;
        const response: { data: IPosts[] } = await axios.get(urlDate)

        const posts = response.data
        if (response.data.length > 0 && datatime === null) {

            setLastPost(response.data[response.data.length - 1].datetime)
            setPosts(posts.slice(-15).reverse())
        } else if (response.data.length > 0 && datatime !== null) {
            setLastPost(response.data[response.data.length - 1].datetime)
            setPosts(prev => [...posts.slice(-15), ...prev])
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            void fetch(lastPost);
        }, 3000)
        return () => clearInterval(interval)
    }, [fetch, lastPost]);


    const messageToSend = async (message: IMessageToSend) => {
        try {
            await axios.post(url, new URLSearchParams({...message}))
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <div className='container border border-black border-3'>
                <div className='row justify-content-center align-items-center'>
                    <Form message={messageToSend}/>
                   <Blog posts={posts}/>
                </div>

            </div>

        </>
    );
};

export default App;