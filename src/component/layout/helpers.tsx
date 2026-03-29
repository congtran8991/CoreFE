import PortalHandle from "../../utils/portal";
import FormLogin from "../../page/Users/FormLogin";
import FormRegister from "../../page/Users/FormRegister";

export const showPopupLogin = () => {
  return PortalHandle.popup.open({
    title: "Login",
    content: () => {
      return <FormLogin />;
    },
    maxWidth: "xs",
  });
};

export const showPopupRegister = () => {
  return PortalHandle.popup.open({
    title: "Register",
    content: () => {
      return <FormRegister />;
    },
    maxWidth: "xs",
  });
};
