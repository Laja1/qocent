import type { FormikProps } from "formik";
import type { ReactNode } from "react";

export type textfieldProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  disabled?: boolean;
  hasError?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>;
  error?: string;
  className?: string
  helperLabel?:string
  suffixIcon?: React.ReactNode;
  type?: string;
  labelIcon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type checkboxProps = {
  isChecked: boolean;
};

export interface SelectfieldOptions {
  label: string;
  value: string;
}

export type SelectProps = {
  name: string;
  placeholder?: string;
  label?: string;
  register?: string;
  labelClassname?:string
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: any;
  options: SelectfieldOptions[];
  hasError?: string;
  error?: string;
  value?: string;
  className?: string;
};

export interface Category {
  category: string;
}

export interface Requirement {
  requirement: string;
}




export interface ServiceConfig {
  triggerText: string;
  description: string;
  triggerIcon: ReactNode;
  borderColor: string;
  content:string
  }

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
}

export interface ReusableModalProps {
  triggerText: string;
  triggerIcon?: ReactNode;
  content: ReactNode;
  description: string;
  footer?: ReactNode;
  borderColor: string;
  triggerClassName?: string;
}

export interface GridItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  borderColor: string;
  onClick?: () => void;
}