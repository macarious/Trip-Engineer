import React, { useContext, useState } from "react";

const TravelPlanContext = React.createContext();

function TravelPlanProvider({ children }) {
    const [travelPlan, setTravelPlan] = useState();
    const value = { travelPlan, setTravelPlan };

    return (
        <TravelPlanContext.Provider value={value}>
            {children}
        </TravelPlanContext.Provider>
    );
}

const useTravelPlan = () => useContext(TravelPlanContext);

export { useTravelPlan, TravelPlanProvider };