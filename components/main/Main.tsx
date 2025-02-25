import React from "react";
import foto1 from "../../public/img/124434370.jpeg";
import style from "../main/main.module.scss";
import GetMainForUI from "@/types/MainTypes/GetMainForUI";


const DefaultContent = () => (
  <section
    style={{
      backgroundImage: `url(${foto1.src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
    className={`${style.bg_mainColor} z-10 bg-no-repeat w-full h-[100vh]`}
  >
    <div className={`${style.bg_mainColor} opacity-85 overlay w-full h-full flex justify-start items-center`}>
      <div className="w-full">
        <div className="text-white ps-5">
          <h1 className="text-[80px] lg:text-[120px]">Hello</h1>
          <h5 className="text-[35px] lg:text-[84px]">My Name Is Tahir Muradov</h5>
          <span className="text-[10px] lg:text-[25px]">Full Stack Web Developer (C#)</span>
        </div>
      </div>
    </div>
  </section>
);

const Main= async ({mainData}:{mainData:GetMainForUI|null}) => {

  if (!mainData) {
    return <DefaultContent />;
  }

  return (
    <section
      style={{
        backgroundImage: `url(${foto1.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={`${style.bg_mainColor} z-10 bg-no-repeat w-full h-[100vh]`}
    >
      <div className={`${style.bg_mainColor} opacity-85 overlay w-full h-full flex justify-start items-center`}>
        <div className="w-full">
          <div className="text-white ps-5">
            <h1 className="text-[80px] tex-[50px] lg:text-[100px]">{mainData.title}</h1>
            <span className="text-[10px] lg:text-[25px]">{mainData.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
