import { CSSProperties } from "@mui/material";
import { KRadius, TypeLayout, TypeSpacing, TypeStyleText, TypeStyling } from "./types";

class Typography {
  private _KFontscale = 1;

  Page: CSSProperties = {};

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
}

class styleHelper {
  static removeObjectProperties = (obj: any, keys: string[]) => {
    keys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }

  static mapKRadiusToNumber = (radius?: KRadius | 0) => {
    const base = 4;
    switch (radius) {
      case 'x':
        return base;
      case '2x':
        return base * 2;
      case '3x':
        return base * 3;
      case '4x':
        return base * 4;
      case '6x':
        return base * 6;
      case 'round':
        return 10000;
      default:
        return 0;
    }
  };


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
    if (props.background) {
      style.background = props.background;
    }
    delete props.background;

    if (props.br) {
      style.borderRadius = this.mapKRadiusToNumber(props.br);
    }
    if (props.brTL) {
      style.borderTopLeftRadius = this.mapKRadiusToNumber(props.brTL);
    }
    if (props.brTR) {
      style.borderTopRightRadius = this.mapKRadiusToNumber(props.brTR);
    }
    if (props.brBL) {
      style.borderBottomLeftRadius = this.mapKRadiusToNumber(props.brBL);
    }
    if (props.brBR) {
      style.borderBottomRightRadius = this.mapKRadiusToNumber(props.brBR);
    }
    this.removeObjectProperties(props, ['br', 'brTL', 'brTR', 'brBL', 'brBR']);

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

export const KRadiusValue = {
  0: 0,
  x: styleHelper.mapKRadiusToNumber('x'),
  '2x': styleHelper.mapKRadiusToNumber('2x'),
  '3x': styleHelper.mapKRadiusToNumber('3x'),
  '4x': styleHelper.mapKRadiusToNumber('4x'),
  '6x': styleHelper.mapKRadiusToNumber('6x'),
  round: styleHelper.mapKRadiusToNumber('round')
};

