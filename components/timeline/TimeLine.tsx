
import React from "react";
export interface TimeLineProps{
  title: string;
  description: string;
  startTime:Date,
  endDate:Date,
  academyName:string|null

}
const Timeline:React.FC<{props:TimeLineProps[],bgColor:string}> = ({props,bgColor}) => {
  return (
    <div className={`flex flex-col items-center ${bgColor} text-white p-8`}>
      <div className="relative w-full max-w-2xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-teal-500 h-full"></div>
{
  props.map((item, index) => (

   index%2==0?
   <div className="relative flex items-center mb-8" key={index}>
   <div className="dot absolute left-1/2 transform -translate-x-1/2 w-8 h-8 border-4 border-teal-500 rounded-full flex items-center justify-center">
     <div className="chieldDot w-4 h-4 bg-teal-500 rounded-full"></div>
   </div>
   <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
     <h3 className="text-teal-400 text-lg font-bold">{item.title}</h3>
     <p className="text-sm">{item.startTime.toLocaleDateString()} - {item.endDate.toLocaleDateString()} {item.academyName??` | ${item.academyName}` } </p>
     <p className="text-xs mt-2">{item.description}</p>
   </div>
 </div>
   :  <div className="relative flex items-center mb-8 flex-row-reverse text-right" key={index}>
   <div className="dot absolute left-1/2 transform -translate-x-1/2 w-8 h-8 border-4 border-teal-500 rounded-full flex items-center justify-center">
     <div className="chieldDot w-4 h-4 bg-teal-500 rounded-full"></div>
   </div>
   <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
     <h3 className="text-teal-400 text-lg font-bold">{item.title}</h3>
     <p className="text-sm">{item.academyName!=null?`${item.academyName} | `:`` }{item.startTime.toLocaleDateString()} - {item.endDate.toLocaleDateString()} </p>
     <p className="text-xs mt-2">{item.description}</p>
   </div>
 </div>
  ))
}
       

      
      </div>
    </div>
  );
};

export default Timeline;
