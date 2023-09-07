import React, { FC } from "react";
import "../sharesItem/styles.css";

interface SharesItem {
  title: string;
  value?: string;
  id?: string;
}

const SharesItem: FC<SharesItem> = ({ title, value, id }) => {
  return (
    <>
      <div className="box">
        <div>
          <p className="numberTitle">{id}.</p>
        </div>
        <div className="textBox">
          <p>{title}</p>
          <div className="colon">:</div>
          <p className="text">{value}</p>
        </div>
      </div>
      <div
        style={{
          height: "1px",
          width: "90%",
          backgroundColor: "black",
          marginLeft: "20px",
        }}
      ></div>
    </>
  );
};

export default SharesItem;
