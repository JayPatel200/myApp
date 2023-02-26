import "./Tasks.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get('/tasks', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTasks(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getTasks();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Tasks List</h2>
            {tasks?.length
                ? (
                    <ul>
                        {tasks.map((task, i) => <li key={i}><h2>{task?.username}</h2> <h5>{task?.taskname}</h5></li>)}
                    </ul>
                ) : <p>No tasks to display</p>
            }
        </article>
    );
};

export default Tasks;