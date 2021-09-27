import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import Item from "./Item";


export default function TodoList() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function getTodo() {
        axios.get("http://localhost:4000/todos")
            .then(res => { setList(res.data); })
            .catch(err => { console.log(err); })
    }

    useEffect(() => {
        getTodo();
        setIsLoading(false)
    }, [])


    return isLoading ? (
        <div>Loading list</div>
    ) : list.length ? (
        <div>
            <h1>To-do list</h1>
            <table className="table table-hover">
                <thead className="thead">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Done?</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => {
                        return <Item key={item._id} item={item} href="/"/>
                    })}
                </tbody>
            </table>
        </div>
    ) : (
        <div> There are no todos </div>
    )
}