import React from 'react'
import { AiOutlineCoffee } from 'react-icons/ai'
import ImageService1 from "@/public/img/service-1.jpg"
import ImageService2 from "@/public/img/service-2.jpg"
import ImageService3 from "@/public/img/service-3.jpg"
import ImageService4 from "@/public/img/service-4.jpg"
import Image from 'next/image'
import { BsAward, BsFillTruckFrontFill, BsTable } from 'react-icons/bs'

export default function servicesContent() {
    return (
        <div className="container-fluid pt-5">
            <div className="container">
                <div className="section-title">
                    <h4
                        className="text-uppercase"
                        style={{ letterSpacing: "5px" }}
                    >
                        Our Services
                    </h4>
                    <h1 className="display-4">Fresh & Organic Beans</h1>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <Image
                                    className="img-fluid mb-3 mb-sm-0"
                                    src={ImageService1}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="col-sm-7">
                                <h4>
                                    <span className='service-icon'>
                                        <BsFillTruckFrontFill />
                                    </span>
                                    Fastest Door Delivery
                                </h4>
                                <p className="m-0">
                                    Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea
                                    et et lorem dolor sed est sit invidunt, dolore tempor diam
                                    ipsum takima erat tempor
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <Image
                                    className="img-fluid mb-3 mb-sm-0"
                                    src={ImageService2}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="col-sm-7">
                                <h4>
                                    <span className='service-icon'>
                                        <AiOutlineCoffee />
                                    </span>
                                    Fresh Coffee Beans
                                </h4>
                                <p className="m-0">
                                    Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea
                                    et et lorem dolor sed est sit invidunt, dolore tempor diam
                                    ipsum takima erat tempor
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <Image
                                    className="img-fluid mb-3 mb-sm-0"
                                    src={ImageService3}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="col-sm-7">
                                <h4>
                                    <span className='service-icon'>
                                        <BsAward />
                                    </span>
                                    Best Quality Coffee
                                </h4>
                                <p className="m-0">
                                    Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea
                                    et et lorem dolor sed est sit invidunt, dolore tempor diam
                                    ipsum takima erat tempor
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <Image
                                    className="img-fluid mb-3 mb-sm-0"
                                    src={ImageService4}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="col-sm-7">
                                <h4>
                                    <span className='service-icon'>
                                        <BsTable />
                                    </span>
                                    Online Table Booking
                                </h4>
                                <p className="m-0">
                                    Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea
                                    et et lorem dolor sed est sit invidunt, dolore tempor diam
                                    ipsum takima erat tempor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
