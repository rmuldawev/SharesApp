import React, { FC } from "react";
import "../sharesItem/styles.css";

interface SharesItem {
  title: string;
  value?: string;
  id?: string;
}

const SharesItem: FC<SharesItem> = ({ title, value, id }) => {
  return (
    <div className="box">
      <div style={{ width: "20px", backgroundColor: "red" }}>
        <p className="numberTitle">{id}.</p>
      </div>
      <p>
        {title}: {value}
      </p>
    </div>
  );
};

export default SharesItem;
