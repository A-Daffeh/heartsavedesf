import { Container } from "react-bootstrap";

const SectionHeader = ({
  heading,
  highlight,
  paragraph,
  highlightColor = "var(--brand-accent)",
  align = "center",
  mutedParagraph = true,
}) => {
  return (
    <Container className={`my-5 text-${align}`}>
      <h2 className="section-header">
        {heading}{" "}
        <span className="section-header-brand" style={{ color: highlightColor }}>
          {highlight}
        </span>
      </h2>
      {paragraph && (
        <p className={mutedParagraph ? "text-muted-ink" : ""}>{paragraph}</p>
      )}
    </Container>
  );
};

export default SectionHeader;
