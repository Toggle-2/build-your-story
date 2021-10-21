import StylesContext from "context/styles-context";
import { useContext } from "react";
import classes from "./bookbuilder.module.css";

const BookBuilder: React.FC = () => {
  // const [body, setBody] = useState("");
  // const [title, setTitle] = useState("");
  // // const pageTextRef = useRef(null);
  // // const titleRef = useRef(null);
  // const { index, activePage, setPagesValues, pagesValues } = props;

  // useEffect(() => {
  //   setBody(pagesValues[index]);
  // }, [pagesValues.length]);

  // const titleInputHandler = () => {
  //   const titleValue = titleRef?.current?.value;
  //   if (titleValue && typeof titleValue == "string") setTitle(titleValue);
  // };

  // const textHandler = () => {
  //   const textValue = pageTextRef?.current?.value;
  //   if (textValue) setBody(textValue);
  // };

  // const composeHandler = () => {
  //   setPagesValues((pagesValues) => {
  //     if (activePage > 0) {
  //       pagesValues.splice(index, 1, body);
  //     } else pagesValues.splice(index, 1, title);
  //     return pagesValues;
  //   });
  //   console.log("PAGES_VALUES AFTER COMPOSING", pagesValues);
  // };

  // const slidePlacement = useMemo(() => {
  //   const left = 50;
  //   if (index == 0) return left.toString() + "%";
  //   else if (index > 0) return (left + index * 100).toString() + "%";
  //   else return "";
  // }, [index]);

  // const isTablet = getPlatforms().includes("tablet");

  //   const { width, height } = useDimensions();
  const styles = useContext(StylesContext);

  

  return (
    <form>
      <div className={classes.inputDiv}>
        <h2>Select your book's color theme!</h2>
      </div>
      <div className={classes.buttonRow}>
        <button
          className={classes.red}
          type="button"
          onClick={() => styles.changeColors({coverColor: "red", fontColor: "black"})}
        />
        <button
          className={classes.blue}
          type="button"
          onClick={() => styles.changeColors({coverColor: "blue", fontColor: "black"})}
        />
        <button
          className={classes.yellow}
          type="button"
          onClick={() => styles.changeColors({coverColor: "yellow", fontColor: "black"})}
        />
        <button
          className={classes.orange}
          type="button"
          onClick={() => styles.changeColors({coverColor: "orange", fontColor: "black"})}
        />
        <button
          className={classes.green}
          type="button"
          onClick={() => styles.changeColors({coverColor: "green", fontColor: "black"})}
        />
        <button
          className={classes.violet}
          type="button"
          onClick={() => styles.changeColors({coverColor: "violet", fontColor: "black"})}
        />
        <button
          className={classes.navy}
          type="button"
          onClick={() => styles.changeColors({coverColor: "navy", fontColor: "gold"})}
        />
        <button
          className={classes.maroon}
          type="button"
          onClick={() => styles.changeColors({coverColor: "maroon", fontColor: "gold"})}
        />
      </div>

      <div className={classes.inputDiv}>
        <input
          className={classes.input}
          onBlur={() => {}}
          onInput={() => {}}
          placeholder="Add the story title."
          //   ref={titleRef}
          //   value={title}
        />
      </div>
      <div className={classes.inputDiv}>
        <button type="button" onClick={() => {}} className={classes.upload}>
          Upload Image
        </button>
      </div>
      <div className={classes.inputDiv}>
        <textarea
          className={classes.textarea}
          onBlur={() => {}}
          onInput={() => {}}
          placeholder="Tap to add text!"
          // ref={pageTextRef}
          // value={body}
          // autoGrow={true}
          // defaultValue={pagesValues[index]}
        />
      </div>

      <div className={classes.inputDiv}>
        <h2>Select your book's font!</h2>
      </div>
      <div className={classes.inputDiv}>
        <h4 className={classes.fontOne}>Font Demo</h4>
        <h4 className={classes.fontTwo}>Font Demo</h4>
        <h4 className={classes.fontThree}>Font Demo</h4>
        <h4 className={classes.fontFour}>Font Demo</h4>
      </div>
    </form>
  );
};

interface BuilderFabProps {
  clickHandler: () => void;
  activated: boolean;
}

export const BookBuilderFab: React.FC<BuilderFabProps> = (props) => {
  return (
    <button onClick={props.clickHandler} className={classes.builderFab}>
      {props.activated ? "SEE YOUR STORY" : "TAP TO BUILD"}
    </button>
  );
};

export default BookBuilder;
