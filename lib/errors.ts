import { ApiError } from "@/types/api";

export class ApiErrorHandler extends Error implements ApiError {
    code: string;
    status: number;
    details?: Record<string, any>;
  
    constructor(message: string, code: string, status: number, details?: Record<string, any>) {
      super(message);
      this.name = 'ApiError';
      this.code = code;
      this.status = status;
      this.details = details;
    }
  
    static badRequest(message: string, details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'BAD_REQUEST', 400, details);
    }
  
    static unauthorized(message: string = 'Unauthorized', details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'UNAUTHORIZED', 401, details);
    }
  
    static forbidden(message: string = 'Forbidden', details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'FORBIDDEN', 403, details);
    }
  
    static notFound(message: string = 'Resource not found', details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'NOT_FOUND', 404, details);
    }
  
    static conflict(message: string, details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'CONFLICT', 409, details);
    }
  
    static internal(message: string = 'Internal server error', details?: Record<string, any>) {
      return new ApiErrorHandler(message, 'INTERNAL_SERVER_ERROR', 500, details);
    }
  }