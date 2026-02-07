import Image from "next/image";
import React, { useState } from "react";
import api from "../lib/axios";
import axios from "axios";
import { RewardHistoryItem } from "../page";


interface RewardProps {
  modalReward: boolean;
  setModalReward: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void;
  scores: number;
  claimedRewards: RewardHistoryItem[];
  onSuccess: () => void;
  username: string
}


export const RewardPointsCard = ({modalReward, setModalReward, scores, onClose, claimedRewards, onSuccess, username}: RewardProps) => {
  
  const maxScore = 10000;
  const endGame = Math.min(scores, maxScore, 10000);
  //ใส่คะแนนปัจจุบันหารด้วย maxScore คูณด้วย 100 เพื่อคำนวนเป็น % เพื่อเอาไว้ให้ progress bar ขยับตาม % ส่วน ,100 คือบอกว่าถ้า score ปัจจุบัน คำนวนออกมาเกิน 100% progress bas จะไม่เดินต่อแล้ว maxที่ 100%
  const progressPercent = Math.min((scores / maxScore) * 100, 100);

  const [selectedReward, setSelectedReward] =useState<string>("");
  const hasA = claimedRewards.some(r => r.rewardType === 'ได้รับรางวัล A');
  const isLockedA = scores < 5000 || hasA;
  const notClaimedA = !isLockedA

  const hasB = claimedRewards.some(r => r.rewardType === 'ได้รับรางวัล B');
  const isLockedB = scores < 7500 || hasB;
  const notClaimedB = !isLockedB

  const hasC = claimedRewards.some(r => r.rewardType === 'ได้รับรางวัล C');
  const isLockedC = scores < 10000 || hasC;
  const notClaimedC = !isLockedC

  
  const getReward = async (rewardType: string) => {

      try {
        const response = await api.post("/reward-histories", {
          rewardType: rewardType,
          claimedAt: new Date().toISOString(),
          userId: 6,
        });

        await onSuccess();
        setSelectedReward(rewardType)
        setModalReward(true)
        
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("บันทึกไม่สำเร็จ", error.response?.data || error.message);
        } else {
          console.error("เกิดข้อผิดพลาด", error);
        } 
      }
    };



  function TypeReward(reward:string) {
    switch(reward){
      case 'ได้รับรางวัล A':
        return "คุณได้รับรางวัล A";
      case 'ได้รับรางวัล B':
        return "คุณได้รับรางวัล B";
      case 'ได้รับรางวัล C':
        return "คุณได้รับรางวัล C"
      default:
      return "ไม่พบข้อมูลรางวัล";

    }
  }


   const formPopup = modalReward
    ? "max-h-screen opacity-100"
    : "max-h-0 opacity-0 overflow-hidden mt-0";

  return (
    <div className="relative">
      <div
      className={`fixed inset-0 z-50 flex items-start justify-center bg-opacity-80 overflow-y-auto p-4 mb-20  lg:mb-0 ${formPopup}`}
    >
      <div className="absolute w-full md:max-w-3xl top-1/4 p-10 rounded-2xl bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)] text-center">
      <button className="absolute text-gray-500 text-lg top-5 right-5 cursor-pointer hover:bg-red-200 py-2 px-4 rounded-xl"
      onClick={onClose}
      >X</button>
      <div className="flex justify-center items-center">
        <Image 
        src="/coin.png"
        alt="coin-reward"
        width={250}
        height={128}
        className="object-contain"
        />
      </div>
        <h2 className="text-black text-4xl mt-2">ยินดีด้วย</h2>
        <p className="text-black text-2xl mt-6">{TypeReward(selectedReward)}</p>
        <button className="w-[70%] text-2xl p-2 bg-amber-400 hover:bg-amber-300 font-bold mt-8 rounded-full cursor-pointer"
        onClick={onClose}>ปิด</button>
      </div>
    </div>
      <h3 className="mt-1 text-center text-gray-400">{username}</h3>

      <div className="absolute w-fit text-start py-2 px-6 bg-red-800 rounded-r-full cursor-pointer">
        แชร์คะแนน
      </div>

      <div className="text-black text-end mr-2">
        <p className="font-bold text-lg md:text-xl">สะสมคะแนน</p>
        <p className="font-semibold text-base md:text-lg mt-1">
          คะแนนครบ 10,000 รับรางวัลใหญ่
        </p>
        <p className="font-bold text-2xl text-red-500">{endGame}/10000</p>
      </div>

      <div className="w-full max-w-5xl px-8 py-14 bg-white -m-2 md:mx-auto">
          {/* checkpoint */}
          <div className="relative w-full mb-6 h-6 text-gray-400 text-sm font-bold">
            <span className="absolute left-[50%] -translate-x-1/2">5,000</span>
            <span className="absolute left-[75%] -translate-x-1/2">7,500</span>
            <span className="absolute left-full -translate-x-1/2">10,000</span>
          </div>

          {/* Progress */}
          <div className="relative w-full h-4 bg-gray-200 rounded-full">
            {/* มันเอาค่าจาก progressPercent มากำหนดค่าความกว้างของหลอด */}
          <div 
          className="absolute h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.6)]"
          style={{ width: `${progressPercent}%` }}
        /> 

        {/* Checkpoints 5,000 pts */}
          <div className={`absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white text-xs ${scores >= 5000 ? 'bg-green-700': 'bg-gray-400'}`}>
            ✓
          </div>

          {/* Checkpoints 7,500 pts */}
          <div className={`absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white text-xs ${scores >= 7500 ? 'bg-green-700': 'bg-gray-400'}`}>
            ✓
          </div>
          {/* Checkpoints 10,000 pts */}
          <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-12  rounded-full flex items-center justify-center ">
            
        <Image 
        src="/coin.png"
        alt="coin-reward"
        width={100}
        height={128}
        className="object-contain"
        />
          </div>

          {/* Current position // left: ${progressPercent}%: ส่วนนี้สั่งให้ลูกบอลสีแดงวิ่งไปวางตำแหน่งเดียวกับปลายหลอดสีส้ม */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-orange-200 shadow-orange-500/50 shadow-lg" style={{ left: `${progressPercent}%`}}></div>
          </div>   

          <div className="flex sm:justify-center md:justify-end mt-10 gap-4">
            <button 
            className={` text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full ${notClaimedA ? "bg-red-600 cursor-pointer transition-transform duration-200 ease-out active:scale-90" : "bg-gray-400"}`}
            onClick={() => getReward('ได้รับรางวัล A')}
            disabled={isLockedA}
            >{hasA ? "ได้รางวัล A แล้ว" : "กดรับรางวัล A"}</button>
            <button 
            className={` text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full ${notClaimedB ? "bg-red-600 cursor-pointer transition-transform duration-200 ease-out active:scale-90" : "bg-gray-400"}`}
            onClick={() => getReward('ได้รับรางวัล B')}
            disabled={isLockedB}
            >{hasB ? "ได้รางวัล B แล้ว" : "กดรับรางวัล B"}</button>
            <button 
            className={` text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full ${notClaimedC ? "bg-red-600 cursor-pointer transition-transform duration-200 ease-out active:scale-90" : "bg-gray-400"}`}
            onClick={() => getReward('ได้รับรางวัล C')}
            disabled={isLockedC}
            >{hasC ? "ได้รางวัล C แล้ว" : "กดรับรางวัล C"}</button>
      
  
            
            </div>

        </div>

        
    </div>
  );
};
