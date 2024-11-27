import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";

interface ICoffee {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

interface Props {
  search: string;
}

const blackListCoffees = ["Black Coffee", "Svart Te", "Frapino Caramel"];

const ListCoffee = ({ search }: Props) => {
  const [selectedCoffees, setSelectedCoffees] = useState<ICoffee[]>([]);
  const [coffees, setCoffees] = useState<ICoffee[]>([]);

  const sortedSelectedCoffees = useMemo(() => {
    return [...selectedCoffees].sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedCoffees]);

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      if (!!search) {
        return (
          !blackListCoffees.includes(coffee.title) &&
          coffee.title.includes(search)
        );
      } else {
        return !blackListCoffees.includes(coffee.title);
      }
    });
  }, [search, coffees]);

  const handleSelectCoffee =
    (coffee: ICoffee) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedCoffees((prev) => [...prev, coffee]);
      } else {
        setSelectedCoffees((prev) =>
          prev.filter((item) => item.id !== coffee.id)
        );
      }
    };

  const getData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/hot");
      const data = await response.json();
      if (data?.length > 0) {
        setCoffees(data);
      } else {
        throw data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="fixed bottom-2 right-2 bg-gray-200 p-4">
        <p className="font-medium">Giỏ hàng:</p>
        <br />
        {sortedSelectedCoffees.map((item) => item.title).join(", ")}
      </div>
      <ul>
        {filteredCoffees.map((coffee) => {
          return (
            <li
              key={coffee.id}
              className="first:bg-violet-400 bg-red-300 px-4 py-2 my-2 text-[14px] text-black flex flex-col items-center"
            >
              <input
                id={`coffee-input-${coffee.id}`}
                type="checkbox"
                className="w-4 h-4 ml-4"
                onChange={handleSelectCoffee(coffee)}
              />
              <label htmlFor={`coffee-input-${coffee.id}`}>
                {coffee.title}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default memo(ListCoffee);
