import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { GetTodoById, createTodo, updateTodoById } from "./api/TodoApiService";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function TodoServiceComponent() {

    const { id } = useParams();
    const username = useAuth().username;
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const navigate = useNavigate();

    function getTodo() {
        if (id != -1) {
            GetTodoById(username, id)
                .then((response) => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function saveDetails(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id != -1) {
            updateTodoById(username, id, todo)
                .then(() => navigate("/todos"))
                .catch(() => setUserMessage("Something went wrong. Please try again !!"));
        }
        else {
            createTodo(username, todo)
                .then(() => navigate("/todos"))
                .catch(() => setUserMessage("Something went wrong. Please try again !!"));
        }
    }

    function validateData(values) {
        let error = {};
        if (values.description.length < 5)
            error.description = "The length of description should be atleast 5 !!";
        else if (values.description.length == null)
            error.description = "Description should not be blank !!";
        else if (values.targetDate.length < 10)
            error.targetDate = "Target Date should not be blank !!";
        return error;
    }

    useEffect(() => { getTodo() }, [id]);

    return (
        <div className="container col-md-4">
            <h1 className="mb-5">Enter modified details...</h1>
            {userMessage && <div className="alert alert-danger">{userMessage}</div>}
            <div className="mt-5">
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={saveDetails}
                    validate={validateData}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-danger" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-danger" />
                                <fieldset className="input-group mb-4">
                                    <span className="input-group-text" >DESCRIPTION</span>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="input-group mb-4">
                                    <span className="input-group-text" >TARGET DATE</span>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success" type="submit">SAVE</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}