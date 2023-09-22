import React, { useEffect, useState, useContext } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import "../css/experience.css";

const styles = {
  ulStyle: {
    listStylePosition: "outside",
    paddingLeft: 20,
  },
  mainContainer: {
    position: "relative",
    marginBottom: 100,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: "inline-block",
  },
  inlineChild: {
    display: "inline-block",
  },
  itemStyle: {
    marginBottom: 10,
  },
  sunSide: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  leftSide: {
    position: "absolute",
    left: 0,
    top: 0,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <div style={styles.mainContainer}>
      <Header title={header} />

      {data ? (
        <div className="section-content-container">
          <Container style={{ marginTop: -50 }}>
            <Timeline lineColor={theme.timelineLineColor}>
              {data.map((item) => (
                <Fade>
                  <TimelineItem
                    key={item.title + item.dateText}
                    dateText={item.dateText}
                    dateInnerStyle={{
                      background: theme.primaryColor,
                      border: theme.primaryColor,
                      color: theme.background,
                    }}
                    style={styles.itemStyle}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    <h2 className="item-title">{item.title}</h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4
                        style={{
                          ...styles.subtitleStyle,
                          color: theme.primaryColor,
                        }}
                      >
                        {item.subtitle}
                      </h4>
                      {item.workType && (
                        <h5 style={styles.inlineChild}>
                          &nbsp;· {item.workType}
                        </h5>
                      )}
                    </div>
                    <ul style={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <div key={point}>
                          <li>
                            <ReactMarkdown
                              children={point}
                              components={{
                                p: "span",
                              }}
                            />
                          </li>
                          <br />
                        </div>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}

      <img
        style={styles.sunSide}
        src="/images/home/side-sun.svg"
        alt="sun"
        className="experience-side"
      />
      <img
        style={styles.leftSide}
        className="experience-left"
        src="/images/home/left-side.svg"
        alt="illustrations"
      />
    </div>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
