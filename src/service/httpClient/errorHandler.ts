/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/errorHandler.ts
export class ErrorHandler {
  static extractMessage(error: any): string {
    // Handle null/undefined
    if (!error) {
      return "An unexpected error occurred";
    }

    // RTK Query error format: error.data.detail (FastAPI format)
    if (error?.data?.detail) {
      return this.parseMessage(error.data.detail);
    }

    // RTK Query error format: error.data.message
    if (error?.data?.message) {
      return this.parseMessage(error.data.message);
    }

    // RTK Query error format: error.data.original.responseMessage
    if (error?.data?.original?.responseMessage) {
      return this.parseMessage(error.data.original.responseMessage);
    }

    // Direct detail property
    if (error?.detail) {
      return this.parseMessage(error.detail);
    }

    // Direct message property
    if (error?.message) {
      return this.parseMessage(error.message);
    }

    // Direct responseMessage property
    if (error?.responseMessage) {
      return this.parseMessage(error.responseMessage);
    }

    // Error object with error property
    if (error?.error) { 
      return this.parseMessage(error.error);
    }

    // Validation errors format
    if (error?.errors) {
      return this.parseMessage(error.errors);
    }

    // If error is a string
    if (typeof error === 'string') {
      return error;
    }

    // Fallback
    return "An unexpected error occurred";
  }

  private static parseMessage(message: any): string {
    // Handle string messages
    if (typeof message === 'string') {
      return message;
    }

    // Handle array of messages (including FastAPI validation errors)
    if (Array.isArray(message)) {
      // FastAPI validation error format
      if (message.length > 0 && message[0]?.msg) {
        return message.map(err => err.msg).join(', ');
      }
      return message.join(', ');
    }

    // Handle object messages (validation errors, etc.)
    if (typeof message === 'object' && message !== null) {
      const entries = Object.entries(message);
      return entries
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(', ')}`;
          }
          return `${key}: ${value}`;
        })
        .join(', ');
    }

    // If we can't parse it, convert to string
    return String(message);
  }
}

// Hook version if you prefer
export const useErrorHandler = () => {
  const extractMessage = (error: any): string => {
    return ErrorHandler.extractMessage(error);
  };

  return { extractMessage };
};