import DownloadButton from './download-button'

export default function UserGuide() {
    return (
        <div className='w-full lg:hidden grid place-content-center py-8'>
            <DownloadButton
                fileUrl="https://storage.googleapis.com/qocent-user-guide/qocent-user-guide/Qocent%20User%20Guide-V1.0.pdf?response-content-disposition=attachment"
                fileName="qocent-user-guide.pdf"
            />
        </div>
    )
}
