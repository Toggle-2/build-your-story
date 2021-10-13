import { useEffect } from "react";
import useDimensions from "../hooks/Dimensions";
import useFlip from "../hooks/Flip";
import "./book.css";

const Cover = (props) => {
  return (
    <div className="book-cover">
      <h1>{props.title}</h1>
      <img src={props.coverImage} alt="Please ensure JavaScript is active." />
    </div>
  );
};

const Page = (props) => {
  return (
    <div className="book-page">
      <img src={props.image} alt="Please ensure JavaScript is active." />
      {props.body}
    </div>
  );
};

const Book = (props) => {
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

  useEffect(() => {
    mountFlip();
    return () => unmountFlip();
  }, []);

  //   useEffect(() => {
  //     console.log("START/END", startPoint, endPoint);
  //   }, [startPoint, endPoint]);

  return (
    <div className="book">
      <Cover title={props.title} coverImage={props.coverImage} />

      {props.pages.map((page) => {
        return <Page body={page.body} image={page.image} key={page._id} />;
      })}

      <Cover />
    </div>
  );
};

export default Book;
