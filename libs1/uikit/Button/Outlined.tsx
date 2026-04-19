import { KButtonProps, KKind, TypeKColors } from "@uikit/types";
import React, { memo, useMemo } from "react";
import Base from "./Base";
import { KColors } from "@constants-libs";

const Outlined = React.forwardRef<HTMLButtonElement, KButtonProps>(
    (props, ref) => {
        const { kind = 'primary' } = props;

        const styleColor = useMemo(() => {
            const color = KColors[kind as KKind];
            return {
                textColor: color.moderate as TypeKColors,
                brC: color.moderate as TypeKColors,
                hover: color.alpha[8] as string,
            };
        }, [kind]);

        return (
            <Base
                ref={ref}
                {...props}
                sx={{ '&:hover': { backgroundColor: styleColor.hover } }}
                textColor={styleColor.textColor}
                brC={styleColor.brC}
                variant="outlined"
            />
        );
    }
);

Outlined.displayName = "KButton.Outlined";

export default memo(Outlined);