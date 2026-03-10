import { forwardRef } from 'react';

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
    type?: 'text' | 'email' | 'tel' | 'textarea';
    rows?: number;
    disabled?: boolean;
    required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
    ({ label, name, value, onChange, placeholder, error, type = 'text', rows = 4, disabled, required }, ref) => {
        const baseClassName = `w-full pl-2 px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 transition-all ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500 focus:border-transparent'
            }`;

        return (
            <div>
                <label htmlFor={name} className="block text-sm text-gray-600 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {type === 'textarea' ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        className={`${baseClassName} resize-none`}
                    />
                ) : (
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={baseClassName}
                    />
                )}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export default FormInput;
