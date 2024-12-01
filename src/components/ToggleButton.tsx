import React from 'react';

interface ToggleButtonProps {
  isToggled: boolean;
  toggleState: () => void;
  labelOn: string;
  labelOff: string;
  disabled: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  toggleState,
  labelOn,
  labelOff,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={toggleState}
      className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
    >
      {isToggled ? labelOn : labelOff}
    </button>
  );
};

export default ToggleButton;
