import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import patientAvatar from '../../assets/images/patient-avatar.png';
import men1Image from '../../assets/images/men1.jpg';
import men2Image from '../../assets/images/men2.jpg';
import women1Image from '../../assets/images/women1.jpg';
import women2Image from '../../assets/images/women2.jpg';
import { HiStar } from 'react-icons/hi';
// swiper": " ^ 11.1.9"

const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }} >

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={men1Image} alt="" />
                        </div>
                        <div>
                            <h4 className='text-[18px] mt-4 leading-[35px] font-semibold text-headingColor'>John Doe</h4>
                            <div className='flex items-center gap-[2px] mt-1'>
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                            </div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                "The medical services here are fantastic! I feel well cared for and treated with the utmost respect."
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={men2Image} alt="" />
                        </div>
                        <div>
                            <h4 className='text-[18px] mt-4 leading-[35px] font-semibold text-headingColor'>Jane Smith</h4>
                            <div className='flex items-center gap-[2px] mt-1'>
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                            </div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                "I had a great experience, and the staff is very attentive. I highly recommend their services."
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={women1Image} alt="" />
                        </div>
                        <div>
                            <h4 className='text-[18px] mt-4 leading-[35px] font-semibold text-headingColor'>Jimmy</h4>
                            <div className='flex items-center gap-[2px] mt-1'>
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                            </div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                "Excellent treatment! The doctors and nurses are very professional and kind."
                            </p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <img src={women2Image} alt="" />
                        </div>
                        <div>
                            <h4 className='text-[18px] mt-4 leading-[30px] font-semibold text-headingColor'>Alice</h4>
                            <div className='flex items-center gap-[2px] mt-1'>
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                                <HiStar className='text-yellowColor w-[18px] h-4 ' />
                            </div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                "I’m very pleased with the care I received. The staff is friendly and knowledgeable."
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonial;

