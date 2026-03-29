import { CSSProperties } from "@mui/material";
import { KFontWeights } from "libs1/constants/fonts";
import { useMemo } from "react";


class Typography {
    private _KFontscale = 1;

    Page: CSSProperties = {};

    BreadcrumbTitle: CSSProperties = {};

    TableHeader: CSSProperties = {};

    Text4xLgBold: CSSProperties = {};
    Text3xLgBold: CSSProperties = {};
    Text2xLgBold: CSSProperties = {};
    TextXLgBold: CSSProperties = {};
    TextLgBold: CSSProperties = {};
    TextXMdBold: CSSProperties = {};
    TextMdBold: CSSProperties = {};
    TextXNmBold: CSSProperties = {};
    TextNmBold: CSSProperties = {};
    TextSmBold: CSSProperties = {};
    TextXsBold: CSSProperties = {};
    Text2XsBold: CSSProperties = {};

    Text4xLgMedium: CSSProperties = {};
    Text3xLgMedium: CSSProperties = {};
    Text2xLgMedium: CSSProperties = {};
    TextXLgMedium: CSSProperties = {};
    TextLgMedium: CSSProperties = {};
    TextXMdMedium: CSSProperties = {};
    TextMdMedium: CSSProperties = {};
    TextXNmMedium: CSSProperties = {};
    TextNmMedium: CSSProperties = {};
    TextSmMedium: CSSProperties = {};
    TextXsMedium: CSSProperties = {};
    Text2XsMedium: CSSProperties = {};

    Text4xLgNormal: CSSProperties = {};
    Text3xLgNormal: CSSProperties = {};
    Text2xLgNormal: CSSProperties = {};
    TextXLgNormal: CSSProperties = {};
    TextLgNormal: CSSProperties = {};
    TextXMdNormal: CSSProperties = {};
    TextMdNormal: CSSProperties = {};
    TextXNmNormal: CSSProperties = {};
    TextNmNormal: CSSProperties = {};
    TextSmNormal: CSSProperties = {};
    TextXsNormal: CSSProperties = {};
    Text2XsNormal: CSSProperties = {};


    get KFontscale() {
        return this._KFontscale;
    }

    generateTextStyle = (
        KFontsize: number,
        fontWeight: string | number,
        lineHeight: number | string,
        factor = 1,
        customStyle: any = {}
    ): any => ({
        fontFamily: 'Roboto',
        fontSize: KFontsize * factor,
        fontWeight,
        // lineHeight,
        ...customStyle
    });

    updateValue(KFontscale: number) {
        this.BreadcrumbTitle = this.generateTextStyle(18, KFontWeights.medium, 1.4);

        this.TableHeader = this.generateTextStyle(12, KFontWeights.medium, 1.75);

        this.Text4xLgBold = this.generateTextStyle(28, KFontWeights.bold, 1.4);
        this.Text3xLgBold = this.generateTextStyle(24, KFontWeights.bold, 1.4);
        this.Text2xLgBold = this.generateTextStyle(20, KFontWeights.bold, 1.4);
        this.TextXLgBold = this.generateTextStyle(18, KFontWeights.bold, 1.4);
        this.TextLgBold = this.generateTextStyle(16, KFontWeights.bold, 1.4);
        this.TextXMdBold = this.generateTextStyle(15, KFontWeights.bold, 1.4);
        this.TextMdBold = this.generateTextStyle(14, KFontWeights.bold, 1.4);
        this.TextXNmBold = this.generateTextStyle(13, KFontWeights.bold, 1.5);
        this.TextNmBold = this.generateTextStyle(12, KFontWeights.bold, 1.5);
        this.TextSmBold = this.generateTextStyle(11, KFontWeights.bold, 1.4);
        this.TextXsBold = this.generateTextStyle(10, KFontWeights.bold, 1.4);
        this.Text2XsBold = this.generateTextStyle(8, KFontWeights.bold, 1.4);

        this.Text4xLgMedium = this.generateTextStyle(28, KFontWeights.medium, 1.4);
        this.Text3xLgMedium = this.generateTextStyle(24, KFontWeights.medium, 1.4);
        this.Text2xLgMedium = this.generateTextStyle(20, KFontWeights.medium, 1.4);
        this.TextXLgMedium = this.generateTextStyle(18, KFontWeights.medium, 1.4);
        this.TextLgMedium = this.generateTextStyle(16, KFontWeights.medium, 1.4);
        this.TextXMdMedium = this.generateTextStyle(15, KFontWeights.medium, 1.4);
        this.TextMdMedium = this.generateTextStyle(14, KFontWeights.medium, 1.4);
        this.TextXNmMedium = this.generateTextStyle(13, KFontWeights.medium, 1.5);
        this.TextNmMedium = this.generateTextStyle(12, KFontWeights.medium, 1.5);
        this.TextSmMedium = this.generateTextStyle(11, KFontWeights.medium, 1.4);
        this.TextXsMedium = this.generateTextStyle(10, KFontWeights.medium, 1.4);
        this.Text2XsMedium = this.generateTextStyle(8, KFontWeights.medium, 1.4);

        this.Text4xLgNormal = this.generateTextStyle(28, KFontWeights.regular, 1.4);
        this.Text3xLgNormal = this.generateTextStyle(24, KFontWeights.regular, 1.4);
        this.Text2xLgNormal = this.generateTextStyle(20, KFontWeights.regular, 1.4);
        this.TextXLgNormal = this.generateTextStyle(18, KFontWeights.regular, 1.4);
        this.TextLgNormal = this.generateTextStyle(16, KFontWeights.regular, 1.4);
        this.TextXMdNormal = this.generateTextStyle(15, KFontWeights.regular, 1.4);
        this.TextMdNormal = this.generateTextStyle(14, KFontWeights.regular, 1.4);
        this.TextXNmNormal = this.generateTextStyle(13, KFontWeights.regular, 1.5);
        this.TextNmNormal = this.generateTextStyle(12, KFontWeights.regular, 1.5);
        this.TextSmNormal = this.generateTextStyle(11, KFontWeights.regular, 1.4);
        this.TextXsNormal = this.generateTextStyle(10, KFontWeights.regular, 1.4);
        this.Text2XsNormal = this.generateTextStyle(8, KFontWeights.regular, 1.4);
    }
}

const instance = new Typography();

const useTheme = (KFontscale = 1) => {
    const typo = useMemo(() => {
        instance.updateValue(KFontscale);
        return instance;
    }, [KFontscale]);

    return typo;
};

export type TypeTypography = Exclude<keyof Typography, 'updateValue' | 'KFontscale' | 'generateTextStyle'>

export { useTheme }