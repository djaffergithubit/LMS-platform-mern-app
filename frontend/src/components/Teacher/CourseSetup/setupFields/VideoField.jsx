import React, { useEffect, useState } from 'react';
import { RiUploadCloudFill } from "react-icons/ri";
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../states/authTokenSlice';
import SaveButton from '../SaveButton';
import { socket } from '../../../../socket';
import { ClipLoader } from 'react-spinners';

const VideoField = ({ chapterId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const token = useSelector(selectToken)

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile)
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/*'
  });

  useEffect(() => {
    return () => {
      if (file && file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const uploadFile = async () => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'videos-preset')

    try {
      let cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`

      const res = await axios.post(api, formData)
      const {secure_url} = res.data
      console.log(secure_url);
      return secure_url
      
    } catch (error) {
      console.log(error)
    }
  }

  const submitVideo = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log("file", file);
      const video_url = await uploadFile()
      
      if (video_url !== undefined) {
        console.log('videoUrl', video_url);
        
        await axios.post('http://localhost:5000/chapters/update-chapter', {chapterId:chapterId, videoUrl:video_url}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          socket.emit('chapterField change', 'chapter video has been changed')
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }

      setLoading(false)
      setFile(null)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-full h-full">
      {file ? (
        <form className="flex flex-col items-start justify-start text-start w-full" onSubmit={submitVideo} encType='multipart/form-data'>
          <ReactPlayer 
            url={file.preview}
            playing={false} 
            controls={true} 
            volume={0.8}
            muted={false}
            width='100%'
            height='100%'
           />
           {!loading ? 
              <SaveButton content={'Save'} /> 
                :   
                  <SaveButton content={'Saving...'} /> 
            } 
        </form>
      ) : (
        <div 
          {...getRootProps()} 
          className={`w-full border-2 border-dashed rounded-lg p-6 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <RiUploadCloudFill className="h-12 w-12 text-gray-400" />
            <p className="text-gray-600 mt-2">Choose video files or drag and drop</p>
            <p className="text-gray-400">(Video files up to 4GB)</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoField;
