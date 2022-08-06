import React, { useState } from 'react';
const MAX_COUNT = 5;

const Fileuploads = ({ fileUploadHandler }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const validateFile = (file) => {
        const validTypes = [
            'application/pdf',
            'application/vnd.ms-excel',
            'application/powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'audio/mpeg',
            'audio/AMR',
            'audio/AMR-WB',
            'audio/amr-wb+',
            'application/audio',
            'application/video',
            'video/mp4',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/zip',
            'application/octet-stream',
            'application/x-zip-compressed',
            'multipart/x-zip',
        ];
        console.log(file.type);
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    };

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;

        files.some(file => {
            // Validation checking...
            if (validateFile(file)) {
                if (uploaded.findIndex(f => f.name === file.name) === -1) {
                    uploaded.push(file);
                    // console.log('file', file)
                    // console.log('form data', formData)

                    if (uploaded.length === MAX_COUNT) setFileLimit(true);
                    if (uploaded.length > MAX_COUNT) {
                        alert(`You can only add a maximum of ${MAX_COUNT} files`);
                        setFileLimit(false);
                        limitExceeded = true;
                        return true;
                    }
                }
            } else {
                console.log(file)
                alert(`${file.name} is invalid format`)
            }
        })

        if (!limitExceeded) {
            setUploadedFiles(uploaded)
            fileUploadHandler(uploaded)
        }
    }

    const handleFileEvent = ({ target }) => {
        const chosenFiles = Array.prototype.slice.call(target.files)
        handleUploadFiles(chosenFiles)
    }

    return (
        <>


            <input
                type="file"
                id="fileUpload"
                className="fUpload_file-input"
                multiple
                onChange={handleFileEvent}
                disabled={fileLimit}
                style={{ display: 'none' }}
            />

            <label htmlFor='fileUpload'>
                <a className={`btn btn-dark text-white mr-2 ${!fileLimit ? '' : "disabled"}`}>Choose Files(s)</a>
                <small>to upload the document – upto {MAX_COUNT} documents</small>
            </label>

            <div className='uploaded-files-list'>
                {uploadedFiles.map((file, i) => (
                    <div key={i}>
                        <svg width={'14px'} className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z" /></svg>
                        {file.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Fileuploads