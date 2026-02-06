import Image from "next/image";
import React, { useState } from "react";


interface RewardProps {
  modalReward: boolean;
  setModalReward: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void;
}

export const RewardPointsCard = ({modalReward, setModalReward, onClose}: RewardProps) => {
  const currentScore = 8500;
  const maxScore = 10000;
  // คำนวณเปอร์เซ็นต์สำหรับหลอด
  const progressPercent = (currentScore / maxScore) * 100;

  const [selectedReward, setSelectedReward] =useState<string>("");

  function TypeReward(reward:string) {
    switch(reward){
      case 'rewardA':
        return "คุณได้รับรางวัล A";
      case 'rewardB':
        return "คุณได้รับรางวัล B";
      case 'rewardC':
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
      <h3 className="mt-1 text-center text-gray-400">ชื่อ-นามสกุล</h3>

      <div className="absolute w-fit text-start py-2 px-6 bg-red-800 rounded-r-full cursor-pointer">
        แชร์คะแนน
      </div>

      <div className="text-black text-end mr-2">
        <p className="font-bold text-lg md:text-xl">สะสมคะแนน</p>
        <p className="font-semibold text-base md:text-lg mt-1">
          คะแนนครบ 10,000 รับรางวัลใหญ่
        </p>
        <p className="font-bold text-2xl text-red-500">8,500/10,000</p>
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
            <div 
          className="absolute h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Checkpoints 5,000 pts */}
          <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-700 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">
            ✓
          </div>

          {/* Checkpoints 7,500 pts */}
          <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400 rounded-full border-4 border-white flex items-center justify-center text-white text-xs">
            ✓
          </div>
          {/* Checkpoints 10,000 pts */}
          <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full border-4 border-orange-300 flex items-center justify-center shadow-lg text-white text-xs">
            <span className="text-xl">👑</span>
          </div>

          {/* Current position */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-orange-200 shadow-orange-500/50 shadow-lg" style={{ left: `${progressPercent}%`}}></div>
          </div>   

          <div className="flex sm:justify-center md:justify-end mt-10 gap-4">
            <button 
            className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90"
            onClick={() => {setModalReward(true)
              setSelectedReward('rewardA')
            }
            }
            >ได้รางวัล A แล้ว</button>
            <button 
            className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90"
            onClick={() => {setModalReward(true)
              setSelectedReward('rewardB')
            }
            }
            >กดรับรางวัล B</button>
            <button 
            className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90"
            onClick={() => {setModalReward(true)
              setSelectedReward('rewardC')
            }
            }>กดรับรางวัล C</button>
      
  
            
            </div>

        </div>

        
    </div>
  );
};
