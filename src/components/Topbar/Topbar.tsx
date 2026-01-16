import { DesktopTopbar } from "./DesktopTopbar";
import { MobileTopbar } from "./MobileTopbar";

export const Topbar = () => {
  const isMobile = false;

  return isMobile ? <MobileTopbar /> : <DesktopTopbar />;
};
