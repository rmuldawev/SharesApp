import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getShares, selectData } from "../../store/sharesSlice";
import "../PageHeader/styles.css";

const PageHeader = () => {
  const datas = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  const companyName = datas.filter(
    (e: { name: string; value: string }) => e.name === "companyName"
  );

  const symbolCompany = datas.filter(
    (e: { name: string }) => e.name === "symbol"
  );

  const nasdaq = datas.filter(
    (e: { name: string }) => e.name === "primaryExchange"
  );

  const latestPice = datas.filter(
    (e: { name: string }) => e.name === "latestPrice"
  );

  const change = datas.filter(
    (e: { name: string; value: string }) => e.name === "change"
  );

  const changePercent = datas.filter(
    (e: { name: string; value: string }) => e.name === "changePercent"
  );

  const previousVolume = datas.filter(
    (e: { name: string; value: string }) => e.name === "previousVolume"
  );

  const iexOpen = datas.filter(
    (e: { name: string; value: string }) => e.name === "iexOpen"
  );

  const dayYear = datas.filter(
    (e: { name: string; value: string }) =>
      e.name === "week52Low" || e.name === "week52High"
  );

  const peRatio = datas.filter(
    (e: { name: string; value: string }) => e.name === "peRatio"
  );

  const marketCap = datas.filter(
    (e: { name: string; value: string }) => e.name === "marketCap"
  );

  const formatLargeNumber = (number: number) => {
    const suffixes = [
      "",
      "тыс.",
      "млн",
      "млрд",
      "трлн",
      "квадрлн",
      "квинтиллион",
      "секстиллион",
      "септиллион",
      "октиллион",
      "нониллион",
      "дециллион",
    ];

    let magnitude = 0;
    while (Math.abs(number) >= 1000) {
      magnitude++;
      number /= 1000;
    }

    return number.toFixed(2) + " " + suffixes[magnitude];
  };

  console.log(dayYear, "dayYear");

  return (
    <div className="containerBox">
      <div className="headerContainer">
        <div className="titleCompany">
          <p className="nameCompany">
            {companyName.length > 0 && companyName[0].value}
          </p>
          <p className="nameCompany">
            ({symbolCompany.length > 0 && symbolCompany[0].value})
          </p>
        </div>
        <div className="nasdaqBox">
          <img
            src="https://i.pinimg.com/564x/ff/76/57/ff7657010677b3dbe75fe03c5de5a8d7.jpg"
            style={{ width: "25px", height: "17px" }}
          />
          <p className="nasdaq">{nasdaq.length > 0 && nasdaq[0].value}</p>
          <div style={{ flexDirection: "row", display: "flex" }}>
            цена в <p style={{ fontWeight: "bold", marginLeft: "3px" }}>USD</p>
          </div>
        </div>
      </div>
      <div className="arrow"></div>
      <div className="headerBox">
        <div className="changesContainer">
          <p className="latesPriceText">Курс закрытия:</p>
          <p className="latestPrice">
            {latestPice.length > 0 && latestPice[0].value}
          </p>
          <div
            className="changeBox"
            style={
              change.length > 0 && change[0].value > 0
                ? { backgroundColor: "lightGreen" }
                : { backgroundColor: "red" }
            }
          >
            <p className="change">{change.length > 0 && change[0].value}</p>
            <p>({changePercent.length > 0 && changePercent[0].value}%)</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>Объём:</p>
          <p className="avgTotal">
            {previousVolume.length > 0 && previousVolume[0].value}
          </p>
        </div>
        <div className="peRatio">
          <p>Цена/прибыль :</p>
          <p>{peRatio.length > 0 && peRatio[0].value}</p>
        </div>
        <div>
          <p>Рыночная копитализация: </p>
          <p>
            {marketCap.length > 0 &&
              formatLargeNumber(Number(marketCap[0].value))}
          </p>
        </div>
        <div className="oneDay_oneYear">
          <div className="oneDay">
            Диапазон за день: {iexOpen.length > 0 && iexOpen[0].value} -{" "}
            {latestPice.length > 0 && latestPice[0].value.toFixed(1)}
          </div>
          <div className="oneYear">
            <p>Диапазон за год:</p>
            {dayYear.length > 0 && dayYear[1].value} -
            {dayYear.length > 0 && dayYear[0].value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
