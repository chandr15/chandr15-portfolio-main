import React, { useState, useEffect, useContext } from "react";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import Social from "./Social";
import FallbackSpinner from "./FallbackSpinner";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const styles = {
  inlineChild: {
    display: "inline-block",
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for the text container
    padding: "20px", // Adjust padding as needed
    borderRadius: "10px", // Add rounded corners to the text container
  },
  mainContainer: {
    height: "calc(100vh - 56.8px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    position: "relative",
  },
  watermark: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "10rem",
    position: "fixed",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: -10,
    opacity: 0.1 / 2,
    color: "black",
    textShadow:
      "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
  },
  sideArt: {
    position: "absolute",
    right: 0,
    opacity: 1,
  },
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cta: {
    borderRadius: 0,
    height: 56,
    width: 190,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "rgb(192, 141, 22)",
    border: "1px solid #070707",
  },
  mdlbtn: {
    backgroundColor: "rgb(192, 141, 22)",
    border: "1px solid rgb(192, 141, 22)",
  },
};

function Home() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [letsTalk, setLetsTalk] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      window.location.href = `mailto:chandr15@uwindsor.ca?subject=${letsTalk.subject}&body=${letsTalk.message} - Sent By: ${letsTalk.name}, ${letsTalk.email}`;
    }

    setValidated(true);
  };
  useEffect(() => {
    fetch(endpoints.home, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade style={styles.pageContainer}>
      <div style={styles.mainContainer} className="banner-container">
        <h1 style={styles.watermark}>
          Aditi Aditi
          <br />
          Aditi Aditi
          <br />
          Aditi Aditi
        </h1>
        <h1 className="banner-title" style={{ color: theme.primaryColor }}>
          Hi, I'm {data?.name}
        </h1>
        <div style={{ flexDirection: "row" }}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <Button className="my-4 btn-lg" style={styles.cta} onClick={handleShow}>
          Let's Talk
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#ffffff" }}>Let's Talk</Modal.Title>
          </Modal.Header>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setLetsTalk({ ...letsTalk, name: e.target.value })
                    }
                    required
                    value={letsTalk.name}
                    placeholder="Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      setLetsTalk({ ...letsTalk, email: e.target.value })
                    }
                    required
                    value={letsTalk.email}
                    placeholder="Email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a email.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Subject"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setLetsTalk({ ...letsTalk, subject: e.target.value })
                    }
                    required
                    value={letsTalk.subject}
                    placeholder="Subject"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Message"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    onChange={(e) =>
                      setLetsTalk({ ...letsTalk, message: e.target.value })
                    }
                    required
                    value={letsTalk.message}
                    placeholder="Leave a message here"
                    style={{ height: "100px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" style={styles.mdlbtn}>
                Send
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Social />
        <img
          style={styles.sideArt}
          className="banner-image"
          src="/images/cartoon-girl.png"
          alt="sideArt"
        />
      </div>
      <About header="About Me" />
      <Education header={"Educational Background"} />
      <Experience header={"Work Experience"} />

      <Skills header={"Skills"} />
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
