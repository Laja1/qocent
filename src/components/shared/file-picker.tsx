import {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
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

export interface FileUploaderHandle {
  clearFile: () => void;
}

export const FileUploader = forwardRef<FileUploaderHandle, FileUploaderProps>(
  (
    {
      onFileSelect,
      onFileRemove,
      acceptedFileTypes = ["*/*"], // Accept all file types
      maxFileSize = Infinity, // No size limit
      label,
      className,
      error,
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // ✅ Improved clearFile method with proper state reset
    const clearFile = useCallback(() => {
      setSelectedFile(null);
      setUploadProgress(0);
      setIsDragActive(false); // Also reset drag state
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onFileRemove();
    }, [onFileRemove]);

    // Expose clearFile method to parent
    useImperativeHandle(ref, () => ({
      clearFile,
    }), [clearFile]);

    const validateFile = (file: File): string | null => {
      if (maxFileSize !== Infinity && file.size > maxFileSize) {
        return `File size must be less than ${formatFileSize(maxFileSize)}`;
      }

      if (acceptedFileTypes.includes("*/*")) {
        return null;
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
          setUploadProgress(0); // ✅ Reset progress when new file is selected
          onFileSelect(file);

          // ✅ Remove the automatic progress simulation
          // Let the parent component handle upload progress if needed
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
      clearFile(); // ✅ Use the same clearFile method
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      if (bytes === Infinity) return "No limit";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getAcceptString = () => {
      if (acceptedFileTypes.includes("*/*")) {
        return "";
      }
      return acceptedFileTypes.join(",");
    };

    return (
      <div className={`w-full ${className || ""}`}>
        {label && (
          <label className="text-sm text-gray-600 pb-2 block">{label}</label>
        )}

        <div
          className={`
            border border-dashed rounded-xs lg:rounded-xs p-5 lg:p-5 
            transition-all duration-200 cursor-pointer
            ${
              isDragActive
                ? "border-red-500 bg-red-50"
                : "border-gray-500 hover:border-orange-500"
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
              <Upload className="w-6 h-6 text-gray-400" />
              <div className="text-center lg:max-w-xs">
                <p className="text-red-500 text-xs">
                  Click to upload{" "}
                  <span className="text-black dark:text-gray-500">
                    or drag and drop any file
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-1 rounded-full">
                    <File className="text-red-700 w-4 h-4" />
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
                  className="p-1 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* ✅ Only show progress bar if there's actual progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";