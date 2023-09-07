import { FC } from "react";
import "../common/styles.css";

interface InfoItemProps {
  item: any;
  name: string;
}

const InfoItem: FC<InfoItemProps> = ({ item, name }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <p className="infoItemText">{name}</p>
      <p className="avgTotal">{item && item}</p>
    </div>
  );
};

export default InfoItem;
