import { popupRef, popperRef } from "../constants";
import { IPopperProps, IPopupProps } from "../containers/Portal/helpers";

export default class PortalHandle {
  static readonly popup = {
    open: (payload: IPopupProps) => {
      popupRef.current?.open(payload);
    },
    dismiss: () => {
      popupRef.current?.dismiss();
    },
    dismissAll: () => {
      popupRef.current?.dismissAll();
    },
  };

  static readonly popper = {
    open: (payload: IPopperProps) => {
      popperRef.current?.open(payload);
    },
    dismiss: () => {
      popperRef.current?.dismiss();
    },
    dismissAll: () => {
      popperRef.current?.dismissAll();
    },
  };
}
