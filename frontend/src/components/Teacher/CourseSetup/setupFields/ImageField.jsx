import React, { useEffect, useState } from 'react'
import { RiUploadCloudFill } from "react-icons/ri";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../states/authTokenSlice';
import SaveButton from '../SaveButton';
import { socket } from '../../../../socket';

const ImageField = ({ courseId }) => {

  const [file, setFile] = useState(null);
  const token = useSelector(selectToken)

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile)
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = async () => {

    const formData = new FormData()
    formData.append('courseId', courseId)
    formData.append('courseImage', file)

    await axios.post('http://localhost:5000/courses/update-course', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      socket.emit('courseField change', 'course image has been changed')
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const submitImage = () => {
    if (file) {
      console.log("file", file);
      uploadFile()
    }
  }

  return (
    <div className=" bg-white w-full h-full">
      {file ? (<form className=' bg-white' onSubmit={submitImage} encType='multipart/form-data'>
        <div className="flex flex-col items-center justify-center text-center w-full">
          <img src={file.preview} alt={file.name} className=" rounded-lg w-full h-[250px]" />
        </div>
        <SaveButton content={'Save'} />
        </form>
      ) : (
        <div 
          {...getRootProps()} 
          className={` w-full border-2 border-dashed rounded-lg p-6 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <RiUploadCloudFill className="h-12 w-12 text-gray-400" />
            <p className="text-gray-600 mt-2">Choose files or drag and drop</p>
            <p className="text-gray-400">(Image 4MB)</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageField