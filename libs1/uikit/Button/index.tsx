import Base from "./Base";
import Icon from "./Icon";
import Text from "./Text";
import Outlined from "./Outlined";
import { KButtonProps } from "../types";
import { KButtonIconProps } from "./Icon";

type KButtonsType = {
    Base: React.ForwardRefExoticComponent<KButtonProps & React.RefAttributes<HTMLButtonElement>>;
    Text: React.ForwardRefExoticComponent<KButtonProps & React.RefAttributes<HTMLButtonElement>>;
    Icon: React.ForwardRefExoticComponent<KButtonIconProps & React.RefAttributes<HTMLButtonElement>>;
    Outlined: React.ForwardRefExoticComponent<KButtonProps & React.RefAttributes<HTMLButtonElement>>;
};

class KButtons {
    static Base: KButtonsType["Base"] = Base;
    static Text: KButtonsType["Text"] = Text;
    static Icon: KButtonsType["Icon"] = Icon;
    static Outlined: KButtonsType["Outlined"] = Outlined;
}

export default KButtons;
