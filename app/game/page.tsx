"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../lib/axios";

export default function GamePage() {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [scoreView, setScoreView] = useState<number>();
  const [modalReward, setModalReward] = useState(false);
  const [scores, setScores] = useState<number>(0);




  const closeModal = () => setModalReward(false);

  const formPopup = modalReward
    ? "max-h-screen opacity-100"
    : "max-h-0 opacity-0 overflow-hidden mt-0";

    const currentScore = async () => {
      try {
        const response = await api.get("/users/6");
        setScores(response.data?.totalScore || 0);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "บันทึกไม่สำเร็จ",
            error.response?.data || error.message,
          );
        } else {
          console.error("เกิดข้อผิดพลาด", error);
        }
      }
    };

  useEffect(() => {
    currentScore();
  }, []);

  const saveScore = async (finalScore: number) => {
    try {
      const response = await api.post("/play-histories", {
        ptsReceived: finalScore,
        playedAt: new Date().toISOString(),
        userId: 6,
      });
      await currentScore();      

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("บันทึกไม่สำเร็จ", error.response?.data || error.message);
      } else {
        console.error("เกิดข้อผิดพลาด", error);
      }
    }
  };

  function startRandomPts() {
    setIsRolling(true);
    let count = 0;
    const pointsReward = [300, 500, 1000, 3000];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pointsReward.length);
      const randomValue = pointsReward[randomIndex];
      setScoreView(randomValue);

      if (++count >= 10) {
        clearInterval(interval);
        setIsRolling(false);
        setModalReward(true);
        saveScore(randomValue);
      }
    }, 100);
  }
    

  return (
    <div>
      {/* Reward pts Modal  */}
      <div className="relative">
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center bg-opacity-80 overflow-y-auto p-4 mb-20  lg:mb-0 ${formPopup}`}
        >
          <div className="absolute w-full md:max-w-xl top-1/4 py-18 rounded-2xl bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)] text-center">
            <button
              className="absolute text-gray-500 text-lg top-5 right-5 cursor-pointer hover:bg-red-200 py-2 px-4 rounded-xl"
              onClick={closeModal}
            >
              X
            </button>

            <h2 className="text-black text-4xl mt-2">ได้รับ</h2>
            <p className="text-black text-2xl mt-6">{scoreView} คะแนน</p>
            <button
              className="w-[60%] text-2xl p-2 bg-amber-400 hover:bg-amber-300 font-bold mt-15 rounded-full cursor-pointer"
              onClick={closeModal}
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      <h1 className="relative flex flex-col items-center mt-4 text-2xl text-black font-bold">
        คะแนนสะสม {scores}/10,000
      </h1>

      {/* Points board */}
      <div className=" text-black">
        <div className="flex gap-2 md:gap-4 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p
            className={`py-2 px-6 md:px-10 font-bold text-2xl md:text-3xl rounded-2xl ${scoreView === 300 && isRolling ? "bg-cyan-400 text-green-700" : scoreView === 300 && !isRolling ? "bg-green-400 text-green-700" : scoreView === undefined ? "bg-cyan-400 text-green-700" : "bg-transparent text-green-700"}`}
          >
            300
          </p>
          <p
            className={`py-2 px-6 md:px-10 font-bold text-2xl md:text-3xl rounded-2xl ${scoreView === 500 && isRolling ? "bg-cyan-400 text-green-700" : scoreView === 500 && !isRolling ? "bg-green-400 text-green-700" : scoreView === undefined ? "bg-cyan-400 text-green-700" : "bg-transparent text-green-700"}`}
          >
            500
          </p>

          <p
            className={`py-2 px-4 md:px-10 font-bold text-2xl md:text-3xl rounded-2xl ${scoreView === 1000 && isRolling ? "bg-cyan-400 text-green-700" : scoreView === 1000 && !isRolling ? "bg-green-400 text-green-700" : scoreView === undefined ? "bg-cyan-400 text-green-700" : "bg-transparent text-green-700"}`}
          >
            1,000
          </p>

          <p
            className={`py-2 px-4 md:px-10 font-bold text-2xl md:text-3xl rounded-2xl ${scoreView === 3000 && isRolling ? "bg-cyan-400 text-green-700" : scoreView === 3000 && !isRolling ? "bg-green-400 text-green-700" : scoreView === undefined ? "bg-cyan-400 text-green-700" : "bg-transparent text-green-700"}`}
          >
            3,000
          </p>
        </div>

        {/* Roliing button */}
        <button
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white hover:bg-red-400  py-2 px-8 font-bold text-3xl rounded-2xl ${isRolling ? "bg-red-400 ursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
          disabled={isRolling}
          onClick={startRandomPts}
        >
          {isRolling ? "กำลังสุ่ม..." : "สุ่มคะแนน"}
        </button>
      </div>

      <div></div>
    </div>
  );
}
