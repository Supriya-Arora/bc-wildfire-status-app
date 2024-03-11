type Props = {
    selectedOption: string;
    options: string[];
    label: string;
    onChange: (value: string) => void;
  };
  
  /**
   * Renders a select element with options
   * @param props.selectedOption - The currently selected option
   * @param props.options - The options to render
   * @param props.label - The label for the select element
   * @param props.onChange - The function to call when the select value changes
   */
  export const Filter = ({ selectedOption, options, label, onChange }: Props) => {
    return (
      <span className="mr-[1rem]">
        <label className="mr-1">{label}</label>
        <select
          className="max-w-[10rem] p-2 rounded-md text-black"
          onChange={(e) => onChange(e.target.value)}
          value={selectedOption}
        >
          <option value="">All</option>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </span>
    );
  };