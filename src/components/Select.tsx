import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "./select"

interface SelectProps {
    // Add your props here
}

const Select: React.FC<SelectProps> = () => {
    return (
        <div>
            <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
    );
};

export default Select;