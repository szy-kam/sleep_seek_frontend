import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import style from "./fileUploader.css";
import { useTranslation } from "react-i18next";

export default function FileUploader(props) {
    const files = props.files;
    const maxSize = 1048000; // 1 MB
    const { t } = useTranslation();
    const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
        accept: "image/*",
        onDrop: props.onDrop,
        minSize: 10,
        maxSize: maxSize,
        multiple: true,
    });

    const isFileTooLarge = rejectedFiles && rejectedFiles[0].size > maxSize; //TODO

    useEffect(
        () => () => {
            if (files) files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <div {...getRootProps({ className: style.fileUploaderComponent })}>
            <input {...getInputProps()} />
            {!isDragActive && t("FILE_UPLOADER_DEFAULT")}
            {isDragActive && !isDragReject && t("FILE_UPLOADER_DROP_HERE")}
            {isDragReject && t("FILE_UPLOADER_WRONG_FILETYPE")}
            {isFileTooLarge && t("FILE_UPLOADER_TOO_LARGE")}
        </div>
    );
}
