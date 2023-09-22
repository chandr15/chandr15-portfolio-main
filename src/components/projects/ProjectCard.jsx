import React, { useContext } from "react";
import { Button, Card, Badge, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    height: 22,
    paddingBottom: 0,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardImageStyle: {
    height: 250,
    width: "100%",
    objectFit: "cover",
  },
  cardTitleStyle: {
    fontSize: "1.6rem",
    marginBottom: 16,
    textAlign: "left",
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: "left",
  },
  linkStyle: {
    textDecoration: "none",
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col style={{ height: "100%" }}>
      <Card
        style={{
          ...styles.cardStyle,
          height: "inherit",
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img
          variant="top"
          src={project?.image}
          style={styles.cardImageStyle}
        />
        {project.tags && (
          <Card.Body
            style={{
              backgroundColor: theme.cardBodyBackground,
              minHeight: 96,
              maxHeight: 96,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              paddingBottom: 0,
            }}
          >
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                text={theme.bsSecondaryVariant}
                bg={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Body>
        )}
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          {project?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={"outline-" + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, "_blank")}
            >
              {link.text}
            </Button>
          ))}
        </Card.Footer>
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
