import React from 'react';
import { useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import { cityList } from "../../public/city-list";
import { parseCookies, setCookie, destroyCookie } from 'nookies';


const options = cityList;



const useStyles = makeStyles({
  option: {
    fontSize: 12,
    backgroundColor: "white",
    '& > span': {
      marginRight: 10,
      fontSize: 12,
    },
  },
});



export default function SearchBar4() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const router = useRouter();


  const filterOptions = createFilterOptions({
    limit: 12,
    matchFrom: 'start'
  });

  function handleChange(event) {
    setInputValue(event.target.value);
    setValue(event.target.value);
  }

  function handleClearSearch(event) {
    setInputValue("");
    setValue("");
  }

  async function handleSubmit(event) {
    if (inputValue.length > 1) {
      router.push(`/location/?search=${inputValue}`);
      setInputValue("");
    }
  }

  async function handleSelect(event, newValue) {
    router.push(`/location/?search=${newValue}`);
    setInputValue("");
  }



  return (
    <div class="row search-bar">
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {handleSelect(event, newValue)}}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
        id="controllable-states-demo"
        options={inputValue.length < 3 ? [] : options.map(option => option.city + ", " + option.region + ", " + option.country)}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search City or Zip Code" variant="outlined" />}
        filterOptions={filterOptions}
        size="small"
        freeSolo
      />
      <Button
        size="small"
        className={inputValue.length > 0 ? "searchBarButton" : "hidden-button"}
        type="clear"
        icon="delete"
        onClick={handleClearSearch}
      />
      <Button
        size="small"
        className="searchBarButton"
        type="submit"
        icon="search"
        onClick={handleSubmit}
      />
    </div>
  );
}
