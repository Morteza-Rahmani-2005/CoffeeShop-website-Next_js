import React from 'react'

export default function FormReservation() {
    return (
        <div className="container-fluid my-5">
            <div className="container">
                <div className="reservation position-relative overlay-top overlay-bottom">
                    <div className="row align-items-center">
                        <div className="col-lg-6 my-5 my-lg-0">
                            <div className="p-5">
                                <div className="mb-4">
                                    <h1 className="display-3 text-white">30% OFF</h1>
                                    <h1 className="text-white">For Online Reservation</h1>
                                </div>
                                <p className="text-white">
                                    Lorem justo clita erat lorem labore ea, justo dolor lorem
                                    ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
                                    justo sed sed diam. Ea et erat ut sed diam sea
                                </p>
                                <ul className="list-inline text-white m-0">
                                    <li className="py-2">
                                        <i className="fa fa-check text-primary mr-3"></i>Lorem
                                        ipsum dolor sit amet
                                    </li>
                                    <li className="py-2">
                                        <i className="fa fa-check text-primary mr-3"></i>Lorem
                                        ipsum dolor sit amet
                                    </li>
                                    <li className="py-2">
                                        <i className="fa fa-check text-primary mr-3"></i>Lorem
                                        ipsum dolor sit amet
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div
                                className="text-center p-5"
                                style={{ background: "rgba(51, 33, 29, .8)" }}
                            >
                                <h1 className="text-white mb-4 mt-5">Book Your Table</h1>
                                <form className="form-reservation mb-5 d-flex align-items-center flex-column gap-3 w-100">
                                    <div className="form-group w-100">
                                        <input
                                            type="text"
                                            className="form-control bg-transparent p-2"
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group w-100">
                                        <input
                                            type="email"
                                            className="form-control bg-transparent p-2"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group w-100">
                                        <div
                                            className="date"
                                            id="date"
                                            data-target-input="nearest"
                                        >
                                            <input
                                                type="text"
                                                className="form-control bg-transparent p-2 datetimepicker-input"
                                                placeholder="Date"
                                                data-target="#date"
                                                data-toggle="datetimepicker"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group w-100">
                                        <div
                                            className="time"
                                            id="time"
                                            data-target-input="nearest"
                                        >
                                            <input
                                                type="text"
                                                className="form-control bg-transparent p-2 datetimepicker-input"
                                                placeholder="Time"
                                                data-target="#time"
                                                data-toggle="datetimepicker"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group w-100">
                                        <select
                                            className="custom-select bg-transparent p-2 w-100 text-white"
                                            defaultValue="Person"
                                            style={{ borderRadius: "8px" }}
                                        >
                                            <option value="Person" disabled>
                                                Person
                                            </option>
                                            <option value="1" className="bg-black">Person 1</option>
                                            <option value="2" className="bg-black">Person 2</option>
                                            <option value="3" className="bg-black">Person 3</option>
                                            <option value="4" className="bg-black">Person 4</option>
                                        </select>
                                    </div>

                                    <div className='w-100 d-flex'>
                                        <button
                                            className="btn btn-primary btn-block font-weight-bold py-2 px-4"
                                            type="submit"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
