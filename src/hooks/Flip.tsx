import { useCallback, useEffect, useState } from "react";

const useFlip = () => {
  const [innerDimensions, setInnerDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: window.innerWidth, height: window.innerHeight });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [swipeLengthX, setSwipeLengthX] = useState(0);
  const [swipeLengthY, setSwipeLengthY] = useState(0);
  const [swiping, setSwiping] = useState(false);

  window.onresize = () =>
    setInnerDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  // useEffect(() => {
  //   console.log("INNER DIM", innerDimensions);
  // }, [innerDimensions]);

  useEffect(() => {
    if ((!swiping && endPoint.x !== 0) || endPoint.y !== 0) {
      setSwipeLengthX(startPoint.x - endPoint.x);
      setSwipeLengthY(startPoint.y - endPoint.y);
    } else {
      setSwipeLengthX(0);
      setSwipeLengthY(0);
    }
  }, [swiping]);

  const touchStartHandler = useCallback(
    (touch: TouchEvent) => {
      setEndPoint({ x: 0, y: 0 });
      setStartPoint({
        x: touch.touches[0].screenX,
        y: touch.touches[0].screenY,
      });
      setSwiping(true);
    },
    [swipeLengthX, swiping, startPoint]
  );

  const touchMoveHandler = useCallback(
    (touch: TouchEvent) => {
      setSwiping(true);
      setEndPoint({ x: touch.touches[0].pageX, y: touch.touches[0].pageY });
    },
    [endPoint]
  );

  const touchEndHandler = useCallback(() => {
    setSwiping(false);
  }, [swiping]);

  const touchCancel = useCallback(() => {
    setSwiping(false);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
    setSwipeLengthX(0);
    setSwipeLengthY(0);
    // console.log("SWIPER NO SWIPING!");
  }, [swiping]);

  const mouseDownHandler = useCallback(
    (click: MouseEvent) => {
      setEndPoint({ x: 0, y: 0 });
      setStartPoint({ x: click.pageX, y: click.pageY });
      setSwiping(true);
    },
    [swipeLengthX, swiping, startPoint]
  );

  const mouseMoveHandler = useCallback(
    (click: MouseEvent) => {
      setEndPoint({ x: click.pageX, y: click.pageY });
    },
    [endPoint, swiping]
  );

  const mouseUpHandler = useCallback(
    (click: MouseEvent) => {
      setEndPoint({ x: click.pageX, y: click.pageY });
      setSwiping(false);
    },
    [swiping]
  );

  const mouseCancel = useCallback(() => {
    setSwiping(false);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
    setSwipeLengthX(0);
    setSwipeLengthY(0);
    // console.log("SWIPER NO SWIPING!");
  }, [swiping]);
  const mountFlip = useCallback(() => {
    document.addEventListener("touchstart", touchStartHandler, {
      passive: true,
    });

    document.addEventListener("touchmove", touchMoveHandler, { passive: true });

    document.addEventListener("touchend", touchEndHandler, { passive: true });

    document.addEventListener("mousedown", mouseDownHandler, { passive: true });

    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    document.addEventListener("mouseup", mouseUpHandler, { passive: true });
  }, []);

  const unmountFlip = useCallback(() => {
    document.removeEventListener("touchstart", touchStartHandler);

    document.removeEventListener("touchmove", touchMoveHandler);

    document.removeEventListener("touchend", touchEndHandler);

    document.removeEventListener("mousedown", mouseDownHandler);

    document.removeEventListener("mousemove", mouseMoveHandler);

    document.removeEventListener("mouseup", mouseUpHandler);
  }, []);

  return {
    mountFlip: mountFlip, //use for applicable component mounting
    unmountFlip: unmountFlip, //use for applied component unmounting
    startPoint: startPoint, //can use for desired logic, with x and y property
    endPoint: endPoint, //can use for desired logic, with x and y property
    swiping: swiping, //simple boolean value
    horizontalSwipe: swipeLengthX, //measure of the distance along x-axis
    verticalSwipe: swipeLengthY, //measure of the distance along y-axis
    innerDimensions: innerDimensions
  };
};

export default useFlip;
