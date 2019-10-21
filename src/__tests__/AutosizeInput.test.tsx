import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { defaultTheme } from '../theme';
import { AutosizeInput } from '../components';
import { AutosizeInputProps } from '../types';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import { AUTOSIZE_INPUT_CLS, AUTOSIZE_INPUT_TESTID } from '../constants/attributes';

// ============================================
// Helper functions for AutosizeInput component
// ============================================

const renderAutosizeInput = (props: AutosizeInputProps) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <AutosizeInput {...props} />
    </ThemeProvider>
  );
};

const createAutosizeInputProps = () => {
  const onBlurSpy = jest.fn();
  const onFocusSpy = jest.fn();
  const onChangeSpy = jest.fn();

  const props: AutosizeInputProps = {
    inputValue: '',
    onBlur: onBlurSpy,
    isSearchable: true,
    onFocus: onFocusSpy,
    onChange: onChangeSpy,
  };

  return {
    props,
    onBlurSpy,
    onFocusSpy,
    onChangeSpy,
  };
};

// ============================================
// Test cases
// ============================================

test('input element has a static className (enables styling via classic CSS) when "addClassNames" = true', async () => {
  const { props } = createAutosizeInputProps();
  const mergedProps = {
    ...props,
    addClassNames: true,
  };
  const { getByTestId } = renderAutosizeInput(mergedProps);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveClass(AUTOSIZE_INPUT_CLS);
});

test('when "disabled" = true, input element is rendered with a "disabled" attribute', async () => {
  const { props } = createAutosizeInputProps();
  const mergedProps = {
    ...props,
    disabled: true,
  };
  const { getByTestId } = renderAutosizeInput(mergedProps);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toBeDisabled();
});

test('input has functional, optional ARIA attributes', async () => {
  const { props } = createAutosizeInputProps();
  const mergedProps = {
    ...props,
    ariaLabel: 'test-label',
    ariaLabelledBy: 'test-labelledby',
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);
  const verifyAriaAttributes = ['aria-label', 'aria-labelledby', 'aria-autocomplete'];
  
  verifyAriaAttributes.forEach((attr) => {
    expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute(attr);
  })
});

test('when "id" has a non-empty string value, input element should get an "id" attribute reflecting that value', async () => {
  const { props } = createAutosizeInputProps();
  const inputId = 'test-input-id';

  const mergedProps = {
    ...props,
    id: inputId,
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);
  expect(getByTestId(AUTOSIZE_INPUT_TESTID!)).toHaveAttribute('id', inputId);
});

test('when "isSearchable" = false, the onChange event should not be created on input element (should also get a "readonly" attribute)', async () => {
  const { props, onChangeSpy } = createAutosizeInputProps();
  
  const mergedProps = {
    ...props,
    isSearchable: false,
  };

  const { getByTestId } = renderAutosizeInput(mergedProps);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);

  fireEvent.change(inputElement);
  expect(onChangeSpy).not.toBeCalled();
  expect(inputElement).toHaveAttribute('readonly');
});

test('"blur" and "focus" events with callback handlers are attached to the input element', async () => {
  const { props, onBlurSpy, onFocusSpy } = createAutosizeInputProps();
  const { getByTestId } = renderAutosizeInput(props);
  const inputElement = getByTestId(AUTOSIZE_INPUT_TESTID!);

  fireEvent.blur(inputElement);
  fireEvent.focus(inputElement);

  expect(onBlurSpy).toBeCalledTimes(1);
  expect(onFocusSpy).toBeCalledTimes(1);
});