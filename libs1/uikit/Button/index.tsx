import Base from "./Base";
import Icon from "./Icon";
import { KButtonProps } from "../types";
import { KButtonIconProps } from "./Icon";

type KButtonsType = {
    Base: React.FC<KButtonProps>;
    Icon: React.FC<KButtonIconProps>;
};

class KButtons {
    static Base: KButtonsType["Base"] = Base;
    static Icon: KButtonsType["Icon"] = Icon;
}

export default KButtons;
