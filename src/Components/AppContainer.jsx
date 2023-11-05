import React, { useEffect, useState } from "react";
import "./container.css";
import useAxiosHook from "../Components/useAxios/useAxiosHook";

const AppContainer = () => {
  const [data, setData] = useState([]);

  const [{ data: dataRes, loading: dataResLoading }, dataCall] = useAxiosHook(
    {
      url: `https://www.nimante.com/api/events/schedule/6/`,
      method: "get",
      data: {},
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (dataRes) {
      console.log(dataRes);
      setData(dataRes);
    }
  }, [dataRes]);

  useEffect(() => {
    dataCall();
  }, []);

  const [activeEvent, setActiveEvent] = useState(0);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hideEndTime, setHideEndTime] = useState(false);
  const [location, setLocation] = useState("");
  const [hideLocation, setHideLocation] = useState(false);
  const [dressCode, setDressCode] = useState("");

  return (
    <div className="app-container">
      <div className="main">
        <div className="events-list">
          {data.map((dat, idx) => {
            const { name, event_details, start_time } = dat;
            return (
              <div
                className={`event-btn ${activeEvent == idx ? "active" : ""}`}
                key={idx}
                onClick={() => setActiveEvent(idx)}
              >
                <div
                  className="imgBox"
                  style={{ backgroundImage: `url(${event_details.even_logo})` }}
                ></div>
                <div className="contentBox">
                  <h2 className="font-15px">{name}</h2>
                  <h3 className="font-10px">
                    Event date {start_time ? start_time : "TBA"}
                  </h3>
                  <h3 className="font-10px">
                    Location{" "}
                    {event_details?.location ? event_details?.location : "TBA"}
                  </h3>
                </div>
                <button className="delete-icon">
                  <ion-icon name="trash-sharp"></ion-icon>
                </button>
              </div>
            );
          })}
          <button className="create-btn-event">Create New Event</button>
        </div>
        <div className="events-details">
          <div>
            <h2>Event Details</h2>
            <form className="event-form">
              <div>
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  id="eventName"
                  value={eventName}
                  placeholder="Haldi"
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="date-n-time">
                <label>Date & Time</label>
                <div>
                  <label htmlFor="startDate">Start</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="endDate">End</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  {hideEndTime ? (
                    <span>End time is hidden</span>
                  ) : (
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {hideLocation ? <span>Location is hidden</span> : null}
              </div>
              <div>
                <label htmlFor="dressCode">Dress Code</label>
                <input
                  type="text"
                  id="dressCode"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                />
              </div>
              <div className="update-btn">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
