import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { InformationBranchStyled } from './styles'
import { useLocation } from 'react-router-dom'
import { BranchDataType } from '../../../redux/features/branch/branchSlice'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'

import LoadingOverlay from '../../../components/Modal/LoadingOverlay'

import { useEffect, useState } from 'react'
import useBranch from '../hooks/useBranch'
import AddPaymentinfo from './AddPaymentinfo'

const BranchInformation: React.FC = () => {
    // const { getLabelByKey } = useScreenTranslation('schoolCreate')
    const { get_bank, getbranchbyid } = useBranch()

    const location = useLocation()
    const branch: BranchDataType = location?.state?.branch

    // const branchToEdit: BranchDataType = location?.state?.branchToEdit
    const { language, currency } = useSelector(
        (state: RootState) => state.appData.data.dropdowns
    )
    // const [paymentData, setPaymentData] = useState<any[]>([])
    const [branchDatas, setBranchDatas] = useState<any>({})

    // console.log("b", branch);
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const defaultLanguage = language.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +branch?.defaultLanguageId
    )

    const defaultCurrency = currency.find(
        (item: DataTypesWithIdAndMultipleLangLabel) =>
            +item.id == +branch?.defaultCurrencyId
    )

    const { loading } = useSelector((state: RootState) => state.branchData)
    async function fetchinfo(): Promise<void> {
        const data = await getbranchbyid(branch.branchId)
        setBranchDatas(data)
        console.log(' getbranchbyid:', data)
    }
    async function fetchPayment(): Promise<void> {
        const data = (await get_bank('BRANCH', branch?.branchId)) as any[]
        // setPaymentData(data)
        console.log('>> fetchPayment:', data)
    }

    useEffect(() => {
        fetchPayment()
        fetchinfo()
        // console.log("?????", paymentData);
    }, [])

    return (
        <InformationBranchStyled>
            <OverlayImages
                overlayImg={branch?.profilePicture || ''}
                backgroundImg={branch?.bannerPicture || ''}
                isEditable={true}
            />
            {/* <OverlayImages backgroundImg={""} overlayImg={""} isEditable={false} /> */}

            <h3>Branch Information</h3>
            <Card>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Branch Name</div>
                            <div className="list-item-value">
                                {branchDatas.branchName || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Type</div>
                            <div className="list-item-value">
                                {branchDatas?.branchType || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Phone Number</div>
                            <div className="list-item-value">
                                {branchDatas?.phoneNumber || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Address</div>
                            <div className="list-item-value">
                                {branchDatas.address || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Belts</div>
                            <div className="list-item-value">
                                {branchDatas?.rank ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Default Language
                            </div>
                            <div className="list-item-value">
                                {(defaultLanguage &&
                                    (defaultLanguage as any)[
                                        selectedLanguage
                                    ]) ||
                                    '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Default Currency
                            </div>
                            <div className="list-item-value">
                                {(defaultCurrency &&
                                    (defaultCurrency as any)[
                                        selectedLanguage
                                    ]) ||
                                    '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Activity</div>
                            <div className="list-item-value">
                                {branchDatas?.activities || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Facilities</div>
                            <div className="list-item-value">
                                {branchDatas.facilities || '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="list-item">
                            <div className="list-item-title">Description</div>
                            <div className="list-item-value">
                                {branchDatas?.description || '--'}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {loading && <LoadingOverlay message="" />}
            <AddPaymentinfo />
        </InformationBranchStyled>
    )
}

export default BranchInformation

// const RenderTableTitle = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="d-flex justify-content-between align-items-center">
//       <h3 className="table-heading">Branch Information</h3>
//       <CustomButton
//         bgcolor={tertiaryBlue2}
//         textTransform="Captilize"
//         color={pureDark}
//         padding="8px 10px"
//         fontFamily={`${fontFamilyMedium}`}
//         width="fit-content"
//         type="submit"
//         title=""
//         fontSize="17px"
//         icon={<img src={plusIcon} alt="edit icon" />}
//         clicked={() => {
//           navigate(`/branch/create`);
//         }}
//       />
//     </div>
//   );
// };
