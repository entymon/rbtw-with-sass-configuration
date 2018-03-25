import * as React from "react";
import * as ReactDOM from "react-dom";

import * as style from './styles/main.scss';

const Index = () => {
  return <div className={style.testStyle}>Hello React! test</div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));
