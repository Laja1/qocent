import { useState, useCallback, useRef } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  label?: string;
  className?: string;
  error?: string;
}

export const FileUploader = ({
  onFileSelect,
  onFileRemove,
  acceptedFileTypes = ["application/pdf", "image/*", "text/csv"],
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  label,
  className,
  error,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 👈 ref

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize) {
      return `File size must be less than ${formatFileSize(maxFileSize)}`;
    }

    const fileType = file.type;
    const isValidType = acceptedFileTypes.some((type) => {
      if (type.includes("*")) {
        return fileType.startsWith(type.split("*")[0]);
      }
      return fileType === type;
    });

    if (!isValidType) {
      return "File type not supported";
    }

    return null;
  };

  const onDrop = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const file = fileArray[0];

      if (file) {
        const validationError = validateFile(file);
        if (validationError) {
          return; // Could trigger error state here
        }

        setSelectedFile(file);
        onFileSelect(file);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 100);
      }
    },
    [onFileSelect, acceptedFileTypes, maxFileSize]
  );


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    onDrop(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onDrop(e.target.files);
    }
  };
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 👈 reset input value
    }
    onFileRemove();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAcceptString = () => {
    return acceptedFileTypes.join(",");
  };

  return (
    <div className={`w-full ${className || ""}`}>
      {label && (
        <label className="text-sm text-gray-600 pb-2 block">{label}</label>
      )}

      <div
        className={`
          border-2 border-dashed rounded-sm lg:rounded-sm p-10 lg:p-20 
          transition-all duration-200 cursor-pointer
          ${
            isDragActive
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-purple-500"
          }
          ${error ? "border-red-500 bg-red-50" : ""}
        `}
   
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragActive(false);
        }}
       
        onClick={() => fileInputRef.current?.click()}
      >
        <input
         ref={fileInputRef}
         id="file-input"
         type="file"
          className="hidden"
          accept={getAcceptString()}
          onChange={handleFileInput}
        />

        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <Upload className="w-10 h-10 text-gray-400" />
            <div className="text-center lg:max-w-xs">
              <p className="text-purple-500">
                Click to upload{" "}
                <span className="text-black dark:text-gray-500">
                  or drag and drop CSV or PDF (max. 10MB)
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 w-full ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-1 rounded-full">
                  <File className="text-purple-700 w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="p-1 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
