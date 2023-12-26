import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react'

type PostContext = {
    createPostFiles: any[]
    setCreatePostFiles: Dispatch<SetStateAction<any[]>>
    croppedImages: File[]
    setCroppedImages: Dispatch<SetStateAction<File[]>>
    postImages: string[]
    setPostImages: Dispatch<SetStateAction<string[]>>
    postVideos: File[]
    setPostVideos: Dispatch<SetStateAction<File[]>>
}

const PostContext = createContext({} as PostContext)

const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [createPostFiles, setCreatePostFiles] = useState<Array<any>>([])
    const [croppedImages, setCroppedImages] = useState<File[]>([])
    const [postImages, setPostImages] = useState<string[]>([])
    const [postVideos, setPostVideos] = useState<File[]>([])
    return (
        <PostContext.Provider
            value={{
                createPostFiles,
                setCreatePostFiles,
                croppedImages,
                setCroppedImages,
                postImages,
                setPostImages,
                postVideos,
                setPostVideos,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

// make sure use
const usePostContext = () => {
    return useContext(PostContext)
}

export { usePostContext, PostProvider }
