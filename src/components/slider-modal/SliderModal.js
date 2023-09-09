/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./non-sticky-slider.css";
import "./slider-display.css";

const SliderModal = ({
  children,
  openState,
  setOpenState,
  width,
  from,
  height,
}) => {
  const WIDTH = width ? `${width  }vw` : "60vw";

  const sliderHeight =
    height === 30
      ? "slider-quarter"
      : null || height === 50
      ? "slider-half"
      : null || height === 75
      ? "slider-three-quarter"
      : null;
  return (
    <div>
      <SlidingPane
        className={`non-sticky-slider ${sliderHeight}`}
        isOpen={openState}
        hideHeader={true}
        width={WIDTH}
        from={from}
        height={height}
        onRequestClose={() => {
          setOpenState(false);
        }}
      >
        {children}
      </SlidingPane>
    </div>
  );
};

export default SliderModal;
