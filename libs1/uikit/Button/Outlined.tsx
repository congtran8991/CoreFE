import { KButtonProps, KKind, TypeKColors } from "@uikit/types";
import React, { memo, useMemo } from "react";
import Base from "./Base";
import { KColors } from "@constants-libs";
import { KAlphaLevel } from "@constants-libs/color";

const Outlined = React.forwardRef<HTMLButtonElement, KButtonProps>(
    (props, ref) => {
        const { kind = 'primary' } = props

        const styleColor = useMemo(() => {
            const OPTIONS: Record<KKind, { textColor: TypeKColors, brC: TypeKColors, hover: TypeKColors[KAlphaLevel] }> = {
                primary: {
                    textColor: KColors.primary.moderate,
                    brC: KColors.primary.moderate,
                    hover: KColors.primary.alpha[8]
                },
                secondary: {
                    textColor: KColors.secondary.moderate,
                    brC: KColors.secondary.moderate,
                    hover: KColors.secondary.alpha[8]
                },
                success: {
                    textColor: KColors.success.moderate,
                    brC: KColors.success.moderate,
                    hover: KColors.success.alpha[8]
                },
                danger: {
                    textColor: KColors.danger.moderate,
                    brC: KColors.danger.moderate,
                    hover: KColors.danger.alpha[8]
                },
                warning: {
                    textColor: KColors.warning.moderate,
                    brC: KColors.warning.moderate,
                    hover: KColors.warning.alpha[8]
                },
                info: {
                    textColor: KColors.info.moderate,
                    brC: KColors.info.moderate,
                    hover: KColors.info.alpha[8]
                },
            }

            return OPTIONS[kind]
            // return KColors[kind as keyof typeof KColors].mild
        }, [kind]);

        return <Base ref={ref} {...props} sx={{ '&:hover': { backgroundColor: styleColor.hover } }} {...styleColor} variant="outlined" />
    }
);

Outlined.displayName = "KButton.Outlined";

export default memo(Outlined);