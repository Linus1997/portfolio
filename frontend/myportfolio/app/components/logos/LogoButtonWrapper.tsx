import { Button } from "@nextui-org/react";
import { ReactNode } from "react";
import LogoButtonAnimation from "./LogoButtonAnimation";

interface Props {
  children: ReactNode;
  onPress: () => void;
}

const LogoButtonWrapper = ({ children, onPress }: Props) => {
  return (
    <Button
      className="w-full h-full p-6 bg-opacity-0"
      isIconOnly
      onPress={() => {
        onPress();
      }}
      disableRipple
      startContent={<LogoButtonAnimation>{children}</LogoButtonAnimation>}
    />
  );
};

export default LogoButtonWrapper;
