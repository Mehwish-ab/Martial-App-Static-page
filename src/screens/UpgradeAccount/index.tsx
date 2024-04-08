/* eslint-disable max-len */
import { useState } from 'react'
import { CardViewStyled } from './UpgradeAccount'
import { Avatar, Dropdown, List, Rate } from 'antd'
import school from '../../assets/icons/school.svg'
import franchies from '../../assets/icons/franchise.png'
import { Link, useNavigate } from 'react-router-dom'
import FormControl from '../../components/FormControl'
import placeHolderImage from '../../assets/images/custom_card_placeholder.png'
import {
    darkBlue,
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
    pureDark,
} from '../../components/GlobalStyle'
import CustomButton from '../../components/CustomButton/CustomButton'
import RightArrow from '../../assets/images/rightArrow.svg'
import LeftArrow from '../../assets/images/leftArrow.svg'
import DateCalander from '../../assets/images/dateCalander.svg'
import FilterIcon from '../../assets/icons/ic_filter.svg'
import { CustomDiv } from './CustomDiv'

const CardView = (): JSX.Element => {
    const navigate = useNavigate()
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
    const [value, setValue] = useState(3)

    const items = [
        {
            key: '1',
            title: 'School',
            text: 'Elevate your school account for enhanced performance',
            link: '/school/create',
            src: school,
            // onClick: () => navigation(record, "view"),
        },
        {
            key: '2',
            title: 'Franchies',
            text: 'Boost your franchise account with additional capabilities',
            link: '/franchise/create',
            src: franchies,
            // onClick: () => navigation(record, "edit"),
        },
        {
            key: '3',
            title: 'Instructor',
            text: 'Unlock additional features to optimize branch operations',
            link: '/instructor/create',
            src: franchies,
            // onClick: () => navig[ation(record, "subscribe"),
        },
    ]

    return (
        <CardViewStyled>
            <div className="mb-20 d-flex justify-content-between align-items-center">
                <div style={{ textAlign: 'center' }}>
                    <p className="table-heading">
                        Do you Want to UpGrade Your Account?
                    </p>
                </div>
            </div>
            <div className="custom_card_list d-flex flex-wrap">
                {items.map((item) => {
                    return (
                        <div
                            onClick={() => navigate(item.link)}
                            className="custom_card"
                            key={item.key}
                        >
                            <List.Item>
                                <List.Item.Meta title={item.title} />
                                <img style={{ width: '20px' }} src={item.src} />
                            </List.Item>
                            <div
                                className="custom_card_placeholder_img"
                                id="cardImg"
                                style={{ textAlign: 'center' }}
                            >
                                <p> {item.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CardViewStyled>
    )
}

export default CardView
