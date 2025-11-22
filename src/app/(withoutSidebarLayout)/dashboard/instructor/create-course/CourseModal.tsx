"use client";

import { X } from "lucide-react";
import { type ChangeEvent, useState } from "react";

interface Lecture {
  id: number;
  name: string;
  expanded: boolean;
}

interface Section {
  id: number;
  name: string;
  lectures: Lecture[];
}

const CourseModal = ({
  modalType,
  setOpeModal,
  sections,
  setSections,
  sectionId,
  lectureId,
}: {
  modalType: string;
  setOpeModal: React.Dispatch<
    React.SetStateAction<{ type: string; sectionId?: number; lectureId?: number }>
  >;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  sectionId: number | undefined;
  lectureId: number | undefined;
}) => {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const updateLectureField = (
    sectionId: number | undefined,
    lectureId: number | undefined,
    field: keyof Lecture,
    value: Lecture[keyof Lecture]
  ) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) {
          return section;
        }

        const updatedLectures = section.lectures.map(lecture => {
          if (lecture.id !== lectureId) {
            return lecture;
          }
          return {
            ...lecture,
            [field]: value,
          };
        });
        return {
          ...section,
          lectures: updatedLectures,
        };
      })
    );
  };

  const getVideoDuration = () => {
    // This is a placeholder - you'd need to load the video to get actual duration
    return "1:55";
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file) {
        const isVideo = file.type.startsWith("video/");
        const isPDF = file.type.startsWith("application/pdf");

        if (isVideo || isPDF) {
          setFile(file);
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        } else {
          setFile(null);
          setPreview("");
        }
      } else {
        setFile(null);
        setPreview("");
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      // Here you would implement your actual upload logic
      alert("Updating lecture details...");
      handleClose();
      setOpeModal({ type: "" });
    } else {
      alert("Updating lecture details...");
      setOpeModal({ type: "" });
    }
  };

  const handleClose = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview("");
  };

  const handleReplaceFile = () => {
    setPreview("");
    setFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div className='fixed inset-0 bg-gray-600/60 bg-opacity-50 flex items-center justify-center z-50'>
        {/* Modal Container */}
        <div className='bg-white rounded w-full max-w-md'>
          {/* Modal Header */}
          <div className='flex items-center justify-between px-4 py-2 border-b border-gray-200'>
            <h4 className='font-semibold text-gray-900'>
              {(() => {
                switch (modalType) {
                  case "sectionName":
                    return "Edit Section Name";
                  case "videoUpload":
                    return "Lecture Video";
                  case "fileUpload":
                    return "Upload File";
                  case "caption":
                    return "Add Lecture Caption";
                  case "description":
                    return "Add Lecture Description";
                  case "notes":
                    return "Add Lecture Notes";
                  default:
                    return "";
                }
              })()}
            </h4>
            <button
              onClick={() => setOpeModal({ type: "" })}
              className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4 space-y-4'>
            {(() => {
              switch (modalType) {
                case "sectionName":
                  return (
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Section
                      </label>
                      <input
                        type='text'
                        value={sections[0]?.name || ""}
                        onChange={e =>
                          updateLectureField(sectionId, lectureId, "name", e.target.value)
                        }
                        placeholder='Enter section name here...'
                        className='w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm'
                      />
                    </div>
                  );
                case "videoUpload":
                  return (
                    <>
                      {preview ? (
                        <div className='w-full h-[80px] flex items-center gap-2'>
                          <div className='w-[28%] h-full'>
                            <video
                              src={preview}
                              className='w-full aspect-video'
                              controls={false}
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2'>
                              <span className='text-xs'>FILE UPLOADED</span>
                              <span className='text-gray-500 text-xs'>• {getVideoDuration()}</span>
                              <span className='text-gray-500 text-xs'>
                                • {formatFileSize((file && file.size) || 0)}
                              </span>
                            </div>
                            <p className='text-gray-800 text-xs'>{file?.name}</p>
                            <button
                              onClick={handleReplaceFile}
                              className='text-orange-500 text-xs hover:text-orange-600 transition-colors'
                            >
                              Replace Video
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className='w-full flex items-center'>
                            <label
                              htmlFor='video'
                              className='block flex-1 px-3 py-2 border border-r-0 border-gray-200 rounded-l text-sm'
                            >
                              Upload video
                            </label>
                            <input
                              id='video'
                              type='file'
                              accept='.mp4,.mov,.avi'
                              onChange={handleFileSelect}
                              className='hidden'
                            />
                            <button className='px-3 py-2 border border-l-0 border-gray-200 rounded-r text-sm bg-gray-50'>
                              Upload File
                            </button>
                          </div>
                          <p className='text-xs font-medium text-gray-600 mt-1'>
                            Note: All files should be at least 720p and less than 4.0 GB.
                          </p>
                        </div>
                      )}
                    </>
                  );
                case "fileUpload":
                  return (
                    <>
                      {preview ? (
                        <div className='w-full h-[80px] flex flex-col items-center justify-center gap-2 border border-gray-200 rounded'>
                          <p className='text-gray-800 text-md'>{file?.name}</p>
                          <button
                            onClick={handleReplaceFile}
                            className='text-orange-500 text-xs hover:text-orange-600 transition-colors'
                          >
                            Replace file
                          </button>
                        </div>
                      ) : (
                        <div className='w-full h-[100px] flex items-center justify-center px-6 border border-gray-200 rounded'>
                          <label
                            htmlFor='file'
                            className='block w-full text-sm text-center'
                          >
                            <p>Attach File</p>
                            <p className='text-xs'>Drag and drop or browse for files</p>
                          </label>
                          <input
                            id='file'
                            type='file'
                            accept='.pdf,.doc'
                            onChange={handleFileSelect}
                            className='hidden'
                          />
                        </div>
                      )}
                    </>
                  );
                case "caption":
                  return (
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Captions
                      </label>
                      <textarea
                        rows={4}
                        cols={50}
                        maxLength={100}
                        placeholder='Write Your Lecture Captions here...'
                        className='w-full px-3 py-1.5 border border-gray-200 text-sm rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm resize-none'
                      />
                    </div>
                  );
                case "description":
                  return (
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Descriptions
                      </label>
                      <textarea
                        rows={4}
                        cols={50}
                        maxLength={100}
                        placeholder='Write Your Lecture Description here...'
                        className='w-full px-3 py-1.5 border border-gray-200 text-sm rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm resize-none'
                      />
                    </div>
                  );
                case "notes":
                  return (
                    <div>
                      <div>
                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                          Notes
                        </label>
                        <textarea
                          rows={4}
                          cols={50}
                          maxLength={100}
                          placeholder='Write Your Lecture Notes here...'
                          className='w-full px-3 py-1.5 border border-gray-200 text-sm rounded focus:outline-none focus:ring-1 focus:ring-orange-light focus:border-transparent placeholder:text-gray-400 placeholder:text-sm resize-none'
                        />
                      </div>
                      {preview ? (
                        <div className='w-full h-[80px] flex flex-col items-center justify-center gap-2 border border-gray-200 rounded'>
                          <p className='text-gray-800 text-md'>{file?.name}</p>
                          <button
                            onClick={handleReplaceFile}
                            className='text-orange-500 text-xs hover:text-orange-600 transition-colors'
                          >
                            Replace file
                          </button>
                        </div>
                      ) : (
                        <div className='w-full h-[80px] flex items-center justify-center px-6 border border-gray-200 rounded'>
                          <label
                            htmlFor='file'
                            className='block w-full text-sm text-center'
                          >
                            <p>Upload Notes</p>
                            <p className='text-xs'>Drag and drop or browse for files</p>
                          </label>
                          <input
                            id='file'
                            type='file'
                            accept='.pdf,.doc'
                            onChange={handleFileSelect}
                            className='hidden'
                          />
                        </div>
                      )}
                    </div>
                  );
                default:
                  return <></>;
              }
            })()}

            {/* Action Buttons */}
            <div className='flex items-center justify-between pt-2'>
              <button
                onClick={() => setOpeModal({ type: "" })}
                className='px-4 py-1.5 text-gray-700 font-medium hover:bg-gray-100 rounded transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className='px-4 py-1.5 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2'
              >
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseModal;
