/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./StickySlider.css";
import "./slider-display.css";

const StickySlider = ({ children, clickState, setClickState}) => 
  // const WIDTH = width ? width + "vw" : "60vw";
   (
    <div>
      <SlidingPane
        className="sticky-slider"
        isOpen={clickState}
        hideHeader={true}
        width={"100vw"}
        onRequestClose={() => {
          setClickState(false);
        }}
      >
        <div className="sticky-slider-wrapper">{children}</div>
      </SlidingPane>
    </div>
  )
;

export default StickySlider;
