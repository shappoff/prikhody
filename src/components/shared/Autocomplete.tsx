import React from 'react';
import styled from 'styled-components';
import TextField from './TextField';
import CircularProgress from './CircularProgress';

interface AutocompleteOption {
  label: string;
  value: any;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: AutocompleteOption | null;
  onChange?: (event: any, newValue: AutocompleteOption | null) => void;
  onInputChange?: (event: any, newInputValue?: string) => void;
  onClose?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  renderInput: (params: any) => React.ReactElement;
  loading?: boolean;
  size?: 'small' | 'medium';
  id?: string;
  className?: string;
  sx?: React.CSSProperties;
  noOptionsText?: string;
  blurOnSelect?: boolean;
}

const AutocompleteWrapper = styled.div<{ customStyles?: React.CSSProperties }>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const OptionsList = styled.div<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1300;
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
  border-radius: 4px;
  margin-top: 4px;
  display: ${props => props.open ? 'block' : 'none'};
`;

const OptionItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${props => props.selected ? 'rgba(25, 118, 210, 0.08)' : 'transparent'};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const LoadingWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoOptionsText = styled.div`
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.6);
`;

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  onInputChange,
  onClose,
  onFocus,
  onBlur,
  renderInput,
  loading = false,
  size = 'medium',
  id,
  className,
  sx,
  noOptionsText = 'Нет вариантов',
  blurOnSelect = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      setInputValue(value.label || '');
    } else {
      setInputValue('');
    }
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        onClose && onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setOpen(true);
    
    if (onInputChange) {
      onInputChange(event, newValue);
    }
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpen(true);
    onFocus && onFocus(event);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (blurOnSelect) {
      setTimeout(() => {
        setOpen(false);
        onBlur && onBlur(event);
      }, 200);
    } else {
      onBlur && onBlur(event);
    }
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    onChange && onChange({ target: { value: option } }, option);
    if (!blurOnSelect) {
      setOpen(false);
    }
  };

  const filteredOptions = React.useMemo(() => {
    if (!inputValue || inputValue.length === 0) {
      return options;
    }
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  const inputParams = {
    onChange: handleInputChange,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    value: inputValue,
    size,
    id,
  };

  return (
    <AutocompleteWrapper ref={wrapperRef} customStyles={sx} className={className}>
      {renderInput(inputParams)}
      <OptionsList open={open && (filteredOptions.length > 0 || loading || (!inputValue && options.length > 0))}>
        {loading && (
          <LoadingWrapper>
            <CircularProgress size={24} />
          </LoadingWrapper>
        )}
        {!loading && filteredOptions.length === 0 && inputValue && (
          <NoOptionsText>{noOptionsText}</NoOptionsText>
        )}
        {!loading && filteredOptions.map((option, index) => (
          <OptionItem
            key={index}
            selected={value?.value === option.value}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionsList>
    </AutocompleteWrapper>
  );
};

export default Autocomplete;

