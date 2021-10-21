import "./App.css";
import { useState } from "react";
import Book from "./components/Book";
import BookBuilder, { BookBuilderFab } from "./components/BookBuilder";
//Will include file upload later where we can gather assets


function App() {
  const [buildMode, setBuildMode] = useState(false);

  const toggleBuildMode = () => {
    setBuildMode(!buildMode);
  };

  return (
    <div className="App">
        <BookBuilderFab clickHandler={toggleBuildMode} activated={buildMode} />
        <div className="App-body">
          {buildMode ? (
            <BookBuilder />
          ) : (
            <Book
              pages={[/*We will pass our objects stored in state here*/]}
            />
          )}
        </div>
    </div>
  );
}

export default App;

