import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const ImagesUpload: React.FC<{
    onImagesSelect: (files: FileList | null) => void
}> = ({ onImagesSelect }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [fileNames, setFileNames] = useState<string[]>([])

    const selectImages = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files

        if (files) {
            const filenames = Array.from(files).map((file) => file.name)

            setSelectedFiles(files)
            setFileNames(filenames)
            onImagesSelect(files) // Call the callback here
        }
    }

    const responsive = {
        0: { items: 1 },
    }

    const items = fileNames.map((fileName, i) => (
        <div className="file-name" key={i}>
            {fileName}
        </div>
    ))

    return (
        <>
            <input
                type="file"
                multiple
                accept="image/*, video/*"
                onChange={selectImages}
            />
            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                disableDotsControls
                disableButtonsControls // Remove arrow controls
                controlsStrategy="alternate"
            />
        </>
    )
}

export default ImagesUpload
