import React,{ useEffect, useState } from 'react'
import { RewardHistoryItem } from '../page';

interface RewardsHistoryProps {
  data: RewardHistoryItem[];
}

export const RewardsHistory = ({data}: RewardsHistoryProps) => {

  return (
    <>
      {data && data.length > 0 ? (
        <div className="border border-gray-400 rounded-lg overflow-hidden">
      {data.map((item, index) => (
      <div key={index} className={`flex justify-start md:justify-center items-center text-black gap-8  p-5 hover:bg-gray-100 ${index !== 0 ? 'border-t border-gray-400' : '' }`}>
        <div className="bg-violet-500 px-8 py-8 rounded-full "></div>

       
          <div className="text-center font-bold text-xl">
            {item.rewardType}<div className="text-gray-400 font-medium">ได้รับเมื่อ {new Date(item.claimedAt).toLocaleString()}

            </div>
          </div>        
      </div>
      
      ))}
      </div>
      ): (
        <div className="text-center mt-10 text-gray-500">ยังไม่มีประวัติการเล่น</div>
      )}
    </>
  );
};
