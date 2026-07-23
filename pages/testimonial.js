function testimonial() {
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid page-header mb-5 position-relative overlay-bottom">
        <div
          className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5"
          style={{ minHeight: "400px" }}
        >
          <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase">
            Testimonial
          </h1>
          <div className="d-inline-flex mb-lg-5">
            <p className="m-0 text-white">
              <a className="text-white" href="#">
                Home
              </a>
            </p>
            <p className="m-0 text-white px-2">/</p>
            <p className="m-0 text-white">Testimonial</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Testimonial Start */}
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
                <div className="ms-3">
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
                <div className="ms-3">
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
                <div className="ms-3">
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
                <div className="ms-3">
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
      {/* Testimonial End */}
    </div>
  );
}

export default testimonial;
