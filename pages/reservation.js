function reservation() {
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid page-header mb-5 position-relative overlay-bottom">
        <div
          className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5"
          style={{ minHeight: "400px" }}
        >
          <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase">
            Reservation
          </h1>
          <div className="d-inline-flex mb-lg-5">
            <p className="m-0 text-white">
              <a className="text-white" href="#">
                Home
              </a>
            </p>
            <p className="m-0 text-white px-2">/</p>
            <p className="m-0 text-white">Reservation</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Reservation Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="reservation position-relative overlay-top overlay-bottom">
            <div className="row align-items-center">
              <div className="col-lg-6 my-5 my-lg-0">
                <div className="p-5">
                  <div className="mb-4">
                    <h1 className="display-3 text-primary">30% OFF</h1>
                    <h1 className="text-white">For Online Reservation</h1>
                  </div>

                  <p className="text-white">
                    Lorem justo clita erat lorem labore ea, justo dolor lorem
                    ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat
                    justo sed sed diam. Ea et erat ut sed diam sea
                  </p>

                  <ul className="list-inline text-white m-0">
                    <li className="py-2">
                      <i className="fa fa-check text-primary me-3" />
                      Lorem ipsum dolor sit amet
                    </li>
                    <li className="py-2">
                      <i className="fa fa-check text-primary me-3" />
                      Lorem ipsum dolor sit amet
                    </li>
                    <li className="py-2">
                      <i className="fa fa-check text-primary me-3" />
                      Lorem ipsum dolor sit amet
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

                  <form className="mb-5">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent border-primary p-4"
                        placeholder="Name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control bg-transparent border-primary p-4"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <div
                        className="date"
                        id="date"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-transparent border-primary p-4 datetimepicker-input"
                          placeholder="Date"
                          data-target="#date"
                          data-bs-toggle="datetimepicker"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div
                        className="time"
                        id="time"
                        data-target-input="nearest"
                      >
                        <input
                          type="text"
                          className="form-control bg-transparent border-primary p-4 datetimepicker-input"
                          placeholder="Time"
                          data-target="#time"
                          data-bs-toggle="datetimepicker"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <select
                        className="custom-select bg-transparent border-primary px-4"
                        style={{ height: "49px" }}
                        defaultValue="Person"
                      >
                        <option value="Person" disabled>
                          Person
                        </option>
                        <option value="1">Person 1</option>
                        <option value="2">Person 2</option>
                        <option value="3">Person 3</option>
                        <option value="4">Person 4</option>
                      </select>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary btn-block font-weight-bold py-3"
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
      {/* Reservation End */}
    </div>
  );
}

export default reservation;
