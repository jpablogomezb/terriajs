import LoginMenuButton from "../../Map/LoginMenuBotton";
import responsiveSwitch from "./ResponsiveSwitch";
import withControlledVisibility from "../../HOCs/withControlledVisibility";
import MobileMenuItem from "../../Mobile/MobileMenuItem";

const LoginMenuItem = withControlledVisibility(
  responsiveSwitch(LoginMenuButton, MobileMenuItem)
);

export default LoginMenuItem;
