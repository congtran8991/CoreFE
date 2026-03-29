import { memo } from "react";
import KText from "./Text";
import { KParagraphProps } from "../types";

const KParagraph = (props: KParagraphProps) => {
  return <KText {...props} isParagraph />;
};

KParagraph.displayName = "KParagraph";

export default memo(KParagraph);
