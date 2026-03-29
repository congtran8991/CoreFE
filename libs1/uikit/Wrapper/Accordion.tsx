import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { JSX, memo } from "react";

interface IProps {
  title: string;
  children: JSX.Element;
  controls: string;
  expanded?: boolean;
}

const CardAccordion = ({ children, title, controls, expanded }: IProps) => {
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreOutlinedIcon />}
        aria-controls={controls}
        id={controls}
        sx={{ outline: "none", "&:focus": { outline: "none" } }}
      >
        <Typography
          component="span"
          fontWeight={"bold"}
          fontFamily={"Times"}
          fontSize={"1.5rem"}
          color="#cb8609"
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default memo(CardAccordion);
