import { motion } from 'framer-motion';
import { Check, Loader2, MessagesSquare, Phone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import CustomSection from "../components/custom-section";
import ContactCard from './contact-card';
import FormInput from './form-input';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactUs() {
    return (
        <>
            <div className="relative">
                <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
            </div>

            <CustomSection className="">
                <ContactUsCard />
            </CustomSection>
        </>
    )
}

function ContactUsCard() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitted(false);
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white grid lg:grid-cols-2 gap-12 mb-12 place-items-end shadow-sm w-full p-2 md:p-8 rounded-3xl border border-gray-300"
        >
            {/* Left Column - Info */}
            <div>
                <h2 className="text-4xl p-4 pb-0 md:p-0 md:text-5xl font-bold text-gray-900 mb-8">
                    Get in touch with Us
                </h2>

                {/* Feature List */}
                <div className="space-y-4 mb-8 px-4 md:p-0 ">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <span className="font-semibold text-gray-900">Effortless Assistance:</span>
                            <span className="text-gray-600"> Connect with our team anytime</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <span className="font-semibold text-gray-900">Book a Demo Today:</span>
                            <span className="text-gray-600"> Experience our platform in action</span>
                        </div>
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <ContactCard
                        icon={MessagesSquare}
                        title="Reach Out to Us"
                        description="Need assistance? Drop us a message anytime."
                        linkText="info@qocent.com"
                        linkHref="mailto:info@qocent.com"
                    />
                    <ContactCard
                        icon={Phone}
                        title="Call Us"
                        description="Need help? Give us a call—we're here for you."
                        linkText="+234 903 170 1576"
                        linkHref="tel:+2348105445678"
                    />
                </div>
            </div>

            {/* Right Column - Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 border w-full border-gray-200"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        error={errors.name}
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@gmail.com"
                        error={errors.email}
                    />

                    <FormInput
                        label="Subject of Interest"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        error={errors.subject}
                    />

                    <FormInput
                        label="Message"
                        name="message"
                        type="textarea"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="message goes here..."
                        rows={4}
                        error={errors.message}
                    />

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
                        className={`w-full py-3 rounded-full font-medium transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : isSubmitted ? (
                            <>
                                <Check className="w-5 h-5" />
                                Submitted!
                            </>
                        ) : (
                            'Submit'
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>

    );
}

