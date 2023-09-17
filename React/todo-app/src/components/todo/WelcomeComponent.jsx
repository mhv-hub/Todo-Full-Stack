import { useParams, Link } from "react-router-dom";

export default function WelcomeComponent() {
    const { username } = useParams();
    // const [message, setMessage] = useState(null);

    // function callRESTAPI() {
    //     GetTodoList(username)
    //         .then((response) => successAPIResponse(response))
    //         .catch((error) => errorAPIResponse(error))
    //         .finally(() => console.log("cleanup space"));
    // }

    // function successAPIResponse(response) {
    //     setMessage(response.data);
    //     console.log(response);
    // }

    // function errorAPIResponse(error) {
    //     console.log(error);
    // }

    return (
        <div className="welcomeComponent">
            <h1>Welcome {username} !!</h1>
            <div>
                Manage your todos using <Link to="/todos">this link</Link>
            </div>
            <div>
                {/* <button className="btn btn-success" onClick={callRESTAPI}>CALL REST API</button> */}
            </div>
            {/* <div className="text-info">{message}</div> */}
        </div>
    );
}