import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import style from './fileUploader.css'

export default function FileUploader(props) {
    const files = props.files;
    const maxSize= 5242880;
    const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone(
        {
            accept: "image/*",
            onDrop: props.onDrop,
            minSize: 0,
            maxSize: maxSize,
            multiple: true
        }
    );

    const isFileTooLarge = rejectedFiles && rejectedFiles[0].size > maxSize; //TODO

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <div {...getRootProps({ className: style.fileUploaderComponent})}>
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a file to upload!"}
            {isDragActive && !isDragReject && "Drop files here"}
            {isDragReject && "File type not accepted, sorry!"}
            {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>} 
        </div>
    );
}
