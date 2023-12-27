import React, { useState } from 'react'
import Tabs from './Tabs/Tabs'
// Tabs Components
import PersonalDetails from './Tabs/PersonalDetails'
import Preferences from './Tabs/Preferences'
import Security from './Tabs/Security'
import PaymentDetails from './Tabs/PaymentDetails'
import Privacy from './Tabs/Privacy'
import EmailNotification from './Tabs/EmailNotification'
import { TabsStyling } from './styles'

type TabsType = {
    label: string
    index: number
    Component: React.FC<object>
}[]

// Tabs Array
const tabs: TabsType = [
    {
        label: 'Personal Details',
        index: 1,
        Component: PersonalDetails,
    },
    {
        label: 'Preferences',
        index: 2,
        Component: Preferences,
    },
    {
        label: 'Security',
        index: 3,
        Component: Security,
    },
    {
        label: 'Payment Details',
        index: 4,
        Component: PaymentDetails,
    },
    {
        label: 'Privacy',
        index: 5,
        Component: Privacy,
    },
    {
        label: 'Email Notifications',
        index: 6,
        Component: EmailNotification,
    },
]

export default function TabsSetting(): JSX.Element {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index)

    return (
        <TabsStyling>
            <div className="TabsMainContainer">
                <Tabs
                    selectedTab={selectedTab}
                    onClick={setSelectedTab}
                    tabs={tabs}
                />
            </div>
        </TabsStyling>
    )
}
