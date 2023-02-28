import React, { Component, Fragment } from "react";

import Base from "../../components/Base";
import SvgGrid from "../../components/SvgGrid";

const min = Math.min(window.innerWidth, window.innerHeight);
const width = Math.min(min, 500);
const height = Math.min(min, 500);
const cellSize = 100;

const containerProps = {
  className: "border-container tall-container display-inline-block reset-line-height"
};

export default class ComputeInitialOffset extends Component {
  renderChild = ({ innerRef, ...props }) => (
    <SvgGrid
      ref={innerRef}
      {...props}
      {...{
        width,
        height,
        cellSize
      }}
      cols={width / cellSize}
      rows={height / cellSize}
      viewBox={`0 0 ${width} ${height}`}
    />
  );

  render() {

    const computeInitialOffsetToBottom = (rect, width, height, initialZoomFactor) => {
      const x = -Math.abs(width * initialZoomFactor- rect.width) / 2;
      const y = -Math.abs(height * initialZoomFactor - rect.height);

      return { x, y };
    }

    return (
      <Fragment>
        <p>
          In desktop browser press <code>Ctrl\Cmd</code> and scroll:
        </p>

        <pre>{`// default computeInitialOffset behavior
<QuickPinchZoom />`}</pre>
        <Base
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`// set offset to the bottom
const computeInitialOffsetToBottom = (rect, width, height, initialZoomFactor) => {
  const x = -Math.abs(width * initialZoomFactor- rect.width) / 2;
  const y = -Math.abs(height * initialZoomFactor - rect.height);

  return { x, y };
}
<QuickPinchZoom computeInitialOffset={computeInitialOffsetToBottom} />`}</pre>
        <Base
          styles={{height: '900px;'}}
          wheelScaleFactor={3000}
          computeInitialOffset={computeInitialOffsetToBottom}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
