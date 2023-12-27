// import * as Yup from 'yup'

// import { validationFinder } from '../../../utils/utilities'

import CardView from '../CardView/CardView'

const SchoolFranchise = (): JSX.Element => {
    //   const initialValues: CreateInstructorInitialValues = {
    //     instructorName: "",
    //     emailAddress: "",
    //     instructorPhoneNumber: "",
    //     address: "",
    //     yearsOfExperience: "",
    //     ranking: "",
    //     latestCertification: "",
    //     description: "",
    //     selectedActivities: [],
    //     selectedFacilities: [],
    //     termCondition: "",
    //     ranks: ""
    //   };

    // const franchiseName = validationFinder('BUSINESS_NAME')!
    // const franchiseNameReg = new RegExp(franchiseName.pattern)
    // const address = validationFinder('ADDRESS')!
    // const addressReg = new RegExp(address.pattern)
    // const emailAddress = validationFinder('EMAIL_ADDRESS')!
    // const emailAddressReg = new RegExp(emailAddress.pattern)

    // const franchisePhoneNumber = validationFinder('PHONE_NUMBER')!

    // const validationSchema = Yup.object({
    //     franchiseName: Yup.string()
    //         .required(franchiseName.notBlankMsgEn)
    //         .matches(franchiseNameReg, franchiseName.patternMsgEn),
    //     // address: Yup.string()
    //     //   .required(address.notBlankMsgEn)
    //     //   .matches(addressReg, address.patternMsgEn),
    //     emailAddress: Yup.string()
    //         .required(emailAddress.notBlankMsgEn)
    //         .matches(emailAddressReg, emailAddress.patternMsgEn),
    //     franchisePhoneNumber: Yup.string().required(
    //         franchisePhoneNumber.notBlankMsgEn
    //     ),
    //     belts: Yup.string().required('Please select belts'),
    //     description: Yup.string().required('Please enter description'),
    //     defaultLanguage: Yup.string().required(
    //         'Please select default language'
    //     ),
    //     defaultCurrency: Yup.string().required(
    //         'Please select default currency'
    //     ),
    //     selectedActivities: Yup.array()
    //         .of(Yup.string().required('Select an activity'))
    //         .min(1, 'Select at least one activity'),
    //     selectedFacilities: Yup.array()
    //         .of(Yup.string().required('Select an activity'))
    //         .min(1, 'Select at least one facility'),
    // })

    return (
        <>
            <CardView />
        </>
    )
}

export default SchoolFranchise
