import React from 'react';
import Dropzone from 'react-dropzone';

const FileUploadFormGroup = (field) => {
  const { input, label, type, meta } = field;
  const error = meta.touched && meta.error;
  const files = input.value;

  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <Dropzone
          name={input.name}
          multiple={false}
          onDrop={(files) => input.onChange(files)}>
          <p>Drop an image file or click to select a file to upload.</p>
        </Dropzone>
        {files && (
          <ul className="list-group">
            {files.map((file, idx) => (
              <li className="list-group-item" key={idx}>
                <img className="img-responsive" src={file.preview} alt="file preview"/>
                {file.name}
              </li>
            ))}
          </ul>
        )}
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default FileUploadFormGroup;