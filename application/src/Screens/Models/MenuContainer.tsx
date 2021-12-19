import React, {useState} from 'react';
import MenuComponent from "../MenuComponent";

const MenuContainer = () => {
    const [search, setSearch] = useState("");
    const STATE = {
        search,
        setSearch,
        onChange,

    }
    function onChange(v: string) {
        setSearch(v)
        console.log(search)
    }

    return (
        <MenuComponent {...STATE} />
    );
};

export default MenuContainer;