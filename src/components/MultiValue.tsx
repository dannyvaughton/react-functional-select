import React from 'react';
import styled from 'styled-components';
import { MultiValueProps } from '../types';
import { FADE_IN_ANIMATION_CSS } from '../constants/styled';

const MultiValueWrapper = styled.div`
  min-width: 0;
  display: flex;
  ${FADE_IN_ANIMATION_CSS}
  ${({ theme: { multiValue }}) => (`
    margin: ${multiValue.margin};
    border-radius: ${multiValue.borderRadius};
    background-color: ${multiValue.backgroundColor};
  `)}
`;

const Label = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme: { multiValue: { label }}}) => (`
    padding: ${label.padding};
    font-size: ${label.fontSize};
    border-radius: ${label.borderRadius};
  `)}
`;

const Clear = styled.div<{ isFocused: boolean }>`
  display: flex;
  ${({ isFocused, theme: { color, multiValue: { clear }}}) => (`
    padding: ${clear.padding};
    font-size: ${clear.fontSize};
    transition: ${clear.transition};
    align-items: ${clear.alignItems};
    font-weight: ${clear.fontWeight};
    border-radius: ${clear.borderRadius};
    background-color: ${isFocused ? color.dangerLight : 'transparent'};

    :hover {
      color: ${color.danger};
      background-color: ${color.dangerLight};
    }
  `)}
`;

const MultiValue: React.FC<MultiValueProps> = ({
  data,
  value,
  isFocused,
  renderOptionLabel,
  removeSelectedOption,
}) => (
  <MultiValueWrapper>
    <Label>{renderOptionLabel(data)}</Label>
    <Clear
      aria-hidden='true'
      isFocused={isFocused}
      onTouchEnd={(e) => removeSelectedOption(value, e)}
      onMouseDown={(e) => removeSelectedOption(value, e)}
    >X</Clear>
  </MultiValueWrapper>
);

export default MultiValue;
