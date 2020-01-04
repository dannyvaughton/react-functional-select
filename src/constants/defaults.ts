import { SelectedOption, FocusedOption, OptionData } from '../types';

const MENU_ITEM_SIZE_DEFAULT = 35;
const MENU_MAX_HEIGHT_DEFAULT = 300;

const NO_OPTIONS_MSG_DEFAULT = 'No options';
const PLACEHOLDER_DEFAULT = 'Select option..';

const FOCUSED_MULTI_DEFAULT = null;
const ON_CHANGE_SINGLE_VALUE_DEFAULT = null;

const OPTIONS_DEFAULT: OptionData[] = [];
const SELECTED_OPTION_DEFAULT: SelectedOption[] = [];

const FOCUSED_OPTION_DEFAULT = Object.freeze<FocusedOption>({
  index: -1,
});

export {
  OPTIONS_DEFAULT,
  PLACEHOLDER_DEFAULT,
  FOCUSED_MULTI_DEFAULT,
  FOCUSED_OPTION_DEFAULT,
  NO_OPTIONS_MSG_DEFAULT,
  MENU_ITEM_SIZE_DEFAULT,
  MENU_MAX_HEIGHT_DEFAULT,
  SELECTED_OPTION_DEFAULT,
  ON_CHANGE_SINGLE_VALUE_DEFAULT
};