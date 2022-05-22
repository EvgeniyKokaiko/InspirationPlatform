import { useState } from "react";

export const useUpdate = () => {
    const [state, setState] = useState(0);
    setState(prev => prev + 1);
}