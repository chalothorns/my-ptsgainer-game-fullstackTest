import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import axios from "axios";

interface PlayHistoryItem {
  ptsReceived: number;
  playedAt: Date;
}

export const ScoreHistories = () => {
  const [data, setData] = useState<PlayHistoryItem[]>([]);

  useEffect(() => {
    const playHistories = async () => {
      try {
        const response = await api.get("/users/6");
        setData(response.data?.playHistories ?? []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "ดึงคะแนนไม่สำเร็จ",
            error.response?.data || error.message,
          );
        } else {
          console.error("เกิดข้อผิดพลาด", error);
        }
      }
    };

    playHistories();
  }, []);
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
