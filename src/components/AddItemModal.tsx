import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
};

type AddItemModalProps = {
  readonly isOpen: boolean;
  readonly onAdd: (formData: FormValues, files: File[]) => void;
  readonly onClose: () => void;
};

function AddItemModal({ isOpen, onAdd, onClose }: AddItemModalProps) {
  const {
    register,
    handleSubmit,
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
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop(acceptedFiles) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="avatar">
      <div className="mb-8 w-auto h-24 rounded-btn">
        <img src={file.preview} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      for (const file of files) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        URL.revokeObjectURL(file.preview);
      }
    },
    [files],
  );

  const onSubmit = handleSubmit((data) => {
    onAdd(data, files);
    reset();
    setFiles([]);
  });

  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <form onSubmit={onSubmit}>
        <div className="modal-box">
          <div className="p-10 card bg-base-200">
            <section className="fieldset">
              <div {...getRootProps({ className: "container" })}>
                <input
                  {...getInputProps({
                    className: "input",
                  })}
                />
                <p>Drag & drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
              <aside>{thumbs}</aside>
            </section>
            <div className="fieldset">
              <label className="label" htmlFor="name">
                <span>Name</span>
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
                <label className="label" htmlFor="name">
                  <span>{errors.name.message ?? "Required"}</span>
                </label>
              )}
            </div>
            <div className="fieldset">
              <label className="label" htmlFor="description">
                <span>Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: true,
                })}
                className={
                  errors.description
                    ? "h-24 textarea textarea-error"
                    : "h-24 textarea"
                }
                placeholder="Description"
              />
              {errors.description && (
                <label className="label" htmlFor="description">
                  <span>{errors.description.message ?? "Required"}</span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItemModal;
