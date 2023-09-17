import { useEffect, useState } from "react";
import { GetAllTodoListForUsername, DeleteTodoByUsernameAndId } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([]);
    const [userMessage, setUserMesage] = useState("");
    const username = useAuth().username;
    const navigate = useNavigate();

    //used to run a method at startup
    useEffect(() => { refreshTodos() }, []);

    function refreshTodos() {
        GetAllTodoListForUsername(username)
            .then((response) => successAPIResponse(response))
            .catch((error) => errorAPIResponse(error))
            .finally(console.log("cleanup after getAllTodosForUsername api call"));
    }

    function successAPIResponse(response) {
        setTodos(response.data);
    }

    function errorAPIResponse(error) {
        console.log(error);
    }

    function deleteTodo(id) {
        DeleteTodoByUsernameAndId(username, id)
            .then(() => {
                refreshTodos();
                setUserMesage(`Todo item with id=${id} has been deleted !!`);
            })
            .catch((error) => {
                console.log(error);
                setUserMesage(`Something went wrong. Please try again !!`);
            })
            .finally(console.log("cleanup after DeleteTodoByUsernameAndId api call"));
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`);
    }

    function addNewTodo() {
        navigate("/todo/-1")
    }

    return (
        <div className="container">
            <h1>Things you want to do !!</h1>
            <div>
                {userMessage && <div className="alert alert-warning mt-5">{userMessage}</div>}
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>DSCRIPTION</th>
                            <th>IS DONE ?</th>
                            <th>TARGET DATE</th>
                            <th>DELETE</th>
                            <th>UPDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>DELETE</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>UPDATE</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <div className="btn btn-success m-5" onClick={addNewTodo}>ADD NEW TASK</div>
            </div>
        </div>
    );
}