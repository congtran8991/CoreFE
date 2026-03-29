import { createRef } from "react";
import {
  IPopupDialogProps,
  IPopperDialogProps,
} from "../containers/Portal/helpers";

export const popupRef = createRef<IPopupDialogProps>();
export const popperRef = createRef<IPopperDialogProps>();
