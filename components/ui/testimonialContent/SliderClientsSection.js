
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';



import ImageTestimonial1 from "@/public/img/testimonial-1.jpg"
import ImageTestimonial2 from "@/public/img/testimonial-2.jpg"
import ImageTestimonial3 from "@/public/img/testimonial-3.jpg"
import ImageTestimonial4 from "@/public/img/testimonial-4.jpg"
export default function SliderClientsSection() {
    return (
        <div className="sectrion-clients container-fluid py-5">
            <div className="container">
                <div className="section-title">
                    <h4
                        className="text-uppercase"
                        style={{ letterSpacing: "5px" }}
                    >
                        Testimonial
                    </h4>
                    <h1 className="display-4">Our Clients Say</h1>
                </div>
                <div className="">
                    <Swiper
                        navigation={true}
                        speed={800}
                        slidesPerView={3}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
                            },
                        }}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide className="overflow-hidden relative">
                            <div className="testimonial-item w-100 h-100 d-flex align-items-center justify-content-center">
                                <div className="">
                                    <div className='w-100 d-flex align-items-center gap-3'>
                                        <Image width={100} height={100} className="img-fluid" src={ImageTestimonial1} alt="" />
                                        <div>
                                            <h4>Client Name</h4>
                                            <i>Profession</i>
                                        </div>
                                    </div>


                                    <p className="m-0 p-4">
                                        Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                                        eirmod clita lorem. Dolor tempor ipsum sanct clita
                                    </p>

                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="overflow-hidden relative">
                            <div className="testimonial-item w-100 h-100 d-flex align-items-center justify-content-center">
                                <div className="">
                                    <div className='w-100 d-flex align-items-center gap-3'>
                                        <Image width={100} height={100} className="img-fluid" src={ImageTestimonial2} alt="" />
                                        <div>
                                            <h4>Client Name</h4>
                                            <i>Profession</i>
                                        </div>
                                    </div>


                                    <p className="m-0 p-4">
                                        Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                                        eirmod clita lorem. Dolor tempor ipsum sanct clita
                                    </p>

                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="overflow-hidden relative">
                            <div className="testimonial-item w-100 h-100 d-flex align-items-center justify-content-center">
                                <div className="">
                                    <div className='w-100 d-flex align-items-center gap-3'>
                                        <Image width={100} height={100} className="img-fluid" src={ImageTestimonial3} alt="" />
                                        <div>
                                            <h4>Client Name</h4>
                                            <i>Profession</i>
                                        </div>
                                    </div>


                                    <p className="m-0 p-4">
                                        Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                                        eirmod clita lorem. Dolor tempor ipsum sanct clita
                                    </p>

                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="overflow-hidden relative">
                            <div className="testimonial-item w-100 h-100 d-flex align-items-center justify-content-center">
                                <div className="">
                                    <div className='w-100 d-flex align-items-center gap-3'>
                                        <Image width={100} height={100} className="img-fluid" src={ImageTestimonial4} alt="" />
                                        <div>
                                            <h4>Client Name</h4>
                                            <i>Profession</i>
                                        </div>
                                    </div>


                                    <p className="m-0 p-4">
                                        Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                                        eirmod clita lorem. Dolor tempor ipsum sanct clita
                                    </p>

                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
