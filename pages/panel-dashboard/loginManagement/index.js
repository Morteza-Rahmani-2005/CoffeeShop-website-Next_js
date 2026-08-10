import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

function index() {
  const [userNameId, setUserNameId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rout = useRouter();

  async function handlerFormLogin(e) {
    e.preventDefault();

    const dataForm = {
      userNameId,
      email,
      password,
    };

    try {
      const res = await fetch("/api/UserManagement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      if (res.status == 401) {
        toast.error("The information entered is incorrect.");
      } else {
        rout.push("/panel-dashboard/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid login-Management vh-100 row p-0">
      <div
        className="col-6 h-100 p-0 m-0"
        style={{ background: "rgba(51, 33, 29, .8)" }}
      >
        <h1 className="text-white">Welcome to the Management Portal</h1>
        <p className="text-white">
          Secure, efficient, and streamlined access to your system controls.
        </p>
      </div>

      <div className="col-6 h-100 p-0 m-0 bg-white">
        <div className="text-center p-5 h-100 w-100">
          <form
            onSubmit={handlerFormLogin}
            className="h-100 form-reservation mb-5 d-flex justify-content-center  align-items-center flex-column gap-3 w-100"
          >
            <h1 className="text-black mb-4 mt-5">LOG IN Management</h1>
            <div className="form-group w-100">
              <input
                type="text"
                className="form-control bg-transparent p-3 text-black w-100"
                placeholder="User Id"
                required
                value={userNameId}
                onChange={(e) => setUserNameId(e.target.value)}
              />
            </div>

            <div className="form-group w-100">
              <input
                type="Email"
                className="form-control bg-transparent p-3 text-black"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group w-100">
              <input
                type="password"
                className="form-control bg-transparent p-3 text-black"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary btn-block font-weight-bold py-3 px-5"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default index;
