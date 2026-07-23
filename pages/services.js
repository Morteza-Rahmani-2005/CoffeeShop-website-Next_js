function services() {
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid page-header mb-5 position-relative overlay-bottom">
        <div
          className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5"
          style={{ minHeight: "400px" }}
        >
          <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase">
            Services
          </h1>
          <div className="d-inline-flex mb-lg-5">
            <p className="m-0 text-white">
              <a className="text-white" href="#">
                Home
              </a>
            </p>
            <p className="m-0 text-white px-2">/</p>
            <p className="m-0 text-white">Services</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Service Start */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="section-title">
            <h4
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Our Services
            </h4>
            <h1 className="display-4">Fresh &amp; Organic Beans</h1>
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
                    <i className="fa fa-truck service-icon" />
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-coffee service-icon" />
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-award service-icon" />
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
                  <img
                    className="img-fluid mb-3 mb-sm-0"
                    src="img/service-4.jpg"
                    alt=""
                  />
                </div>
                <div className="col-sm-7">
                  <h4>
                    <i className="fa fa-table service-icon" />
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
      {/* Service End */}
    </div>
  );
}

export default services;
