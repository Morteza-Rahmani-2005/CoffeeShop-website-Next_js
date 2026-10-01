import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function index() {
  const [userNameId, setUserNameId] = useState("");
  const [password, setPassword] = useState("");

  async function handlerFormLogin(e) {
    e.preventDefault();

  }

  return (
    <div>
      <HeaderPages namePage="Login to your account" />

      <div className="container-fluid my-5">
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="reservation position-relative overlay-top overlay-bottom mx-auto">
            <div className="row align-items-center">
              <div className="col-12">
                <div
                  className="text-center p-5"
                  style={{ background: "rgba(51, 33, 29, .8)" }}
                >
                  <h1 className="text-white mb-4 mt-5">LOG IN</h1>
                  <form
                    onSubmit={handlerFormLogin}
                    className="form-reservation mb-5 d-flex align-items-center flex-column gap-3 w-100"
                  >
                    <div className="form-group w-100">
                      <input
                        type="text"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="User Id"
                        required
                        value={userNameId}
                        onChange={(e) => setUserNameId(e.target.value)}
                      />
                    </div>

                    <div className="form-group w-100">
                      <input
                        type="password"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="w-100 d-flex align-items-center justify-content-between">
                      <Link
                        href={"/newUserLogin"}
                        className="text-white fw-bold"
                      >
                        New registration...?
                      </Link>

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
