import React from "react";

export type GlobalContent = {
    route: string;
    setRoute: Function;
};

export default React.createContext<GlobalContent>({
    route: "",
    setRoute: () => {},
});