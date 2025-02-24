import { z } from "zod";

export const textFieldValidationRules = {
  minLength: 2,
  maxLength: 30,
  required: true,
};

export const optionalTextFieldValidationRules = {
  minLength: 2,
  maxLength: 30,
};

export const numberFieldValidationRules = {
  pattern: /^\d+$/,
  required: true,
};

export const emailSchema = z.string().email({ message: "Incorrect email" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Required and must be at least 8 characters" })
  .max(16, { message: "Must be less than 16 characters" });

export const userNameSchema = z
  .string()
  .min(2, { message: "Required and must be at least 2 characters" })
  .max(15, { message: "Must be less than 15 characters" });

export const textFieldSchema = z
  .string()
  .min(2, { message: "Required and must be at least 2 characters" })
  .max(30, { message: "Must be less than 30 characters" });

export const optionalTextFieldSchema = z
  .string()
  .min(2, { message: "Required and must be at least 2 characters" })
  .max(30, { message: "Must be less than 30 characters" })
  .optional();
