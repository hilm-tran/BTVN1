import { ChangeEvent, memo, useEffect, useState } from "react";
import ListCoffee from "./ListCoffee";

const Test = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTimeout(() => {
      setSearch(event.target.value);
    }, 500);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      alert("Chúc mừng bạn trúng thưởng iPhone 17");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <input
        placeholder="Search here"
        type="text"
        onChange={handleSearchChange}
        className="mb-4 border-red-500 border"
      />
      <ListCoffee search={search} />
    </>
  );
};

export default memo(Test);
