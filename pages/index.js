import Link from "next/link";
function Index() {
  return (
    <div>
      <div className="container-fluid p-0 mb-5">
        <div
          id="blog-carousel"
          className="carousel slide overlay-bottom"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <h2 className="text-primary font-weight-medium m-0">
                  We Have Been Serving
                </h2>
                <h1 className="display-1 text-white m-0">COFFEE</h1>
                <h2 className="text-white m-0">* SINCE 1950 *</h2>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <h2 className="text-primary font-weight-medium m-0">
                  We Have Been Serving
                </h2>
                <h1 className="display-1 text-white m-0">COFFEE</h1>
                <h2 className="text-white m-0">* SINCE 1950 *</h2>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#blog-carousel"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a
            className="carousel-control-next"
            href="#blog-carousel"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              About Us
            </h4>
            <h1 className="display-4">Serving Since 1950</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 py-0 py-lg-5">
              <h1 className="mb-3">Our Story</h1>
              <h5 className="mb-3">
                Eos kasd eos dolor vero vero, lorem stet diam rebum. Ipsum amet
                sed vero dolor sea
              </h5>
              <p>
                Takimata sed vero vero no sit sed, justo clita duo no duo amet
                et, nonumy kasd sed dolor eos diam lorem eirmod. Amet sit amet
                amet no. Est nonumy sed labore eirmod sit magna. Erat at est
                justo sit ut. Labor diam sed ipsum et eirmod
              </p>
              <a
                href=""
                className="btn btn-secondary font-weight-bold py-2 px-4 mt-2"
              >
                Learn More
              </a>
            </div>
            <div
              className="col-lg-4 py-5 py-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src="img/about.png"
                  alt="About"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-4 py-0 py-lg-5">
              <h1 className="mb-3">Our Vision</h1>
              <p>
                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
                Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor
              </p>
              <h5 className="mb-3">
                <i className="fa fa-check text-primary mr-3"></i>Lorem ipsum
                dolor sit amet
              </h5>
              <h5 className="mb-3">
                <i className="fa fa-check text-primary mr-3"></i>Lorem ipsum
                dolor sit amet
              </h5>
              <h5 className="mb-3">
                <i className="fa fa-check text-primary mr-3"></i>Lorem ipsum
                dolor sit amet
              </h5>
              <a
                href=""
                className="btn btn-primary font-weight-bold py-2 px-4 mt-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-truck service-icon"></i>Fastest Door
                    Delivery
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-coffee service-icon"></i>Fresh Coffee
                    Beans
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-award service-icon"></i>Best Quality
                    Coffee
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-4.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-table service-icon"></i>Online Table
                    Booking
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
      <div className="offer container-fluid my-5 py-5 text-center position-relative overlay-top overlay-bottom">
        <div className="container py-5">
          <h1 className="display-3 text-primary mt-3">50% OFF</h1>
          <h1 className="text-white mb-3">Sunday Special Offer</h1>
          <h4 className="text-white font-weight-normal mb-4 pb-3">
            Only for Sunday from 1st Jan to 30th Jan 2045
          </h4>
          <form className="form-inline justify-content-center mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control p-4"
                placeholder="Your Email"
                style={{ height: "60px" }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary font-weight-bold px-4"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Menu & Pricing
            </h4>
            <h1 className="display-4">Competitive Pricing</h1>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h1 className="mb-5">Hot Coffee</h1>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-1.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$5</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Black Coffee</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-2.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$7</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Chocolete Coffee</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-3.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$9</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Coffee With Milk</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h1 className="mb-5">Cold Coffee</h1>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-1.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$5</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Black Coffee</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-2.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$7</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Chocolete Coffee</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>

              <div className="row align-items-center mb-5">
                <div className="col-4 col-sm-3">
                  <img
                    className="w-100 rounded-circle mb-3 mb-sm-0"
                    src="img/menu-3.jpg"
                    alt=""
                  />
                  <h5 className="menu-price">$9</h5>
                </div>
                <div className="col-8 col-sm-9">
                  <h4>Coffee With Milk</h4>
                  <p className="m-0">
                    Sit lorem ipsum et diam elitr est dolor sed duo guberg sea
                    et et lorem dolor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5">
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
                          data-toggle="datetimepicker"
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
                          data-toggle="datetimepicker"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select bg-transparent border-primary px-4"
                        style={{ height: "49px" }}
                        defaultValue=""
                      >
                        <option value="" disabled>
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
      <div className="container-fluid py-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Testimonial
            </h4>
            <h1 className="display-4">Our Clients Say</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="testimonial-item">
              <div className="d-flex align-items-center mb-3">
                <img className="img-fluid" src="img/testimonial-1.jpg" alt="" />
                <div className="ml-3">
                  <h4>Client Name</h4>
                  <i>Profession</i>
                </div>
              </div>
              <p className="m-0">
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum sanct clita
              </p>
            </div>

            <div className="testimonial-item">
              <div className="d-flex align-items-center mb-3">
                <img className="img-fluid" src="img/testimonial-2.jpg" alt="" />
                <div className="ml-3">
                  <h4>Client Name</h4>
                  <i>Profession</i>
                </div>
              </div>
              <p className="m-0">
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum sanct clita
              </p>
            </div>

            <div className="testimonial-item">
              <div className="d-flex align-items-center mb-3">
                <img className="img-fluid" src="img/testimonial-3.jpg" alt="" />
                <div className="ml-3">
                  <h4>Client Name</h4>
                  <i>Profession</i>
                </div>
              </div>
              <p className="m-0">
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum sanct clita
              </p>
            </div>

            <div className="testimonial-item">
              <div className="d-flex align-items-center mb-3">
                <img className="img-fluid" src="img/testimonial-4.jpg" alt="" />
                <div className="ml-3">
                  <h4>Client Name</h4>
                  <i>Profession</i>
                </div>
              </div>
              <p className="m-0">
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum sanct clita
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
