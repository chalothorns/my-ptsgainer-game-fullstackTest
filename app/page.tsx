"use client";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { RewardsHistory } from "./components/RewardsHistory";
import { RewardPointsCard } from "./components/RewardPointsCard";
import axios from "axios";
import api from "./lib/axios";
import { ScoreHistories } from "./components/ScoreHistories";

export interface RewardHistoryItem {
  id: number;
  rewardType: string;
  claimedAt: string;
}

export interface PlayHistoryItem {
  ptsReceived: number;
  playedAt: Date;
}

export default function Home() {
  const [view, setView] = useState<"score" | "history">("score");
  const [modalReward, setModalReward] = useState<boolean>(false);
  const [scores, setScores] = useState<number>(0);
  const [claimedRewards, setClaimedRewards] = useState<RewardHistoryItem[]>([]);
  const [userName, setUserName] = useState<string>("");
  const closeModal = () => setModalReward(false);

  const [scoreHistories, setScoreHistories] = useState<PlayHistoryItem[]>([]);


      const currentScore = async () => {
      try {
        const response = await api.get("/users/6");
        setUserName(response.data?.name ?? []);
        setScores(response.data?.totalScore ?? 0);
        setClaimedRewards(response.data?.rewardHistories ?? []);
        setScoreHistories(response.data?.playHistories ?? []);
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

   const reset = async() => {
    try {
      await api.patch("/users/6/reset");
      alert("รีเซ็ตคะแนนสำเร็จ")
      setScores(0);
      setClaimedRewards([]);
      setScoreHistories([]);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          console.error(
            "บันทึกไม่สำเร็จ",
            error.response?.data || error.message,
          );
        } else {
          console.error("เกิดข้อผิดพลาด", error);
      }   
    }
  } 

    



  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <main className="flex w-full  flex-col grow">
        <div className="bg-gray-200 w-full p-5 ">
          <div className="relative w-full border-3 rounded-2xl border-black bg-white overflow-hidden">
           <RewardPointsCard 
           modalReward={modalReward}
           setModalReward={setModalReward}
           scores={scores}
           onClose={closeModal}
           claimedRewards={claimedRewards}
           onSuccess={currentScore}
           username={userName}
           
           />
          </div>
        </div>

        
        <div className="flex justify-center items-center mt-6">
        <button 
        className="transition-transform duration-200 ease-out active:scale-90 w-fit rounded-full bg-blue-700 hover:bg-blue-600 font-bold text-xl mt-6 py-1 px-5 cursor-pointer"
        onClick={reset}>
          RESET
        </button>
        </div>
        <div className="text-gray-500  text-lg flex justify-start md:justify-center mt-10 mb-10 ml-4">
          <button
            className={`py-2 px-4 mr-4  border rounded-full cursor-pointer ${view === "score" ? "border border-red-500 text-red-500" : null}`}
            onClick={() => setView("score")}
          >
            ประวัติการเล่น
          </button>

          <button
            className={`py-2 px-4 border rounded-full cursor-pointer ${view === "history" ? "border border-red-500 text-red-500" : null}`}
            onClick={() => setView("history")}
          >
            ประวัติรางวัล
          </button>
        </div>
        {view === "score" ? 
        <ScoreHistories
        data={scoreHistories}

         /> : 
         <RewardsHistory 
         data={claimedRewards}
         />}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}
