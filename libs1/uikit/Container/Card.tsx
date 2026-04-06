import { Card } from "@mui/material";
import { forwardRef, memo, useMemo } from "react";
import View from "./View";
import { KCardProps, SizeSpacing, SizeText } from "../types";
import { KColors } from "@constants-libs";
import KLabel from "../Label";
import KButtons from "../Button";

interface CardSizeConfig {
  padding: SizeSpacing;
  gap: SizeSpacing;
  fontSize: SizeText;
  iconMaxHeight: number;
  iconButtonSize: "small" | "medium" | "large";
}

const CARD_SIZE_MAP: Record<string, CardSizeConfig> = {
  xs: { padding: "0.25rem", gap: "0.25rem", fontSize: "0.875rem", iconMaxHeight: 20, iconButtonSize: "small" },
  sm: { padding: "0.5rem", gap: "0.5rem", fontSize: "1rem", iconMaxHeight: 24, iconButtonSize: "small" },
  nm: { padding: "0.75rem", gap: "0.5rem", fontSize: "1rem", iconMaxHeight: 28, iconButtonSize: "small" },
  md: { padding: "1rem", gap: "0.5rem", fontSize: "1.25rem", iconMaxHeight: 36, iconButtonSize: "medium" },
  lg: { padding: "1rem", gap: "0.75rem", fontSize: "1.5rem", iconMaxHeight: 40, iconButtonSize: "medium" },
};

const DEFAULT_SIZE_CONFIG = CARD_SIZE_MAP.md;

const KCard = forwardRef<HTMLDivElement, KCardProps>((props, ref) => {
  const { header, children, size, typo } = props || {};

  const sizeConfig = useMemo(
    () => CARD_SIZE_MAP[size || "md"] || DEFAULT_SIZE_CONFIG,
    [size]
  );

  const _header = useMemo(() => {
    const {
      icon,
      bgColorIcon,
      title,
      sxIcon,
      content: contentHeader,
      renderHeader,
      border,
      ...rest
    } = header || {};

    if (renderHeader) {
      return renderHeader();
    }

    if (!icon && !title && !contentHeader) {
      return null;
    }

    return (
      <View
        padding={sizeConfig.padding}
        borderBottom={border ? `1px solid ${KColors.borderMode}` : "none"}
      >
        <View
          display={"flex"}
          alignItems={"center"}
          gap={sizeConfig.gap}
          maxHeight={sizeConfig.iconMaxHeight}
        >
          {icon && (
            <KButtons.Icon icon={icon} size={sizeConfig.iconButtonSize} bgColor={bgColorIcon} sxIcon={sxIcon} />
          )}

          {title && (
            <KLabel.Text fontSize={sizeConfig.fontSize} {...rest} typo={typo}>
              {title}
            </KLabel.Text>
          )}

          {contentHeader}
        </View>
      </View>
    );
  }, [header, sizeConfig.fontSize, sizeConfig.gap, sizeConfig.iconButtonSize, sizeConfig.iconMaxHeight, sizeConfig.padding, typo]);

  const _content = useMemo(() => {
    return <View padding={sizeConfig.padding}>{children}</View>;
  }, [children, sizeConfig]);

  return (
    <Card ref={ref} sx={{ background: KColors.bgMode }}>
      {_header}
      {_content}
    </Card>
  );
});

export default memo(KCard);
