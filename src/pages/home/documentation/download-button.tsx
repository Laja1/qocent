import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DownloadButtonProps {
    fileUrl: string;
    fileName?: string;
    fileSize?: string;
    title?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

export const DownloadButton = ({
    fileUrl,
    fileName,
    fileSize = '200 KB',
    title = 'Download User Guide',
    className = ''
}: DownloadButtonProps) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            // Fetch the file as a blob
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }
            const blob = await response.blob();

            // Extract filename from URL if not provided
            const finalFileName = fileName || fileUrl.split('/').pop()?.split('?')[0] || 'download';

            // Create local URL and trigger download
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = finalFileName;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

            setIsDownloading(false);
            setIsComplete(true);

            // Reset complete state after 2 seconds
            setTimeout(() => {
                setIsComplete(false);
            }, 2000);

        } catch (error) {
            console.error('Download error:', error);
            setIsDownloading(false);
            alert('Failed to download file. Please try again.');
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading || isComplete}
            className={`
                relative w-full max-w-2xl mx-auto
                rounded-xl p-2 px-4 lg:p-4 flex items-center gap-6
                border-2 border-dashed border-red-300
                transition-all duration-300
                hover:border-red-600
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {/* PDF Icon */}
            <div className="relative flex-shrink-0">
                <img src='./images/doc.png' className='object-contain' />
            </div>

            {/* Content */}
            <div className="flex-1 text-left mr-4">
                <h3 className="text-lg lg:text-sm font-semibold text-gray-900">
                    {isDownloading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Downloading...
                        </span>
                    ) : isComplete ? (
                        <span className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-6 h-6" />
                            Downloaded!
                        </span>
                    ) : (
                        title
                    )}
                </h3>
                <p className="text-gray-500 text-sm">
                    {fileSize}
                </p>
            </div>
        </button>
    );
};

export default DownloadButton;