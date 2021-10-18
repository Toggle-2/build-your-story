import { useEffect, useState } from "react";
import useDimensions from "../hooks/Dimensions";
import useFlip from "../hooks/Flip";
import classes from "./book.module.css";

type Page = { _id: number; body: string; img: string };

interface BookProps {
  pages: Array<Page>;
}

const Book: React.FC<BookProps> = (props) => {
  const [activated, setActivated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { width, height } = useDimensions();
  const {
    innerDimensions,
    horizontalSwipe,
    verticalSwipe,
    swiping,
    startPoint,
    endPoint,
    mountFlip,
    unmountFlip,
  } = useFlip();

  const { pages } = props;

  useEffect(() => {
    mountFlip();
    return () => unmountFlip();
  }, []);

  useEffect(() => {
    const hideContent = setTimeout(() => {
      if (activated) {
        setCurrentPage(1);
      }
    }, 550);
    return () => clearTimeout(hideContent);
  }, [activated]);

  const pageClickHandler = () => {
    const clickNextBottomCorner =
      startPoint.y > innerDimensions.height * 0.5 &&
      startPoint.x > innerDimensions.width;
    const clickNextTopCorner =
      startPoint.y < innerDimensions.height * 0.5 &&
      startPoint.x > innerDimensions.width * 0.5;
    const clickPrevTopCorner =
      startPoint.y < innerDimensions.height * 0.5 &&
      startPoint.x < innerDimensions.width * 0.5;
    const clickPrevBottomCorner =
      startPoint.y > innerDimensions.height * 0.5 &&
      startPoint.x < innerDimensions.width * 0.5;

    if (currentPage === 0) {
      setActivated(true)
    } else {
      if (clickNextBottomCorner) {
        console.log("NEXT_BOTTOM_CORNER");
        if (currentPage !== pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else if (clickNextTopCorner) {
        console.log("NEXT_TOP_CORNER");
        if (currentPage !== pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else if (clickPrevTopCorner) {
        console.log("PREV_TOP_CORNER");
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      } else if (clickPrevBottomCorner) {
        console.log("PREV_BOTTOM_CORNER");
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    }
  };

  return (
    <>
      {!activated && (
        <div id={classes.promptHolder}>
          <h1 className={classes.promptMessage}>Tap your story to begin!</h1>
        </div>
      )}
      <div
        className={classes.book}
        onClick={pageClickHandler}
        style={{
          marginLeft: activated ? "50vw" : "25vw",
          transform: activated ? "rotate(0turn)" : "rotate(0.02turn)",
        }}
      >
        {pages.map((page) => {
          if (page._id === 0) {
            return (
              <div
                key={page._id}
                className={classes.bookCover}
                style={{
                  transitionDuration: "2s",
                  transform: activated ? "rotateY(.5turn)" : "",
                  zIndex: currentPage === 0 ? pages.length : 0,
                }}
              >
                {currentPage === 0 && (
                  <>
                    <h2
                      /*style={{fontFamily: selectedFont}}*/
                      style={{
                        fontSize: `calc(5px + ${
                          4 - page.body.length / 100
                        }vmin)`,
                      }}
                    >
                      {page.body}
                    </h2>
                    <img
                      src={page.img}
                      alt="Please ensure JavaScript is active."
                    />
                  </>
                )}
              </div>
            );
          } else
            return (
              <div
                className={classes.bookPage}
                style={{
                  zIndex: page._id === currentPage ? pages.length : 0,
                  transform: page._id < currentPage ? "rotateY(.5turn)" : "",
                }}
                onMouseDown={pageClickHandler}
                key={page._id}
              >
                <>
                  <img
                    src={page.img}
                    alt="Please ensure JavaScript is active."
                  />
                  <p>{page.body}</p>
                </>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default Book;

/**
 *
 */
