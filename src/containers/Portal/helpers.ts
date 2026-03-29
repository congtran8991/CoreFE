export interface IPopperProps {
  anchorEl: any;
  title?: string;
  maxWidth: false | "xs" | "lg" | "md" | "sm" | "xl";
  content: (v: () => void) => any;
}

export interface IPopupProps {
  title?: string;
  maxWidth: false | "xs" | "lg" | "md" | "sm" | "xl";
  content: () => any;
}

export interface IPopupDialogProps {
  open: (payload: IPopupProps) => void;
  dismiss: () => void;
  dismissAll: () => void;
}

export interface IPopperDialogProps {
  open: (payload: IPopperProps) => void;
  dismiss: () => void;
  dismissAll: () => void;
}
