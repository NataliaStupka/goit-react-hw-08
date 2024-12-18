import s from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
//import { changeFilter } from "../../redux/filtersSlice";
import { changeFilter } from "../../redux/filters/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.searchWrapper}>
      <p>Find contact by name</p>

      {/* e.target.value - передамо значення, що вводяться */}
      <input
        type="text"
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
