import { useCallback, useEffect, useState } from "react";
import useDimensions from "../hooks/Dimensions";
import useFlip from "../hooks/Flip";
import classes from "./book.module.css";

type Page = { _id: number; body: string };

interface BookProps {
  title: string;
  pages: Array<Page>;
}

const Book: React.FC<BookProps> = (props) => {
  const [activeFlip, setActiveFlip] = useState<number>(0);
  const [activated, setActivated] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<Array<boolean>>([true]);
  // const [status, setStatus] = useState("open");
  const [currentPage, setCurrentPage] = useState(0);
  const { width, height } = useDimensions();
  const {
    horizontalSwipe,
    verticalSwipe,
    swiping,
    startPoint,
    endPoint,
    mountFlip,
    unmountFlip,
  } = useFlip();

  const generatePageBoolys = useCallback(
    (booly: boolean) => {
      switch (booly) {
        case true:
          const showPages = props.pages.map(() => {
            return true;
          });
          return showPages;
        case false:
          const hidePages = props.pages.map(() => {
            return false;
          });
          return hidePages;
        default:
          return showContent;
      }
    },
    [showContent]
  );

  useEffect(() => {
    setShowContent(generatePageBoolys(true));
  }, []);

  useEffect(() => {
    mountFlip();
    return () => unmountFlip();
  }, []);

  useEffect(() => {
    if (horizontalSwipe >= 500) {
      setActiveFlip(0.5);
    } else setActiveFlip(horizontalSwipe / 1000);

    /**
     * after user clicks, we want the start point initialized
     * we know that wherever the mouse goes, we want the edge of the page to be there until
     * either 1. The mousepoint exceeds a threshold and is released, or
     * 2. the mousepoint fails to reach a threshold and is released
     *
     * in case 1, the outcome is that the page now has a new rotation value
     * in case 2, the page returns to its original position
     *  const ditst = startPoint.x;
     *
     */
  }, [horizontalSwipe, verticalSwipe]);

  useEffect(() => {
    const removeTitle = setTimeout(() => {
      if (activated) {
        const newArray = generatePageBoolys(true);

        newArray[0] = false;
        setShowContent([...newArray]);
      }
    }, 520);
    return () => clearTimeout(removeTitle);
  }, [activated]);

  useEffect(() => {
    console.log(startPoint);
  }, [startPoint]);

  const pageClickHandler = () => {
    console.log("PAGE CLICKED HERE!", startPoint, swiping);
  };

  useEffect(() => {
    console.log("PAGES TO SHOW", showContent);
  }, [showContent]);

  return (
    <>
      {!activated && (
        <div id={classes.promptHolder}>
          <h1 className={classes.promptMessage}>Tap your story to begin!</h1>
        </div>
      )}
      <div
        className={classes.book}
        onClick={() => setActivated(true)}
        style={{
          left: activated ? "50vw" : "25vw",
          transform: activated ? "rotate(0turn)" : "rotate(0.02turn)",
        }}
      >
        <div
          className={classes.bookCover}
          style={{
            transitionDuration: "2s",
            transform: activated ? "rotateY(.5turn)" : "",
          }}
        >
          {showContent[0] && (
            <>
              <h2 /*style={{fontFamily: selectedFont}}*/>{props.title}</h2>
              <img src="" alt="Please ensure JavaScript is active." />
            </>
          )}
        </div>

        {props.pages.map((page) => {
          return (
            <div
              className={classes.bookPage}
              onMouseUp={() => console.log("UP!", endPoint, swiping)}
              onMouseDown={pageClickHandler}
              key={page._id}
            >
              {showContent[page._id] && (
                <>
                  <img src="" alt="Please ensure JavaScript is active." />
                  {page.body}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Book;
