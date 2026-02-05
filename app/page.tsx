"use client";
import Image from "next/image";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { ScoreView } from "./components/ScoreView";
import { HistoryView } from "./components/HistoryView";
import { RewardPoints } from "./components/RewardPoints";

// interface Data {

// }
export default function Home() {
  const [view, setView] = useState<"score" | "history">("score");
  

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white mb-30">
      <main className="flex w-full  flex-col grow">
        <div className="bg-gray-200 w-full p-5 ">
          <div className="relative w-full border-3 rounded-2xl border-black bg-white overflow-hidden">
           <RewardPoints />
          </div>
        </div>
        <button className="flex justify-center items-center transition-transform duration-200 ease-out active:scale-90">
          <h3 className="w-fit rounded-full bg-blue-700 hover:bg-blue-600 font-bold text-xl mt-6 py-1 px-5 cursor-pointer">
            RESET
          </h3>
        </button>
        <div className="text-gray-500  text-lg flex justify-start md:justify-center mt-10">
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
        {view === "score" ? <ScoreView /> : <HistoryView />}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}
