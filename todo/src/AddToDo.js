import React from 'react';
import { useState } from "react";
import axios from "axios";

export default function AddToDo({ history }) {
    const date = new Date();
    var d = date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    const [item_title, setTitle] = useState("")
    const [item_category, setCategory] = useState("")
    const [item_date, setDate] = useState(d)
    const item_done = false;

    const addItem = (e) => {
        e.preventDefault();
        const item =
        {
            item_title,
            item_category,
            item_done,
            item_date
        }
        axios.post("http://localhost:4000/todos/add", item)
            .then(res => console.log(res.data))
            .then(() => history.push("/"));
    };
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        placeholder="Math Homework"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">

                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        placeholder="School"
                        className="form-control"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Due Date</label>
                    <input
                        id="date"
                        placeholder="mm-dd-yyyy"
                        className="form-control"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <small id="dateHelp" class="form-text text-muted">If date left empty, will assume due date is today.</small>
                    <div>
                        <button className="btn btn-primary" onClick={addItem}>Submit</button>
                    </div>
                </div >
            </form>
        </div>

    )
}
