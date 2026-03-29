import { CSSProperties } from "@mui/material";
import { TypeLayout, TypeSpacing, TypeStyleText, TypeStyling } from "./types";
import { KFontWeights } from "libs1/constants/fonts";

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

class styleHelper {
  static removeObjectProperties = (obj: any, keys: string[]) => {
    keys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }
  static destructSpacing = (props: TypeSpacing = {}) => {
    const style: React.CSSProperties = {};

    if (props.mr !== undefined) {
      style.margin = props.mr;
    }
    if (props.mrL !== undefined) {
      style.marginLeft = props.mrL;
    }
    if (props.mrR !== undefined) {
      style.marginRight = props.mrR;
    }
    if (props.mrT !== undefined) {
      style.marginTop = props.mrT;
    }
    if (props.mrB !== undefined) {
      style.marginBottom = props.mrB;
    }
    if (props.mrX !== undefined) {
      style.marginLeft = props.mrX;
      style.marginRight = props.mrX;
    }

    if (props.mrY !== undefined) {
      style.marginTop = props.mrY;
      style.marginBottom = props.mrY;
    }

    if (props.pd !== undefined) {
      style.padding = props.pd;
    }
    if (props.pdL !== undefined) {
      style.paddingLeft = props.pdL;
    }
    if (props.pdR !== undefined) {
      style.paddingRight = props.pdR;
    }
    if (props.pdT !== undefined) {
      style.paddingTop = props.pdT;
    }
    if (props.pdB !== undefined) {
      style.paddingBottom = props.pdB;
    }
    if (props.pdX !== undefined) {
      style.paddingLeft = props.pdX;
      style.paddingRight = props.pdX;
    }

    if (props.pdY !== undefined) {
      style.paddingTop = props.pdY;
      style.paddingBottom = props.pdY;
    }

    this.removeObjectProperties(props, ['mr', 'mrX', 'mrY', 'mrL', 'mrR', 'mrT', 'mrB', 'pd', 'pdX', 'pdY', 'pdL', 'pdR', 'pdT', 'pdB']);

    return style;
  };

  static destructLayout = (props: TypeLayout = {}) => {
    const style: any = {};

    if (props.dp) {
      style.display = props.dp;
      if (props.dp === "flex") {
        style.flexDirection = "column";
      }
    }

    let direction: any = props.row ? "row" : "";
    if (direction && props.reverse) {
      direction += "-reverse";
    }
    if (direction) {
      style.display = "flex";
      style.flexDirection = direction;
    }

    if (props.center) {
      style.alignItems = "center";
      style.justifyContent = "center";
    } else {
      if (props.alignItems) {
        style.alignItems =
          props.alignItems === true ? "center" : props.alignItems;
      }

      if (props.justifyContent) {
        style.justifyContent =
          props.justifyContent === true ? "center" : props.justifyContent;
      }
    }

    if (props.alignSelf) {
      style.alignSelf = props.alignSelf === true ? "center" : props.alignSelf;
    }

    if (props.flex) {
      style.flex = props.flex === true ? 1 : props.flex;
    }

    if (props.flexW) {
      style.flexWrap = props.flexW;
    }

    if (props.flexS) {
      style.flexShrink = props.flexS;
    }

    if (props.flexG) {
      style.flexGrow = props.flexG;
    }

    if (props.position) {
      style.position = props.position;
    }

    this.removeObjectProperties(props, ['dp', 'row', 'reverse', 'direction', 'center', 'alignItems', 'alignSelf', 'flex', 'flexW', 'flexS', 'flexG', 'position']);

    return style;
  };

  static destructStylingProps = (props: TypeStyling) => {
    const style: React.CSSProperties = {};

    if (props.brW) {
      style.borderWidth = props.brW;
      style.borderStyle = 'solid';
    }
    if (props.brBW) {
      style.borderBottomWidth = props.brBW;
      style.borderBottomStyle = 'solid';
    }
    if (props.brTW) {
      style.borderTopWidth = props.brTW;
      style.borderTopStyle = 'solid';
    }
    if (props.brLW) {
      style.borderLeftWidth = props.brLW;
      style.borderLeftStyle = 'solid';
    }
    if (props.brRW) {
      style.borderRightWidth = props.brRW;
      style.borderRightStyle = 'solid';
    }
    this.removeObjectProperties(props, ['brW', 'brBW', 'brTW', 'brLW', 'brRW']);

    if (props.brS) {
      style.borderStyle = props.brS;
    }
    delete props.brS;

    if (props.brC) {
      style.borderColor = props.brC;
    }
    if (props.brBC) {
      style.borderBottomColor = props.brBC;
    }
    if (props.brTC) {
      style.borderTopColor = props.brTC;
    }
    if (props.brLC) {
      style.borderLeftColor = props.brLC;
    }
    if (props.brRC) {
      style.borderRightColor = props.brRC;
    }
    this.removeObjectProperties(props, ['brC', 'brBC', 'brTC', 'brLC', 'brRC']);

    if (props.overflow) {
      style.overflow = props.overflow === true ? 'auto' : props.overflow;
    }
    if (props.overflowY) {
      style.overflowY = props.overflowY === true ? 'auto' : props.overflowY;
    }
    if (props.overflowX) {
      style.overflowX = props.overflowX === true ? 'auto' : props.overflowX;
    }

    this.removeObjectProperties(props, ['overflow', 'overflowY', 'overflowX']);

    if (props.pointer) {
      style.cursor = 'pointer';
    }
    this.removeObjectProperties(props, ['pointer']);

    return style;
  }

  static destructStylesText = (props: TypeStyleText) => {
    const style: React.CSSProperties = {};

    if (props.fontSize) {
      style.fontSize = props.fontSize
    }

    if (props.fontWeight) {
      style.fontWeight = props.fontWeight
    }

    if (props.color) {
      style.color = props.color
    }

    if (props.lineHeight) {
      style.lineHeight = props.lineHeight
    }

    if (props.textAlign) {
      style.textAlign = props.textAlign
    }

    if (props.textTransform) {
      style.textTransform = props.textTransform
    }

    this.removeObjectProperties(props, ['fontSize', 'fontWeight', 'color', 'lineHeight', 'textAlign', 'textTransform']);

    return style;
  };


  static destructStyles = <T extends object>(props: T) => {
    const layout = this.destructLayout(props);
    const textStyle = this.destructStylesText(props);
    const spacing = this.destructSpacing(props);
    const styling = this.destructStylingProps(props);

    return {
      mStyle: {
        layout,
        textStyle,
        spacing,
        styling,
      },
      mProps: props,
    };
  };
}

export default styleHelper;
