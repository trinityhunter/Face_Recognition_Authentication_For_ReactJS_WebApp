import React, { useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import NewsApp from "../NewsApp";
import Alert from "./Alert";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user",
  };

  const myStyle = {
    height: "100vh",
    width: "99vw",
    background: "linear-gradient(rgba(250,0,0,0.5),transparent",
    backgroundColor: "#F3AF8B",
  };

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const [emailo, setEmailo] = useState("");

  const [name, setName] = useState("");
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const makeName = emailo;
    console.log(`imageSrc = ${imageSrc}`);

    axios
      .post("http://127.0.0.1:5000/api", { data: imageSrc, data1: makeName })
      .then((res) => {
        console.log(`response = ${res.data}`);
        setName(res.data);
        res.data === "access"
          ? showAlert(
              `Welcome ${emailo} you are Logged In Successfully!!`,
              "success"
            )
          : showAlert(
              "Face Not Recognized, Please try again OR Register",
              "danger"
            );
      })
      .catch((error) => {
        console.log(`error = ${error}`);
      });
  }, [webcamRef, emailo]);

  const signUp = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const makeName = emailo;

    console.log(`imageSrc = ${imageSrc}`);

    axios
      .post("http://127.0.0.1:5000/add", { data: imageSrc, data1: makeName })
      .then((res) => {
        console.log(`response = ${res.data}`);
        setName(res.data + " Registered Successfully!!");
      })
      .catch((error) => {
        console.log(`error = ${error}`);
      });
  }, [webcamRef, emailo]);

  return (
    <div>
      {name === "access" ? (
        <div>
          <Alert alert={alert} />
          <NewsApp />
        </div>
      ) : (
        ""
      )}
      {name === "access" ? (
        ""
      ) : (
        <div style={myStyle}>
          <Alert alert={alert} />

          <div className="text-#6610f2 d-flex justify-content-center">
            <h2>Live Face Authentication</h2>
          </div>

          <div className="mt-2 d-flex justify-content-center">
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
          </div>
          <form className="mt-3 d-flex justify-content-center row g-3">
            <div className="col-auto">
              <input
                type="text"
                onChange={(e) => setEmailo(e.target.value)}
                className="form-control"
                placeholder="Enter you Email"
              />
            </div>
          </form>
          <div className="mt-5 d-flex justify-content-evenly">
            <button className="btn btn-success" onClick={capture}>
              Log In
            </button>
            <button className="btn btn-success" onClick={signUp}>
              Sign Up
            </button>
          </div>
          <div className="mt-4 d-flex justify-content-center">
            <h2>{name}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
