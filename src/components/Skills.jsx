import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import { Container } from "react-bootstrap";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  introTextContainer: {
    fontSize: 16,
    whiteSpace: "pre-wrap",
    opacity: 0.6,
  },
  header: {
    textAlign: "center",
  },
  container: {
    position: "relative",
    height: "100vh",
  },
  fadeContainer: {
    display: "flex",
    alignItems: "center",
  },
  skillTitle: {
    opacity: 0.6,
  },
  centerAbsolute: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -42%)",
    width: 1400,
    zIndex: -20,
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div style={styles.container}>
      <img
        style={styles.centerAbsolute}
        className="skills-bg"
        src="/images/home/heart.svg"
        alt="heart border for skills"
      />
      <Header style={styles.header} title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container style={{ maxWidth: 900 }}>
              {renderSkillsIntro(data.intro)}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 24,
                  marginTop: 80,
                }}
                className="skill-container"
              >
                {data.skills?.map((rows) => (
                  <div key={rows.title}>
                    <br />

                    <h3 style={styles.skillTitle}>{rows.title}</h3>
                    {rows.items.map((item) => (
                      <div key={item.title} style={{ display: "inline-block" }}>
                        <img
                          src={item.icon}
                          className="skills-icon"
                          alt={item.title}
                        />
                        <p style={{ margin: 0 }}>{item.title}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
