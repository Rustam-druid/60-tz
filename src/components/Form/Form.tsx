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

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }

    return (
        <div className="border border-black border-3 w-50 me-4 mt-3 p-3">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-3 w-100 ">
                        <label htmlFor="author">author</label>
                        <input
                            className='w-25 form-control border border-2 border-black'
                            name="author"
                            id="author"
                            onChange={changeInput}
                            value={form.author}
                            type="text"/>
                    </div>
                    <div className='col-5'>
                        <label htmlFor="author">message</label>
                        <textarea
                            className='form-control border border-2 border-black'
                            name="message"
                            id="message"
                            onChange={changeInput}
                            value={form.message}
                        />
                    </div>

                </div>
                <button className='w-25 mt-4 btn btn-primary'>Add</button>
            </form>
        </div>
    );
};

export default Form;