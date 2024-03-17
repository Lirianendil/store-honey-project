import Container from "./Container";

import "./layout.css";

const Section = ({ children, id, container }) => {
  return (
    <section id={id}>
      <Container className={container}>{children}</Container>
    </section>
  );
};

export default Section;
