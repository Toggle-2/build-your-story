import { useCallback, useEffect, useState } from "react";

const useFlip = () => {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [swipeLengthX, setSwipeLengthX] = useState(0);
  const [swipeLengthY, setSwipeLengthY] = useState(0);
  const [swiping, setSwiping] = useState(false);

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
    (touch) => {
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
    (e) => {
      setEndPoint({ x: e.touches[0].screenX, y: e.touches[0].screenY });
    },
    [endPoint]
  );

  const touchEndHandler = useCallback(
    (e) => {
      setSwiping(false);
    },
    [swiping]
  );

  const touchCancel = useCallback(
    (e) => {
      setSwiping(false);
      setStartPoint({ x: 0, y: 0 });
      setEndPoint({ x: 0, y: 0 });
      setSwipeLengthX(0);
      setSwipeLengthY(0);
      // console.log("SWIPER NO SWIPING!");
    },
    [swiping]
  );

  const mouseDownHandler = useCallback(
    (e) => {
      setEndPoint({ x: 0, y: 0 });
      setStartPoint({ x: e.screenX, y: e.screenY });
      setSwiping(true);
    },
    [swipeLengthX, swiping, startPoint]
  );

  const mouseMoveHandler = useCallback(
    (e) => {
        setEndPoint({ x: e.screenX, y: e.screenY });
    },
    [endPoint, swiping]
  );

  const mouseUpHandler = useCallback(
    (e) => {
        setEndPoint({ x: e.screenX, y: e.screenY });
      setSwiping(false);
    },
    [swiping]
  );

  const mouseCancel = useCallback(
    (e) => {
      setSwiping(false);
      setStartPoint({ x: 0, y: 0 });
      setEndPoint({ x: 0, y: 0 });
      setSwipeLengthX(0);
      setSwipeLengthY(0);
      // console.log("SWIPER NO SWIPING!");
    },
    [swiping]
  );
  const mountFlip = useCallback(() => {
    document.addEventListener("touchstart", touchStartHandler, {
      passive: true,
    });

    document.addEventListener("touchmove", touchMoveHandler, { passive: true });

    document.addEventListener("touchend", touchEndHandler, { passive: true });

    document.addEventListener("touchcancel", touchCancel, { passive: true });

    document.addEventListener("mousedown", mouseDownHandler, { passive: true });

    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    document.addEventListener("mouseup", mouseUpHandler, { passive: true });

    document.addEventListener("mouseleave", mouseCancel, { passive: true });
  }, []);

  const unmountFlip = useCallback(() => {
    document.removeEventListener("touchstart", touchStartHandler);

    document.removeEventListener("touchmove", touchMoveHandler);

    document.removeEventListener("touchend", touchEndHandler);

    document.removeEventListener("touchcancel", touchCancel);

    document.removeEventListener("mousedown", mouseDownHandler);

    document.removeEventListener("mousemove", mouseMoveHandler);

    document.removeEventListener("mouseup", mouseUpHandler);

    document.removeEventListener("mouseleave", mouseCancel);
  }, []);

  return {
    mountFlip: mountFlip, //use for applicable component mounting
    unmountFlip: unmountFlip, //use for applied component unmounting
    startPoint: startPoint, //can use for desired logic, with x and y property
    endPoint: endPoint, //can use for desired logic, with x and y property
    swiping: swiping, //simple boolean value
    horizontalSwipe: swipeLengthX, //measure of the distance along x-axis
    verticalSwipe: swipeLengthY, //measure of the distance along y-axis
  };
};

export default useFlip;
