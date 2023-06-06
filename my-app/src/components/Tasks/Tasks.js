import "./Tasks.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const response = await axiosPrivate.get(
          "/tasks/" + auth?.houses[0], //+ houseAuth.houseName to get tasks of this house
          {
            signal: controller.signal,
          }
        );
        isMounted && setTasks(response.data);
        console.log(response.data)
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getTasks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Tasks List</h2>
      {tasks?.length ? (
        <ul>
          {tasks.map((task, i) => (
            <li key={i}>
              <h2>{task?.title}</h2> <h5>{task?.start}</h5>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks to display</p>
      )}
    </article>
  );
};

export default Tasks;
