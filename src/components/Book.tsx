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

  useEffect(() => {
    mountFlip();
    return () => unmountFlip();
  }, []);

  const coverClickHandler = () => {
    setActivated(true);
    // setTimeout(() => {
    //   setCurrentPage(1);
    // }, 550);
  };

  useEffect(() => {
    const hideContent = setTimeout(() => {
      if (activated) {
        setCurrentPage(1);
      }
    }, 550);
    return () => clearTimeout(hideContent);
  }, [activated]);

  const pageClickHandler = () => {
    if (
      startPoint.y > innerDimensions.height * 0.5 &&
      startPoint.x > innerDimensions.width * 0.5
    ) {
      console.log("NEXT_BOTTOM_CORNER");
    } else if (
      startPoint.y < innerDimensions.height * 0.5 &&
      startPoint.x < innerDimensions.width * 0.5
    ) {
      console.log("PREV_TOP_CORNER");
    } else if (
      startPoint.y > innerDimensions.height * 0.5 &&
      startPoint.x < innerDimensions.width * 0.5
    ) {
      console.log("PREV_BOTTOM_CORNER");
    } else if (
      startPoint.y < innerDimensions.height * 0.5 &&
      startPoint.x > innerDimensions.width * 0.5
    ) {
      console.log("NEXT_TOP_CORNER");
    }
  };

  // useEffect(() => {
  //   console.log("CURRENT_PAGE", currentPage)
  // }, [currentPage])

  return (
    <>
      {!activated && (
        <div id={classes.promptHolder}>
          <h1 className={classes.promptMessage}>Tap your story to begin!</h1>
        </div>
      )}
      <div
        className={classes.book}
        onClick={coverClickHandler}
        style={{
          marginLeft: activated ? "50vw" : "25vw",
          transform: activated ? "rotate(0turn)" : "rotate(0.02turn)",
        }}
      >
        {props.pages.map((page) => {
          if (page._id === props.pages.length - 1) {
            return (
              <div
                key={page._id}
                className={classes.bookCover}
                onMouseDown={pageClickHandler}
                style={{
                  transitionDuration: "2s",
                  transform: activated ? "rotateY(.5turn)" : "",
                }}
              >
                {currentPage === 0 && (
                  <>
                    <h2
                      /*style={{fontFamily: selectedFont}}*/ style={{
                        fontSize: `calc(30px + ${
                          1 - page.body.length / 100
                        }em)`,
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
                // onMouseUp={() => console.log("UP!", endPoint, swiping)}
                style={{ zIndex: page._id }}
                onMouseDown={pageClickHandler}
                key={page._id}
              >
                {/* {currentPage === page._id && ( */}
                <>
                  <img
                    src={page.img}
                    alt="Please ensure JavaScript is active."
                  />
                  <p>{page.body}</p>
                </>
                {/* )} */}
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
