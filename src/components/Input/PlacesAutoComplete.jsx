import "./Input.css";
import "./PlacesAutoComplete.css";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Input from "./Input";

function PlacesAutoComplete({
  isLoaded,
  placeholder,
  setValue,
  LeftIcon,
  className,
  ...rest
}) {
  if (!isLoaded)
    return (
      <Input
        placeholder={placeholder}
        setValue={setValue}
        LeftIcon={LeftIcon}
        className={className}
        disabled
        {...rest}
      />
    );

  return (
    <Main
      placeholder={placeholder}
      setValue={setValue}
      LeftIcon={LeftIcon}
      className={className}
      {...rest}
    />
  );
}

const Main = ({
  placeholder,
  setValue: setV,
  LeftIcon,
  className = "",
  label,
  ...rest
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleInput = (e) => {
    setValue(e.target.value);
    setV && setV(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
    setV && setV(val);
  };

  return (
    <div
      className={`custom__input__wrapper places__auto__complete ${className}`}
    >
      {label && <label>{label}</label>}
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <div className="custom__input__container">
          <ComboboxInput
            className="custom__input"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder={placeholder}
            {...rest}
          />
          {LeftIcon && (
            <LeftIcon className="custom__input__icon custom__input__icon--left" />
          )}
        </div>
        <ComboboxPopover style={{ borderRadius: "0.5rem", marginTop: 5 }}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutoComplete;
