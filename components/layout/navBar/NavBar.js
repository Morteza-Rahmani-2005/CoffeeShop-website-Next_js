import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { LuShoppingCart } from 'react-icons/lu'
import ImageMenu1 from "@/public/img/menu-1.jpg"
export default function NavBar() {
    return (
        <div className="container-fluid p-0 nav-bar">
            <nav className="navbar navbar-expand-lg bg-none navbar-dark py-3 px-5 d-flex align-items-center justify-content-between">
                <Link href="/" className="navbar-brand px-lg-4 m-0">
                    <h1 className="m-0 display-4 text-uppercase text-white">
                        Next-Coffee
                    </h1>
                </Link>

                <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse d-flex justify-content-between"
                    id="navbarCollapse"
                >
                    <div className="navbar-nav ml-auto p-4 d-flex align-items-center gap-3">
                        <Link href="/" className="nav-item nav-link active">
                            Home
                        </Link>

                        <Link href="/about" className="nav-item nav-link">
                            About
                        </Link>

                        <Link href="/services" className="nav-item nav-link">
                            Services
                        </Link>

                        <Link href="/products" className="nav-item nav-link">
                            Menu
                        </Link>

                        <div className="nav-item dropdown d-flex align-items-center flex-column">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Pages
                            </a>

                            <div className="position-absolute p-3 d-flex flex-column gap-3">
                                <Link href="/reservation" className="dropdown-item">
                                    Reservation
                                </Link>

                                <Link href="/testimonial" className="dropdown-item">
                                    Testimonial
                                </Link>
                            </div>
                        </div>

                        <Link href="/contact" className="nav-item nav-link">
                            Contact
                        </Link>
                    </div>
                </div>


                <div className='d-flex gap-4'>


                    <div className='drop-cart'>
                        <span className='number-products'>
                            <LuShoppingCart />
                            <span>3</span>
                        </span>
                        <div className='d-flex flex-column gap-3 p-2'>
                            <div>
                                <div className='d-flex align-items-start gap-3'>
                                    <Image className='object-fit-cover' src={ImageMenu1} alt="User" width={1000} height={1000} />
                                    <div>
                                        <p className='fw-bold mb-2'>product name</p>
                                        <p className='price-product d-flex align-items-center gap-2'>
                                            <span>price:</span>
                                            <span>$5.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Link className='btn btn-primary w-100 text-white py-2 text-center fw-bold' href={"/shoppingCart"}>View Cart</Link>
                        </div>
                    </div>


                    <Link href={"/login"}>
                        <BiUserCircle />
                    </Link>
                </div>
            </nav>
        </div>
    )
}
