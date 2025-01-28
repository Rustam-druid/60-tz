import React, {useState} from 'react';
import {IMessageToSend} from "../../types";

interface Props {
    message: (message: IMessageToSend) => void;
}

const Form: React.FC<Props> = ({message}) => {
    const [form, setForm] = useState<IMessageToSend>({
        author: '',
        message: '',
    })
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        message({...form})
        setForm({
            author: '',
            message: '',
        })
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="author">author</label>
                    <input
                        className='form-control'
                        name="author"
                        id="author"
                        onChange={changeInput}
                        value={form.author}
                        type="text"/>
                </div>
                <div>
                    <label htmlFor="author">message</label>
                    <input
                        className='form-control'
                        name="message"
                        id="message"
                        onChange={changeInput}
                        value={form.message}
                        type="text"/>
                </div>
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
};

export default Form;