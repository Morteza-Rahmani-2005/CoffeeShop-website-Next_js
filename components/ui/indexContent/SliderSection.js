import React from 'react'
import carousel1 from "@/public/img/carousel-1.jpg"
import carousel2 from "@/public/img/carousel-2.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
export default function SliderSection() {
    return (
        <div className="container-fluid p-0 mb-5">
            <div
                id="blog-carousel"
                className="carousel slide overlay-bottom"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <Swiper
                        navigation={true}
                        speed={800}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                    >

                        <SwiperSlide className="overflow-hidden relative">
                            <div className="carousel-item active relative h-full w-full">

                                <div
                                    className="w-full h-full absolute inset-0"
                                    data-swiper-parallax="-20%"
                                >
                                    <Image width={1000} height={1000} className="w-100 h-100 object-cover" src={carousel1} alt="Image" />
                                </div>


                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center w-100 gap-4 relative z-10">
                                    <h2 className="font-weight-medium m-0" data-swiper-parallax="-300" data-swiper-parallax-duration="600">
                                        We Have Been Serving
                                    </h2>
                                    <h1 className="display-1 text-white m-0" data-swiper-parallax="-200">
                                        COFFEE
                                    </h1>
                                    <h2 className="text-white m-0" data-swiper-parallax="-100">
                                        * SINCE 1950 *
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide className="overflow-hidden relative">
                            <div className="carousel-item relative h-full w-full">

                                <div
                                    className="w-full h-full absolute inset-0"
                                    data-swiper-parallax="-20%"
                                >
                                    <Image width={1000} height={1000} className="w-100 h-100 object-cover" src={carousel2} alt="Image" />
                                </div>

                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center w-100 gap-4 relative z-10">
                                    <h2 className="font-weight-medium m-0" data-swiper-parallax="-300" data-swiper-parallax-duration="600">
                                        We Have Been Serving
                                    </h2>
                                    <h1 className="display-1 text-white m-0" data-swiper-parallax="-200">
                                        COFFEE
                                    </h1>
                                    <h2 className="text-white m-0" data-swiper-parallax="-100">
                                        * SINCE 1950 *
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
