import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import React from "react";

export default function index() {
  return (
    <div>
      <HeaderPages namePage="Log in" />

      <div className="container-fluid my-5">
        <div className="container">
          <div className="reservation position-relative overlay-top overlay-bottom mx-auto">
            <div className="row align-items-center">
              <div className="col-12">
                <div
                  className="text-center p-5"
                  style={{ background: "rgba(51, 33, 29, .8)" }}
                >
                  <h1 className="text-white mb-4 mt-5">LOG IN</h1>
                  <form className="form-reservation mb-5 d-flex align-items-center flex-column gap-3 w-100">
                    <div className="form-group w-100">
                      <input
                        type="text"
                        className="form-control bg-transparent p-3"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="form-group w-100">
                      <input
                        type="email"
                        className="form-control bg-transparent p-3"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group w-100">
                      <input
                        type="password"
                        className="form-control bg-transparent p-3"
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="w-100 d-flex">
                      <button
                        className="btn btn-primary btn-block font-weight-bold py-2 px-4"
                        type="submit"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
