import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  introTextContainer: {
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "1.0em",
    fontWeight: 500,
    justifyContent: "space-between",
  },
  introImageContainer: {
    position: "relative",
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  pageContainer: {
    position: "relative",
    // marginBottom: 100,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  header: {
    textAlign: "left",
    position: "absolute",
    left: 0,
    transform: "rotate(-90deg) translate(120px, -135px)",
  },
  profileImageStyle: {
    width: 400,
  },
  bgImage: {
    position: "absolute",
    left: "60%",
    top: "-10%",
    transform: "rotate(-5deg)",
    width: 300,
    zIndex: -10,
  },
  frameArt: {
    position: "absolute",
    width: "100vw",
    height: "auto",
  },
  // bgUnderlay: {
  //   position: "absolute",
  //   inset: "0px 100px 59px 100px ",
  //   background: "#9eeebd",
  //   zIndex: -20,
  // },
  topLeft: {
    position: "absolute",
    top: 338,
    width: 235,
    left: -97,
    zIndex: -20,
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div className="section-content-container">
        <Header className="about-header" style={styles.header} title={header} />
        <img
          style={styles.topLeft}
          className="about-circle"
          src="/images/home/LeftCircle.svg"
          alt="circle"
        />
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
                <Col style={styles.introImageContainer}>
                  <div className="grayscale-overlay-container"></div>
                  {/* <img
                    src={data?.bgImageSource}
                    className="profile-bg"
                    alt="profile bg"
                    style={styles.bgImage}
                  /> */}
                  {/* <div style={styles.bgUnderlay}></div> */}
                  <img
                    src={data?.imageSource}
                    className="profile-image"
                    style={styles.profileImageStyle}
                    alt="profile"
                  />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </div>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
