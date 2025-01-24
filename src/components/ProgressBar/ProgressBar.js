/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

/* SIZES: Object defining styles for different progress bar sizes. */
const SIZES = {
  small: {
    "--borderRadius": 4 + "px",
    "--padding": 0,
    "--height": 8 + "px",
  },
  medium: {
    "--borderRadius": 4 + "px",
    "--padding": 0,
    "--height": 12 + "px",
  },
  large: {
    "--borderRadius": 8 + "px",
    "--padding": 4 + "px",
    "--height": 24 + "px",
  },
};

export const ProgressBarBase = styled.progress`
  --innerBar-color: ${COLORS.primary}; /* Color of the inner progress bar */
  --outerBar-color: ${COLORS.transparentGray15}; /* Background color of the outer bar */

  /* Base styles for the progress bar */
  width: 100%;
  max-width: 370px;
  height: var(--height);
  appearance: none; /* Reset default progress bar styles */
  -webkit-appearance: none; /* WebKit-specific reset */
  -moz-appearance: none; /* Mozilla-specific reset */

  /* Outer bar styles for WebKit browsers */
  &::-webkit-progress-bar {
    background-color: var(--outerBar-color);
    overflow: hidden; /* Ensures the inner bar doesn't overflow */
    box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
    padding: var(--padding);
    border-radius: var(--borderRadius);
  }

  /* Inner bar styles for WebKit browsers */
  &::-webkit-progress-value {
    background-color: var(--innerBar-color);
    border-radius: ${(props) =>
      props.value === 100
        ? "4px"
        : "4px 0 0 4px"}; /* Fully rounded corners when progress is 100%, otherwise rounded on the left only */
  }

  /* Inner bar styles for Mozilla browsers */
  &::-moz-progress-bar {
    background-color: var(--innerBar-color);
    border-radius: ${(props) =>
      props.value === 100
        ? "4px"
        : "4px 0 0 4px"}; /* Fully rounded corners when progress is 100%, otherwise rounded on the left only */
  }
`;

/* ProgressBar Component
   Props:
   - value: Current progress value (0-100)
   - size: Size of the progress bar ('small', 'medium', 'large') */
const ProgressBar = ({ value, size }) => {
  const styles = SIZES[size];

  if(!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`Uploading progress: ${value}%`}
    >
      <ProgressBarBase style={styles} max={100} value={value}></ProgressBarBase>
      <VisuallyHidden>Uploading file: {value}% complete</VisuallyHidden>
    </div>
  );
};

export default ProgressBar;
