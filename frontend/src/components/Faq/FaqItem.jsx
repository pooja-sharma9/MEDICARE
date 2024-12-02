import { useState } from "react";
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
// import React from 'react';

const FaqItem = ({ item }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () =>{
        setIsOpen(!isOpen)
    }
    return (
        <div className="p-1 lg:p-3 rounded-[10px] border border-solid border-[#D9DCE2] mb-3 cursor-pointer">
            <div className="flex items-center justify-between gap-5" onClick={toggleAccordion}>
                <h4 className="text-[15px] leading-7 lg:text-[18px] lg:leading-8 text-headingColor">
                    {item.question}
                </h4>

                <div className={`${isOpen ? "bg-primaryColor text-white border-none" : ""} w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}>
                    {isOpen ? <AiOutlineMinus/> : <AiOutlinePlus/>}
                </div>
            </div>

            {isOpen && <div className="mt-4">
                <p className="text-[12px] leading-6 lg:text-[14px] lg:leading-7 font-[400] text-textColor">{item.content}</p>
                </div>}
        </div>
        
    );
};

export default FaqItem;