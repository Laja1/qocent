import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CustomSection from '../components/custom-section';
import DownloadButton from './download-button';

interface DocumentationStep {
    image: string;
    caption: string;
}

interface DocumentationArticle {
    title: string;
    lastUpdated: string;
    description: string;
    steps: DocumentationStep[];
}

interface DocumentationData {
    [key: string]: DocumentationArticle;
}

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    caption: string;
}

const documentationData: DocumentationData = {
    'Set a Budget': {
        title: 'How to set a budget',
        lastUpdated: '20 December 2025',
        description:
            'Looking to set a budget in the FinOps application? Start by accessing the budgeting section, then input your projected expenses and revenue. Make sure to categorize your costs for better tracking.',
        steps: [
            {
                image: '/images/budget-step1.png',
                caption:
                    'Access the budget section via the sidebar for efficient navigation.',
            },
            {
                image: '/images/budget-step2.png',
                caption:
                    'Click on the Create New Budget button on the top-right section of the Budget page',
            },
            {
                image: '/images/budget-step3.png',
                caption:
                    'Fill the Create Budget form and click on the Create Budget button to set the budget',
            },
        ],
    },
    'Create an account': {
        title: 'How to create an account',
        lastUpdated: '18 December 2025',
        description:
            'Creating an account is simple. Navigate to the sign-up page and enter your email address and desired password. Verify your email through the confirmation link sent to your inbox.',
        steps: [
            {
                image: '/images/signup-step1.png',
                caption: 'Navigate to the sign-up page from the homepage.',
            },
            {
                image: '/images/signup-step2.png',
                caption: 'Fill in your details and submit the registration form.',
            },
            {
                image: '/images/signup-step3.png',
                caption: 'Check your email and verify your account.',
            },
        ],
    },
    'Track expenses': {
        title: 'How to track expenses',
        lastUpdated: '15 December 2025',
        description:
            'Tracking expenses is crucial for financial management. Access the expenses dashboard where you can view all your spending in real-time.',
        steps: [
            {
                image: '/images/expenses-step1.png',
                caption: 'Access the expenses dashboard from the main menu.',
            },
            {
                image: '/images/expenses-step2.png',
                caption: 'View and filter your expenses by category and date.',
            },
        ],
    },
    'Adding a tenant account': {
        title: 'How to add a tenant account',
        lastUpdated: '12 December 2025',
        description:
            'To add a tenant account, navigate to the account management section in your settings. Click on "Add Tenant" and fill in the required information.',
        steps: [
            {
                image: '/images/tenant-step1.png',
                caption: 'Navigate to account management in settings.',
            },
            {
                image: '/images/tenant-step2.png',
                caption: 'Click "Add Tenant" and fill in the required details.',
            },
            {
                image: '/images/tenant-step3.png',
                caption: 'Review and confirm the tenant account settings.',
            },
        ],
    },
    'How to reset password': {
        title: 'How to reset your password',
        lastUpdated: '10 December 2025',
        description:
            'Forgot your password? No problem. Click on the "Forgot Password" link on the login page. Enter your registered email address and you will receive a password reset link.',
        steps: [
            {
                image: '/images/password-step1.png',
                caption: 'Click "Forgot Password" on the login page.',
            },
            {
                image: '/images/password-step2.png',
                caption: 'Enter your email and request a reset link.',
            },
            {
                image: '/images/password-step3.png',
                caption: 'Follow the link in your email to create a new password.',
            },
        ],
    },
    'Adding a sub-admin': {
        title: 'How to add a sub-admin',
        lastUpdated: '8 December 2025',
        description:
            'Sub-admins help you manage your account more efficiently. Go to the team management section and click "Add Sub-Admin".',
        steps: [
            {
                image: '/images/subadmin-step1.png',
                caption: 'Navigate to team management section.',
            },
            {
                image: '/images/subadmin-step2.png',
                caption: 'Click "Add Sub-Admin" and enter their details.',
            },
            {
                image: '/images/subadmin-step3.png',
                caption: 'Assign permissions and confirm the sub-admin role.',
            },
        ],
    },
};

// Skeleton Loader Component
const ImageSkeleton = () => (
    <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
        <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
    </div>
);

// Image with Caption Component
const ImageWithSkeleton = ({ src, alt, caption }: ImageWithSkeletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-red-500">
                {!isLoaded && <ImageSkeleton />}
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full aspect-video object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                        }`}
                />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{caption}</p>
        </div>
    );
};

// Main Documentation Component
export default function DocumentationPage() {
    const defaultSelected = "Set a Budget"
    const menuItems = Object.keys(documentationData);
    const [activeItem, setActiveItem] = useState(
        defaultSelected || menuItems[0]
    );
    const [_, setIsAnimating] = useState(false);


    const handleItemClick = (item: string): void => {
        if (item !== activeItem) {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveItem(item);
                setIsAnimating(false);
            }, 200);
        }
    };

    const currentArticle = documentationData[activeItem];

    return (
        <>
            <div className='relative'>
                <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
            </div>

            <CustomSection className="min-h-screen grid grid-cols-1 lg:grid-cols-13 gap-8 lg:gap-4 py-4">

                {/* Sidebar Navigation */}
                <nav className="lg:col-span-4 space-y-1 h-fit lg:sticky lg:top-18 p-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className={`w-full text-left px-4 py-3 transition-all duration-200 text-sm ${activeItem === item
                                ? 'text-red-600 font-semibold bg-red-50 border-l-4 border-red-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {item}
                        </button>
                    ))}

                    <div className='lg:block hidden w-full'>
                        <DownloadButton
                            fileUrl="https://storage.googleapis.com/qocent-user-guide/qocent-user-guide/Qocent%20User%20Guide-V1.0.pdf?response-content-disposition=attachment"
                            fileName="qocent-user-guide.pdf"
                        />
                    </div>

                </nav>

                {/* Main Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeItem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:col-span-9 space-y-8"
                    >
                        {/* Header */}
                        <div className="border-b border-gray-200 pb-6">

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {currentArticle.title}
                            </h1>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {currentArticle.description}
                            </p>
                        </div>

                        {/* Steps with Images */}
                        <div className="space-y-12">
                            {currentArticle.steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                >
                                    <ImageWithSkeleton
                                        src={step.image}
                                        alt={`${currentArticle.title} - Step ${index + 1}`}
                                        caption={step.caption}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </CustomSection>
        </>

    );
};

