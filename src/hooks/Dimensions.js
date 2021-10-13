import  { useCallback, useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const sizeHandler = useCallback(
    (landscapeOutput, portraitOutput) => {
      if (windowDimensions.width > windowDimensions.height) {
        return landscapeOutput;
      } else return portraitOutput;
    },
    [windowDimensions]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    resizeHandler: sizeHandler,
  };
};

export default useDimensions;