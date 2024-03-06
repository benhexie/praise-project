import "./Support.css";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hasFetchedMessages,
  setMessages,
  updateMessage,
} from "../../../redux/actions/admin";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AiFillMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const Support = () => {
  const messages = useSelector((state) => state.admin.messages);
  const hfm = useSelector((state) => state.admin.hasFetchedMessages);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("unread");

  useEffect(() => {
    if (hfm) return setLoading(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER}/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return toast.error(data.message);
        dispatch(hasFetchedMessages());
        dispatch(setMessages(data.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (/failed to fetch|network error/i.test(error.message)) {
          toast.error("Please check your internet connection.");
        }
        toast.error(error.message);
      });
  }, []);

  const markAsRead = (id, read) => {
    if (!id) return;
    fetch(`${process.env.REACT_APP_SERVER}/message/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        read,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return toast.error(data.message);
        dispatch(updateMessage(data.data));
      })
      .catch((error) => {
        if (/failed to fetch|network error/i.test(error.message)) {
          return toast.error("Please check your internet connection.");
        }
        toast.error(error.message);
      });
  };

  return (
    <Fragment>
      {loading ? (
        <div className="support__loading">
          <ClipLoader color="var(--primary-color)" size={80} />
        </div>
      ) : (
        <div className="support">
          <div className="dashboard__header support__header">
            <h1>Support</h1>
          </div>
          <div className="support__container">
            <div className="support__filter">
              <label>Apply filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="question">Question</option>
              </select>
            </div>
            <div className="scrollable">
              <div>
                {messages.filter((message) => {
                  if (filter === "unread") return !message.read;
                  if (filter === "read") return message.read;
                  if (filter) return message.category === filter;
                  return true;
                }).length === 0 ? (
                  <p className="support__empty">No message to found</p>
                ) : (
                  messages
                    .filter((message) => {
                      if (filter === "unread") return !message.read;
                      if (filter === "read") return message.read;
                      if (filter) return message.category === filter;
                      return true;
                    })
                    .map((message) => (
                      <div key={message._id} className="support__message">
                        <div className="support__message__header">
                          <p
                            className={`support__message__category ${message.category}`}
                          >
                            {message.category}
                          </p>
                          <div className="support__message__read">
                            <label>
                              Mark as {message.read ? "unread" : "read"}
                              <input
                                type="checkbox"
                                onChange={() =>
                                  markAsRead(message._id, !message.read)
                                }
                                checked={message.read}
                              />
                            </label>
                          </div>
                          <p>
                            {(() => {
                              const date = new Date(message.createdAt);
                              return (
                                <>
                                  <span>
                                    {date.toLocaleDateString("en-GB")}
                                  </span>{" "}
                                  {date.getHours() > 12
                                    ? date.getHours() - 12
                                    : date.getHours()}
                                  :{date.getMinutes()}
                                  {date.getHours() > 12 ? "PM" : "AM"}
                                </>
                              );
                            })()}
                          </p>
                        </div>
                        <p>{message.message}</p>
                        <Link
                          to={`mailto:${message.sender.email}`}
                          className="support__message__sender"
                        >
                          <AiFillMail /> {message.sender.email}
                        </Link>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Support;
