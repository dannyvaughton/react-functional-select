import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import GlobalStyle from './globalStyle';
import { configure, addParameters } from '@storybook/react';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// polyfill EventSource for Edge and IE browsers
global.EventSource = NativeEventSource || EventSourcePolyfill;

// Define storybook global configuration
const _globalStyleId = 'gen3-global-style';
const req = require.context('../__stories__', true, /\.story\.tsx$/);

addParameters({
  options: {
    theme,
    storySort: (a, b) => {
      return (a[1].kind === b[1].kind) ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  }
});

// In loadStories mount the GlobalStyle component once (styled-component createGlobalStyle function)
// ...instead of the alternative which is to add it as a decorator - this causes mount/unmount with every story navigation
const loadStories = () => {
  const setupGlobalStyle = () => {
    const globalStyleEl = document.getElementById(_globalStyleId) || (() => {
      const el = document.createElement('div');
      el.id = _globalStyleId;
      document.head.append(el);
      return el;
    })();

    return {
      containerNode: globalStyleEl,
      cleanupContainerNode: () => {
        globalStyleEl && document.head.removeChild(globalStyleEl);
      }
    };
  };
  
  // Mount GlobalStyle & cleanup temp node created after mounting
  const { containerNode, cleanupContainerNode } = setupGlobalStyle();
  ReactDOM.render(<GlobalStyle />, containerNode, cleanupContainerNode);

  // Automatically import all files ending in *.story.tsx found at path '../__stories__'
  req.keys().forEach(file => req(file));
};

configure(loadStories, module);