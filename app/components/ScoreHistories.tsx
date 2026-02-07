import React, { useEffect, useState } from "react";
import { PlayHistoryItem } from "../page";

interface ScoreHistoriesProp {
  data: PlayHistoryItem[];
}

export const ScoreHistories = ({data}:ScoreHistoriesProp) => {

  return (
    <>
      {data && data.length > 0 ? (
        <div className="border border-gray-400 rounded-lg overflow-hidden">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex justify-start md:justify-center items-center text-black gap-8  p-5 hover:bg-gray-100 ${index !== 0 ? "border-t border-gray-400" : ""}`}
            >
              <div className="bg-red-500 px-8 py-8 rounded-full "></div>

              <div className="text-center font-bold text-xl">
                เล่นได้ {item.ptsReceived} คะแนน
                <div className="text-gray-400 font-medium">
                  เล่นเมื่อ {new Date(item.playedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">
          ยังไม่มีประวัติการเล่น
        </div>
      )}
    </>
  );
};
