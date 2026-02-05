import React, { FC } from "react";

export const RewardPoints: FC = () => {
  const currentScore = 8500;
  const maxScore = 10000;
  // คำนวณเปอร์เซ็นต์สำหรับหลอด
  const progressPercent = (currentScore / maxScore) * 100;
  return (
    <div>
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
          <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full border-4 border-orange-300 flex items-center justify-center shadow-lgtext-white text-xs">
            <span className="text-xl">👑</span>
          </div>

          {/* Current position */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-orange-200 shadow-orange-500/50 shadow-lg" style={{ left: `${progressPercent}%`}}></div>
          </div>   

          <div className="flex sm:justify-center md:justify-end mt-10 gap-4">
            <button className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90">ได้รางวัล A แล้ว</button>
            <button className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90">กดรับรางวัล B</button>
            <button className="bg-red-600 text-white font-bold text-sm md:text-base p-1 md:p-2 rounded-full cursor-pointer transition-transform duration-200 ease-out active:scale-90">กดรับรางวัล C</button>
            </div>       
        </div>

        
    </div>
  );
};
