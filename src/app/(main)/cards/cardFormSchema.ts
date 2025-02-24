import {
  optionalTextFieldSchema,
  textFieldSchema,
} from "@/constants/textFieldValidationRules";
import { Gender } from "@/enums/gender.enum";
import { z } from "zod";

export const cardFormSchema = z.object({
  name: textFieldSchema,
  type: optionalTextFieldSchema,
  gender: z.nativeEnum(Gender),
  isActive: z.boolean(),
  location: z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
  }),
  episodes: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
      }),
    )
    .nonempty(),
  image: z
    .object({
      url: z.string(),
      image: z.instanceof(Blob).optional(),
    })
    .or(z.null()),
});

export type ICardFrom = z.infer<typeof cardFormSchema>;
