import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

function Index() {
  const [userName, setUserName] = useState("");
  const [userNameId, setUserNameId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  async function handlerFormLogin(e) {
    e.preventDefault();
    const dataForm = {
      userName,
      userNameId,
      email,
      password,
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForm)
      })
      if (res.status === 201) {
        setUserName("")
        setUserNameId("")
        setEmail("")
        setPassword("")

        toast.success("The user was successfully registered.")


        router.replace("/")
      }

      if (res.status === 422) {
        toast.error("Filling in all fields is mandatory.")
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
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="form-group w-100">
                      <input
                        type="text"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="User Id"
                        value={userNameId}
                        onChange={(e) => setUserNameId(e.target.value)}
                      />
                    </div>
                    <div className="form-group w-100">
                      <input
                        type="email"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group w-100">
                      <input
                        type="password"
                        className="form-control bg-transparent p-3 text-white"
                        placeholder="Password"
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

export default Index;
