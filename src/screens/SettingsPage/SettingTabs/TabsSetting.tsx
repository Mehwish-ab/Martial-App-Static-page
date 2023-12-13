import React, { useState } from "react";
import Tabs from "./Tabs/Tabs";
// Tabs Components
import PersonalDetails from "./Tabs/PersonalDetails";
import Preferences from "./Tabs/Preferences";
import TabThree from "./Tabs/TabsThree";
import { TabsStyling } from "./styles";

type TabsType = {
    label: string;
    index: number;
    Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
    {
        label: "Personal Details",
        index: 1,
        Component: PersonalDetails
    },
    {
        label: "Preferences",
        index: 2,
        Component: Preferences
    },
    {
        label: "Security",
        index: 3,
        Component: TabThree
    },
    {
        label: "Payment Details",
        index: 4,
        Component: TabThree
    },
    {
        label: "Privacy",
        index: 5,
        Component: TabThree
    },
    {
        label: "Email Notifications",
        index: 6,
        Component: TabThree
    }
];

export default function TabsSetting() {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

    return (
        <TabsStyling>
            <div className="TabsMainContainer">
                <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
            </div>
        </TabsStyling>
    );
}
