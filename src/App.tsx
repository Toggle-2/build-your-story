import "./App.css";
import { useState } from "react";
import Book from "./components/Book";
import BookBuilder from "./components/BookBuilder";
//Will include file upload later where we can gather assets

// import * as Zin from "./assets/IMG_0329.jpeg";
// import * as Dance from "./assets/IMG_0719.jpeg";
// import * as Cancun from "./assets/IMG_1038.jpeg";
// import * as Couch from "./assets/IMG_1310.jpeg";

function App() {
  const [component, setComponent] = useState(0);
  const [toolbar, setToolbar] = useState(false);

  const view = [
    <Book
      //the final item in the array is the cover
      pages={[
        { _id: 0, body: "My Cool Life", img: ""/*Zin.default*/},
        { _id: 1, body: "Your story is unique!", img: ""/*Dance.default*/ },
        { _id: 2, body: "Your story is unique!", img: ""/*Cancun.default*/ },
        { _id: 3, body: "Your story is unique", img: ""/*Couch.default*/ },
      ]}
    />,
    <BookBuilder />,
  ];

  const toggleToolbar = () => {
    setToolbar(!toolbar);
  };

  return (
    <div className="App">
      <div className="App-body">{view[component]}</div>
    </div>
  );
}

export default App;

/**
    const PageInputs = (props) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  // const pageTextRef = useRef(null);
  // const titleRef = useRef(null);
  const { index, activePage, setPagesValues, pagesValues } = props;

  useEffect(() => {
    setBody(pagesValues[index]);
  }, [pagesValues.length]);

  const titleInputHandler = () => {
    const titleValue = titleRef?.current?.value;
    if (titleValue && typeof titleValue == "string") setTitle(titleValue);
  };

  const textHandler = () => {
    const textValue = pageTextRef?.current?.value;
    if (textValue) setBody(textValue);
  };

  const composeHandler = () => {
    setPagesValues((pagesValues) => {
      if (activePage > 0) {
        pagesValues.splice(index, 1, body);
      } else pagesValues.splice(index, 1, title);
      return pagesValues;
    });
    console.log("PAGES_VALUES AFTER COMPOSING", pagesValues);
  };

  const slidePlacement = useMemo(() => {
    const left = 50;
    if (index == 0) return left.toString() + "%";
    else if (index > 0) return (left + index * 100).toString() + "%";
    else return "";
  }, [index]);

  const isTablet = getPlatforms().includes("tablet");

  return (
    <div className="step-inputs" slot="fixed" style={{ left: slidePlacement }}>
      <div
        id={isTablet ? "image-tablet" : "image-mobile"}
        style={{ paddingTop: isTablet ? 0 : 30 }}
      >
        <IonCard
          button={true}
          onClick={() => {
            /*UPLOAD
          }}
          class="story-builder"
        >
          <IonImg
            src=""
            alt={props.index == 0 ? "Tap to add cover!" : "Tap to add photo!"}
          />
        </IonCard>
      </div>
      {props.index > 0 ? (
        <div id="description">
          <IonCard class="log-item">
            <IonTextarea
              onBlur={composeHandler}
              autoGrow={true}
              placeholder="Tap to add text!"
              ref={pageTextRef}
              onIonInput={textHandler}
              value={body}
              defaultValue={pagesValues[index]}
              class="story-builder"
            ></IonTextarea>
          </IonCard>
        </div>
      ) : (
        <div id="title">
          <IonInput
            onBlur={composeHandler}
            class="add-task"
            ref={titleRef}
            placeholder="Add the story title."
            onIonChange={titleInputHandler}
            value={title}
          ></IonInput>
        </div>
      )}
    </div>
  );
};

export default PageInputs;


        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
 */
