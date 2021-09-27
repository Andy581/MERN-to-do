import React, { useState, useEffect } from "react"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Edit({ match: { params }, history }) {
    const [item_title, setTitle] = useState("")
    const [item_category, setCategory] = useState("")
    const [item_date, setDate] = useState("")
    const [item_done, setDone] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/todos/${params.id}`)
            .then(res => {
                const {
                    item_title,
                    item_category,
                    item_date,
                    item_done
                } = res.data;
                setTitle(item_title);
                setCategory(item_category);
                setDate(item_date);
                setDone(item_done);
            })
    }, [params.id])

    const onSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/todos/edit/${params.id}/${item_title}/${item_category}/${item_date}/${item_done}`)
            .then(res => console.log(res.data))
            .then(() => history.push("/"));
    }


    const Delete = (e) =>{
        e.preventDefault()
        axios.delete(`http://localhost:4000/todos/delete/${params.id}`)
        .then(res => console.log(res.data))
        .then(() => history.push("/"));
    }

    return (
        <div>

            <form>
                <label htmlFor="title">Title</label>
                <input
                    className="form-control"
                    id="title"
                    value={item_title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="category">Category</label>
                <input
                    className="form-control"
                    id="category"
                    value={item_category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="date">Due Date</label>
                <input
                    className="form-control"
                    id="date"
                    value={item_date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="date">Done?</label>
                <input
                    className="form-control"
                    id="date"
                    value={item_done}
                />
                <button className="btn btn-primary containerButton" onClick={onSubmit}>Submit</button>
                <button className="btn btn-primary" href="/" onClick={Delete}>Delete</button>
            </form>
        </div>
    );

}