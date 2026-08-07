import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import { useState } from "react";
import toast from "react-hot-toast";

function index() {
  const [userName, setUserName] = useState("");
  const [userNameId, setUserNameId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handlerFormLogin(e) {
    e.preventDefault();
    const dataForm = {
      userName,
      userNameId,
      email,
      password,
    };
    try {
      const res = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      if (res.status == 406) {
        toast.error("Email and username have already been used.");
      }

      if (res.status == 201) {
        toast.success("Your registration was successful.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <HeaderPages namePage="New registration" />

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
                        placeholder="Name"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
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
                        type="email"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

export default index;
