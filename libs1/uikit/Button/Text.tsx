import { KButtonProps } from "@uikit/types";
import React, { memo, useMemo } from "react";
import Base from "./Base";
import { KColors } from "@constants-libs";

const Text = React.forwardRef<HTMLButtonElement, KButtonProps>(
    (props, ref) => {
        const { kind = 'primary' } = props
        const textColor = useMemo(() => {
            return KColors[kind as keyof typeof KColors].moderate
        }, [kind]);

        return <Base ref={ref} {...props} textColor={textColor} variant="text" />
    }
);

Text.displayName = "KButton.Text";

export default memo(Text);