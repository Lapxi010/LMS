import React, {FC} from 'react';


export const UploadFile: FC = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [uploaded, setUploaded] = React.useState();


    const handleFileInput =  async () => {
        if(!selectedFile) {
            alert('Please select a file');
            return
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        const res = await fetch('http://localhost:6789/upload', {
            method: 'POST',
            body: formData
        })
        const data =await res.json()
        setUploaded(data)
    }

    const handleUploadFileInput =  async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        setSelectedFile(event.target.files[0]);
    }

    return (
        <>
            <input type="file" onChange={handleUploadFileInput} />
            <button onClick={handleFileInput}>Upload now!</button>

            {
                selectedFile && (
                <ul>
                    <li>Name: {selectedFile.name}</li>
                    <li>Type: {selectedFile.type}</li>
                    <li>Size: {selectedFile.size}</li>
                </ul>
                    )
            }
            <div>
                <button><a href={'http://localhost:6789/getPdf'} download={'http://localhost:6789/getPdf'}>скачать</a></button>
            </div>
        </>
    )
}
