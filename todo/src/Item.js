import axios from "axios";
import React, { useState } from "react";

export default function Item({ item }, history) {
    const [check, setCheck] = useState(item.item_done ? true : false);

    const box = () => {
        const cb = document.getElementById(item._id + " 2");
        console.log(cb.defaultChecked);
        if(cb.defaultChecked == false)
        {
            console.log("got to false");
            axios.put(`http://localhost:4000/todos/complete/${item._id}/false`)
            .then(res => console.log(res.data));
            document.getElementById(item._id).className="done";
            document.getElementById(item._id + " 1").className="done";
            document.getElementById(item._id + "  1").className="done";
            
        }
        else
        {
            console.log("Got to true");
            console.log(item._id);
            axios.put(`http://localhost:4000/todos/complete/${item._id}/true`)
            .then(res => console.log(res.data));
            // .then(history.push("/"));
            document.getElementById(item._id).className="";
            document.getElementById(item._id + " 1").className="";
            document.getElementById(item._id + "  1").className="";
        }
        setCheck(!check);
        console.log(check);
    }

    
    return (
        <tr>
            <td className={item.item_done ? "done" : ""} id={item._id}>{item.item_title}</td>
            <td className={item.item_done ? "done" : ""} id={item._id + " 1"}>{item.item_category}</td>
            <td className={item.item_done ? "done" : ""} id={item._id + "  1"}>{item.item_date}</td>
            <td>
                <button type="button" className="btn btn-light containerButton" data-toggle="modal" data-target="#exampleModal">
                    <a className="tableButton" href={`/edit/${item._id}`}>Edit</a>
                </button>
            </td>
            <td>
                <label className ="form-check-label" htmlFor="check"/>
                <input type="checkbox" className="form-check-input" id={item._id + " 2"} defaultChecked={check}
                    onClick={box} />
            </td>
        </tr>
    )
}