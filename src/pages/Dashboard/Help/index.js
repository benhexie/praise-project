import { useEffect, useRef, useState } from "react";
import "./Help.css";
import { toast } from "react-toastify";

const Help = () => {
  const [category, setCategory] = useState("feedback"); // "feedback", "complaint", "suggestion", "question"
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !category) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_SERVER}/message`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          category,
          message,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.error) return setError(data.message);
      toast.success("Message sent successfully");
      setCategory("feedback");
      setMessage("");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [category, message]);

  return (
    <div className="complaint">
      <div className="dashboard__header complaint__header">
        <h1>Support</h1>
      </div>
      <div className="complaint__container">
        <form className="complaint__form" onSubmit={handleSubmit}>
          <div className="complaint__form-group">
            <label>Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
              <option value="suggestion">Suggestion</option>
              <option value="question">Question</option>
            </select>
          </div>
          <div className="complaint__form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              rows="5"
              placeholder="Please enter your message/complaint..."
            ></textarea>
          </div>
          {error && <p className="complaint__error">{error}</p>}
          <div className="complaint__form-group">
            <button type="submit"
            disabled={loading}
            >Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
