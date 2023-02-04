import React, {FC} from "react";
import axios from "axios";

export const UploadImage: FC<{id: string}> = ({id}) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [uploaded, setUploaded] = React.useState();
    const handleFileInput = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadImage/${id}`, formData, {
            onUploadProgress: (progressEvent) => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
            }
        });
        setUploaded(data);
    };
    const handleUploadFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <div>
            <input type="file" onChange={handleUploadFileInput}/>
            <button onClick={handleFileInput}>Upload now!</button>
        </div>
    )
}
