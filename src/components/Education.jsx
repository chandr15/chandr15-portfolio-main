import React, { useEffect, useState, useContext } from "react";
import { Chrono } from "react-chrono";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import "../css/education.css";
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
    alignItems: "center",
    position: "relative",
    minHeight: "90vh",
  },
  bgImage: {
    position: "absolute",
    height: "55%",
    bottom: 100,
    left: -183,
  },
  bottomRight: {
    position: "absolute",
    bottom: -35,
    right: -355,
    width: 500,
  },
  topLeft: {
    position: "absolute",
    top: 25,
    width: 500,
    left: -265,
  },
};
function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");
  const [mode, setMode] = useState("VERTICAL_ALTERNATING");

  useEffect(() => {
    fetch(endpoints.education, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setMode("VERTICAL");
    }

    if (window?.innerWidth < 576) {
      setWidth("90vw");
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth("90vw");
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth("75vw");
    } else {
      setWidth("50vw");
    }
  }, []);

  return (
    <div style={styles.pageContainer}>
      <Header title={header} />
      {data ? (
        <Fade style={{ justifyContent: "flex-start" }}>
          <div
            style={{ width, justifyContent: "flex-start !important" }}
            className="section-content-container"
          >
            <img
              style={styles.bottomRight}
              src="/images/home/deer-bookshelf.png"
              alt="deer bookshelf in antlers, cartoonish"
              className="education-bookshelf"
            />
            <img
              style={styles.topLeft}
              src="/images/home/side-rays.svg"
              alt="deer bookshelf in antlers, cartoonish"
              className="education-siderays"
            />

            <Container style={{ width }}>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.education}
                cardHeight={250}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.chronoTheme.cardForeColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.chronoTheme.cardForeColor,
                }}
              >
                <div className="chrono-icons">
                  {data.education.map((education) =>
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
