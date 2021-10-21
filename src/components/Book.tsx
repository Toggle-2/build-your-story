// import StylesContext from "context/styles-context";
import StylesContext from "context/styles-context";
import { useContext, useEffect, useRef, useState } from "react";
import useFlip from "../hooks/Flip";
import classes from "./book.module.css";

type Page = { _id: number; body: string; img: string };

interface BookProps {
  pages: Array<Page>;
}

interface PageProps extends Page {
  activePage: number;
  pages: Array<Page>;
  mouseDownHandler: () => void;
  bookBinding: number;
}

const Page: React.FC<PageProps> = (props) => {
  const [pageRight, setPageRight] = useState<number>(0);
  const [show, setShow] = useState<boolean>(true);
  const { _id, body, img, activePage, pages, mouseDownHandler, bookBinding } =
    props;

  const PageRef = useRef<HTMLDivElement>(null);

  // const styles = useContext(StylesContext);

  setTimeout(() => {
    const right = PageRef.current?.getBoundingClientRect().right;
    if (typeof right === "number") setPageRight(right);
  }, 10);

  useEffect(() => {
    if (pageRight <= bookBinding) {
      setShow(() => false);
    } else setShow(true);
  }, [pageRight, bookBinding]);

  return (
    <div
      className={classes.bookPage}
      style={{
        zIndex: pages.length - _id,
        transform: _id < activePage ? "rotateY(.5turn)" : "",
      }}
      onMouseDown={mouseDownHandler}
      ref={PageRef}
      key={_id}
    >
      {show && (
        <>
          <img src={img} alt="Please ensure JavaScript is active." />
          <p>{body}</p>
        </>
      )}
    </div>
  );
};

const Book: React.FC<BookProps> = (props) => {
  const [activated, setActivated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    innerDimensions,
    // horizontalSwipe,
    // verticalSwipe,
    // swiping,
    startPoint,
    // endPoint,
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
      if (currentPage === 1) {
        setActivated(true);
      }
    }, 550);
    return () => clearTimeout(hideContent);
  }, [activated, currentPage]);

  const pageClickHandler = () => {
    const clickNextBottomCorner =
      startPoint.y > innerDimensions.height * 0.5 &&
      startPoint.x > innerDimensions.width * 0.5;
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
      setCurrentPage(1);
    } else {
      if (clickNextBottomCorner) {
        if (currentPage !== pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else if (clickNextTopCorner) {
        if (currentPage !== pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else if (clickPrevTopCorner) {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      } else if (clickPrevBottomCorner) {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    }
  };

  const styles = useContext(StylesContext);

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
          marginLeft: currentPage > 0 ? "50vw" : "25vw",
          transform: currentPage > 0 ? "rotate(0turn)" : "rotate(0.02turn)",
        }}
      >
        {pages.map((page) => {
          if (page._id === 0) {
            return (
              <div
                key={page._id}
                className={classes.bookCover}
                style={{
                  backgroundColor: styles.colors.coverColor,
                  transitionDuration: "2s",
                  transform: currentPage > 0 ? "rotateY(.5turn)" : "",
                  zIndex: currentPage <= 1 ? pages.length : 0,
                }}
              >
                {!activated && (
                  <>
                    <h2
                      style={{
                        color: styles.colors.fontColor,
                        fontFamily: styles.font,
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
              <Page
                key={page._id}
                body={page.body}
                img={page.img}
                _id={page._id}
                pages={props.pages}
                mouseDownHandler={pageClickHandler}
                activePage={currentPage}
                bookBinding={innerDimensions.width * 0.5}
              />
            );
        })}
        <div
          className={classes.bookCover}
          style={{
            zIndex: currentPage === pages.length ? pages.length : 0,
          }}
        ></div>
      </div>
    </>
  );
};

export default Book;
