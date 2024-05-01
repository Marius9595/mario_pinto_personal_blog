import s from "./SearchBar.module.css"
import React, {type ChangeEvent, useState} from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

export function SearchBar  ({onSearch, onReset}: SearchBarProps)  {

  const [value, setValue] = useState("");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    let delayInMs = 500;
    setTimeout(() => {
      if(e.target.value === "") {
        onReset();
        return;
      }
      onSearch(e.target.value);
    }, delayInMs);
  }

  return (
      <div className={s.search_bar}>
          <span className={s.search_bar__filter_icon}>

          </span>
        <input
            className={s.search_bar__input}
            type="text"
            placeholder="Me gustaría leer sobre..."
            value={value}
            onChange={changeHandler}
        />
      </div>
  )
}


