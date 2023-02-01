import React, {FC} from 'react';
import axios from 'axios';
import VideoPlayer from '@components/VIdeoPlayer/VideoPlayer';

export const UploadFile: FC = () => {
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
	const [uploaded, setUploaded] = React.useState();
	const [file, setFile] = React.useState<any>();

	const handleFileInput =  async () => {
		if(!selectedFile) {
			alert('Please select a file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile);
		const {data} = await axios.post('http://localhost:6789/upload',formData,{
			onUploadProgress: (progressEvent) => {
				console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		});
		setUploaded(data);
	};

	const handleUploadFileInput =  async (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.files);
		setSelectedFile(event.target.files[0]);
	};
	const donload = async () => {
		const {data} = await axios.get('http://localhost:6789/download');
	};
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
				<button onClick={donload}>скачать</button>
			</div>
			<VideoPlayer videoSource={'http://localhost:6789/api/v1/courses/video/12'}/>
		</>
	);
};
