import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type selectCompType = {
  handleDataPerRow: (page: number) => void;
  paginationPage: number;
};

const SelectOptionDialog: React.FC<selectCompType> = (props) => {
  const [row, setRow] = React.useState("");
  const optionList = [
    { rows: 5, value: 5 },
    { rows: 10, value: 10 },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setRow(event.target.value);
    props?.handleDataPerRow(+event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Data per row
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={row}
          onChange={handleChange}
          label="Age"
        >
          {optionList.map((option, index) => (
            <MenuItem key={index} value={option.rows}>
              {option.rows}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectOptionDialog;
