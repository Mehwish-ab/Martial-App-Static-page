import React, { CSSProperties, ReactNode, useState } from 'react'
import { ViewSchoolTabs } from './styles' // Correct import
import PreviewFranchise from '../../Franchise/ListFranchise/PreviewFranchise'
import PreviewBranch from '../../Branches/ListBranch/PreviewBranch'

interface TabProps {
    cityName: string
    children: ReactNode // Import ReactNode for children
    style?: CSSProperties
}

const Tab: React.FC<TabProps> = ({ cityName, children, style }) => {
    return (
        <div id={cityName} className="tabsLink" style={style}>
            {children}
        </div>
    )
}

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('London')

    const openCity = (cityName: string): void => {
        setActiveTab(cityName)
    }

    return (
        <ViewSchoolTabs>
            <div className="mb-5">
                {/* Tab links */}
                <div className="tab">
                    <button
                        className={`tabsLink ${
                            activeTab === 'Branch' ? 'active' : ''
                        }`}
                        onClick={() => openCity('Branch')}
                    >
                        Branch
                    </button>
                    <button
                        className={`tabsLink ${
                            activeTab === 'Franchise' ? 'active' : ''
                        }`}
                        onClick={() => openCity('Franchise')}
                    >
                        Franchise
                    </button>
                </div>

                {/* Tab content */}

                {activeTab === 'Branch' && (
                    <Tab cityName="Branch">
                        <PreviewBranch />{' '}
                    </Tab>
                )}

                {activeTab === 'Franchise' && (
                    <Tab cityName="Franchise">
                        <PreviewFranchise />{' '}
                    </Tab>
                )}
            </div>
        </ViewSchoolTabs>
    )
}

export default Tabs
