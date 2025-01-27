import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";

const Wrapper = styled.div`
  position: relative;
  width: max-content;
`;

const NativeSelect = styled.select`
  /* Fully covers the parent container */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Hides the default select but keeps it functional for accessibility */
  opacity: 0;

  /* Resets browser-specific styles */
  -webkit-appearance: none; /* Safari compatibility */
  -moz-appearance: none; /* Firefox compatibility */
  appearance: none; /* Standard compatibility */
`;

const SelectMask = styled.div`
  color: ${COLORS.gray700};
  background-color: ${COLORS.transparentGray15};
  font-size: ${16 / 16}rem;
  padding: 12px 16px;
  padding-right: 52px; /* Leaves room for the custom icon */
  border-radius: 8px;

  /* Visual indicator for keyboard focus */
  ${NativeSelect}:focus + & {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color; /* Safari/Chrome focus */
  }

  ${NativeSelect}:hover + & {
    color: ${COLORS.black};
  }
`;

const IconWrapper = styled.div`
  /* Positions the custom icon inside the select */
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto; /* Centers the icon vertically */
  width: var(--size);
  height: var(--size);

  /* Prevents the icon from interfering with pointer events */
  pointer-events: none;
`;

const Select = ({ id, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      {/* Native select remains functional but invisible */}
      <NativeSelect id={id} value={value} onChange={onChange}>
        {children}
      </NativeSelect>

      {/* Custom display for the select value and icon */}
      <SelectMask>
        {displayedValue}
        <IconWrapper style={{ "--size": "24px" }}>
          {/* Replaces the default browser dropdown icon */}
          <Icon id="chevron-down" strokeWidth={1} size={24} />
        </IconWrapper>
      </SelectMask>
    </Wrapper>
  );
};

export default Select;
