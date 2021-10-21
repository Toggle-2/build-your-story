import React, { useState } from "react";

const StylesContext = React.createContext({
  colors: {coverColor: "", fontColor: ""},
  font: "",
  changeColors: (colors: Colors) => {},
  changeFont: (font: Fonts) => {},
});

type Fonts = "Rampart One" | "Festive" | "Permanent Marker" | "Alfa Slab";

type Colors =
  {coverColor: "red", fontColor: "black"}
  | {coverColor: "blue", fontColor: "black"}
  | {coverColor: "yellow", fontColor: "black"}
  | {coverColor: "orange", fontColor: "black"}
  | {coverColor: "green", fontColor: "black"}
  | {coverColor: "violet", fontColor: "black"}
  | {coverColor: "navy", fontColor: "gold"}
  | {coverColor: "maroon", fontColor: "gold"}

export const StylesContextProvider: React.FC = (props) => {
  const [colors, setColors] = useState<Colors>({coverColor: "red", fontColor: "black"});
  const [font, setFont] = useState<Fonts>("Alfa Slab");

  return (
    <StylesContext.Provider
      value={{
        colors: {coverColor: colors.coverColor, fontColor: colors.fontColor},
        font: font,
        changeColors: setColors,
        changeFont: setFont,
      }}
    >
      {props.children}
    </StylesContext.Provider>
  );
};

export default StylesContext;
