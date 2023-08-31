import React, { FC } from "react";
import "../sharesItem/styles.css";

interface SharesItem {
  title: string;
  value: string;
}

const SharesItem: FC<SharesItem> = ({ title, value }) => {
  return (
    <div className="box">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default SharesItem;
