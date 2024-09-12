export type ActionSheetOption = {
  label: string;
  onPress?: () => void;
  isDestructive?: boolean;
  isCancel?: boolean;
  shouldRender?: () => boolean;
};

type ActionSheetConfig = {
  options: ActionSheetOption[];
  title?: string;
  message?: string;
  tintColor?: string;
};

const showCustomActionSheet = (
  config: ActionSheetConfig,
  showActionSheetWithOptions: (
    options: any,
    callback: (selectedIndex?: number) => void
  ) => void
) => {
  const filteredOptions = config.options.filter(
    (option) => option.shouldRender?.() ?? true
  );

  const optionLabels = filteredOptions.map((option) => option.label);
  const destructiveButtonIndex = filteredOptions.findIndex(
    (option) => option.isDestructive
  );
  const cancelButtonIndex = filteredOptions.findIndex(
    (option) => option.isCancel
  );

  showActionSheetWithOptions(
    {
      options: optionLabels,
      destructiveButtonIndex,
      cancelButtonIndex,
      title: config.title,
      message: config.message,
      tintColor: config.tintColor,
    },
    (selectedIndex?: number) => {
      if (selectedIndex === undefined) return;

      const selectedOption = filteredOptions[selectedIndex];
      if (selectedOption && selectedOption.onPress) {
        selectedOption.onPress();
      }
    }
  );
};

export default showCustomActionSheet;
