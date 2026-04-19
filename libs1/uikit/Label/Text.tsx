import { memo, useMemo } from "react";
import { KTextProps } from "../types";
import { useTheme } from "../typography";
import styleHelper from "../styleHelper";
import { Tooltip, Link } from "@mui/material";

const KText = (props: KTextProps) => {
  const { children, onPress, isParagraph, style, typo = 'TextNmNormal', isTooltip, tooltip, placementTooltip, href, isLink, ...rest } = props;

  const typos = useTheme();

  const { innerStyle, innerProps } = useMemo(() => {
    const { mStyle: m, mProps: p } = styleHelper.destructStyles(rest);

    const typoStyle = typo ? typos[typo] : {};

    const mergeStyle = {
      ...typoStyle,
      ...style,
      ...m.layout,
      ...m.spacing,
      ...m.styling,
      ...m.textStyle
    }

    return {
      innerStyle: mergeStyle,
      innerProps: p
    }

  }, [rest, style, typo, typos])

  const Wrapper = isParagraph ? "p" : "span";

  const safeProps = innerProps as Record<string, any>;

  const renderContent = () => {
    const baseProps = {
      style: innerStyle,
      ...safeProps,
      onClick: onPress || undefined,
    };

    if (isLink) {
      return href
        ? <a {...baseProps} href={href}>{children}</a>
        : <Link {...baseProps}>{children}</Link>;
    }

    return <Wrapper {...baseProps}>{children}</Wrapper>;
  };

  if (isTooltip) {
    return (
      <Tooltip placement={placementTooltip} title={tooltip || children}>
        {renderContent()}
      </Tooltip>
    )
  }

  return renderContent();
};

export default memo(KText);
