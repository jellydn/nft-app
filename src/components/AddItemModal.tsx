import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
};

type AddItemModalProps = {
  isOpen: boolean;
  onAdd: (formData: FormValues, files: Array<File>) => void;
  onClose: () => void;
};

function AddItemModal({ isOpen, onAdd, onClose }: AddItemModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [files, setFiles] = useState<
    Array<
      File & {
        preview: string;
      }
    >
  >([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="avatar" key={file.name}>
      <div className="w-auto h-24 mb-8 rounded-btn">
        <img src={file.preview} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onSubmit = handleSubmit((data) => {
    onAdd(data, files);
    reset();
    setFiles([]);
  });

  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <DevTool control={control} />
      <form onSubmit={onSubmit}>
        <div className="modal-box">
          <div className="p-10 card bg-base-200">
            <section className="form-control">
              <div {...getRootProps({ className: "container" })}>
                <input
                  {...getInputProps({
                    className: "input",
                  })}
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
              <aside>{thumbs}</aside>
            </section>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className={errors.name ? "input input-error" : "input"}
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt">{errors.name.message || "Required"}</span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: true,
                })}
                className={
                  errors.description
                    ? "h-24 textarea textarea-bordered textarea-error"
                    : "h-24 textarea textarea-bordered"
                }
                placeholder="Description"
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt">{errors.description.message || "Required"}</span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button type="button" onClick={onClose} className="btn">
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItemModal;
