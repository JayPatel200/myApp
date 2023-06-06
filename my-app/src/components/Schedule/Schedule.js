import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "./Schedule.css";
import useAuth from "../../hooks/useAuth";
import Nav from "../Nav/Nav";

const TASK_URL = "/tasks";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [];

const Schedule = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [newEvent, setNewEvent] = useState({
    title: "",
    allDay: true,
    start: "",
    end: "",
    house: auth?.houses[0],
  });
  const [allEvents, setAllEvents] = useState(events);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const response = await axiosPrivate.get(TASK_URL+'/' + auth?.houses[0], { //+houseAuth.houseName to get current tasks
          signal: controller.signal,
        });
        for (let i in response.data) {
          // change the strigified date format to correct format for calendar
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        isMounted && setAllEvents(response.data);
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

  const handleAddEvent = async (e) => {
    setAllEvents([...allEvents, newEvent]);
    try {
      const response = await axiosPrivate.post(TASK_URL, JSON.stringify(newEvent), {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 400) {
        alert("Missing Title, Start or End");
      } else if (err.response?.status === 401) {
        alert("Already exists");
      } else {
        alert("Failed to save new task");
      }
    }
  };

  return (
    <div className="schedule">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
      <br/>
      <br/>
        <Nav />
    </div>
  );
};

export default Schedule;
