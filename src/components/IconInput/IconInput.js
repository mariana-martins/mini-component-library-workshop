import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

/* SIZES: Object defining styles for different IconInput Component sizes. */
const SIZES = {
  small: {
    "--borderBottom": "1px solid black",
    "--fontSize": `${14 / 16}rem`,
    "--padding": 4 + "px",
    "--iconDistance": 24 + "px",
  },

  large: {
    "--borderBottom": "2px solid black",
    "--fontSize": `${18 / 16}rem`,
    "--padding": 8 + "px",
    "--iconDistance": 36 + "px",
  },
};

const IconWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${COLORS.gray700};
`;

const InputContainer = styled.div`
  position: relative;
  width: ${({ width }) => width + "px" || "100%"};

  /* Darken icon on hover */
  &:hover ${IconWrapper} {
    color: black;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  color: ${COLORS.gray700};
  font-weight: 700;
  font-size: var(--fontSize);
  padding: var(--padding);
  padding-left: var(--iconDistance);
  border: 0;
  border-bottom: var(--borderBottom);

  &::placeholder {
    position: absolute;
    left: var(--iconDistance);
    color: ${COLORS.gray500};
    font-weight: 400;
  }

  /* Darken input text on hover */
  &:hover {
    color: black;
  }
`;

// IconInput Component

const IconInput = ({ label, icon, width = 250, size, placeholder }) => {
  const styles = SIZES[size];

  if (!styles) {
    throw new Error(`Unknown size passed to IconInput: ${size}`);
  }

  const iconSizes = (size) => {
    if (size === "small") {
      return 16;
    } else if (size === "large") {
      return 24;
    } else {
      throw new Error(`Unknown size passed to IconInput: ${size}`);
    }
  };

  return (
    <InputContainer width={width}>
      {/* Label for accessibility */}
      <VisuallyHidden>
        <label htmlFor="icon-input">{label}</label>
      </VisuallyHidden>

      {icon && (
        <IconWrapper aria-hidden="true">
          <Icon id={icon} size={iconSizes(size)} />
        </IconWrapper>
      )}

      <StyledInput
        id="icon-input"
        type="text"
        placeholder={placeholder}
        style={styles}
        aria-label={label}
      />
    </InputContainer>
  );
};

export default IconInput;
