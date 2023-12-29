import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ScreenTranslation } from '../redux/features/screenTranslationSlice'

const useScreenTranslation = (
    screenName: string
): {
    screenTranslation: ScreenTranslation[]
    getLabelByKey: (key: string) => string
} => {
    const { translations } = useSelector(
        (state: RootState) => state.translations
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const [screenTranslation, setScreenTranslation] = useState<
        ScreenTranslation[]
    >([])

    const getScreenData = (): void => {
        const screen = translations[screenName] || []
        setScreenTranslation(screen)
    }

    const getLabelByKey = (key: string): string => {
        const item = screenTranslation.find((item2) => item2.labelKey === key)
        if (item) {
            switch (selectedLanguage) {
                case 'en':
                    return item?.en
                case 'es':
                    return item?.es
                case 'pt':
                    return item?.pt
                case 'ar':
                    return item?.ar
                case 'ur':
                    return item?.ur
                default:
                    return ''
            }
        }
        return ''
    }

    useEffect(() => {
        getScreenData()
    }, [screenName, translations])

    return { screenTranslation, getLabelByKey }
}

export default useScreenTranslation
