import type { FormikProps } from "formik";

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
  className?: string;
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
