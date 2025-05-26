import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Flight = ({
  mission_name,
  details,
  status,
  upcoming,
  links,
  localdate,
}) => {
  const [openDetails, setOpenDetails] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(localdate), {
    addSuffix: true,
  });
  var info;
  if (upcoming)
    info = (
      <span
        className="launch__status launch__status--info"
        style={{
          fontSize: "16px",
        }}
      >
        upcoming
      </span>
    );
  else {
    if (status)
      info = (
        <span
          className="launch__status launch__status--success"
          style={{
            fontSize: "16px",
          }}
        >
          success
        </span>
      );
    else
      info = (
        <span
          className="launch__status launch__status--danger"
          style={{
            fontSize: "16px",
          }}
        >
          failed
        </span>
      );
  }
  return (
    <div className="launch__item">
      <div>
        <span
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {mission_name}
        </span>
        &nbsp;
        {info}
      </div>

      {openDetails && (
        <div className="launch__body">
          <div className="launch__meta">
            <span className="launch__meta-item">{timeAgo}</span>
            <span className="launch__meta-item">
              {links.video_link && <a href={links.video_link}>Video</a>}
            </span>
          </div>
          <div className="launch__details">
            <div className="media">
              <img src={links.mission_patch} alt="Image is not yet available" />
              <div>{details}</div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn--primary"
        style={{
          width: "30px",
        }}
        onClick={() => {
          setOpenDetails((isOpen) => !isOpen);
        }}
      >
        {openDetails ? "hide" : "view"}
      </button>
    </div>
  );
};
export default Flight;
