import { BackgroundProps, BoxFrame, BoxFrame as FrontFrame } from "../utils/sharedInterfaces";

export const frontFrame: BoxFrame[] = [
  {
    top: "6%", left: "0%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },

  {
    top: "13%", left: "12.8%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "3%", left: "0%", bottom: "0%", right: "10%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "3%", left: "0%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "3%", left: "-12.8%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "13%", left: "-12%", bottom: "0%", right: "12%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
];

export const contentWrapper: BoxFrame[] = [
  {
    top: "6%", left: "0%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },

  {
    top: "10%", left: "12.8%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "10%", left: "0%", bottom: "0%", right: "10%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "3%", left: "0%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "12%", left: "-12.8%", bottom: "0%", right: "0%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
  {
    top: "12%", left: "-12.8%", bottom: "0%", right: "12.8%",
    borderTopLeftRadius: 2 + "%",
    borderTopRightRadius: 2 + "%",
    borderBottomLeftRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",
  },
];

export const backgroundProps: BackgroundProps[] = [
  {

    gradientAngle: 0,

    rotationXY: {
      rotateX: 0,
      rotateY: 0,
    }
  },
  {

    gradientAngle: 45,
    rotationXY: {
      rotateX: 20,
      rotateY: -45,
    }
  },
  {
    gradientAngle: -45,
    rotationXY: {
      rotateX: 20,
      rotateY: 45,
    }
  },
  {
    gradientAngle: 175,
    rotationXY: {
      rotateX: 0,
      rotateY: 0,
    }
  },
  {
    gradientAngle: 45,
    rotationXY: {
      rotateX: 20,
      rotateY: -45,
    }
  },
  {
    gradientAngle: -45,
    rotationXY: {
      rotateX: 0,
      rotateY: 45,
    }
  },
];