import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const livingIndexId = z.string().regex(/^G\.\d{3,}$/);
const phaseId = z.string().regex(/^PH\.\d{2,}$/);
const month = z.string().regex(/^\d{4}-\d{2}$/);

const publication = z.enum(['draft', 'review', 'published']);
const visibility = z.enum(['private', 'unlisted', 'public']);
const curation = z.enum(['normal', 'featured']);
const language = z.enum(['en', 'zh', 'mixed']);

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      subtitle: z.string().optional(),
      summary: z.string().min(1),
      publication,
      visibility,
      curation,
      indexId: livingIndexId.optional(),
      language,
      status: z.enum(['completed', 'ongoing', 'archived']),
      phaseIds: z.array(phaseId).default([]),
      disciplines: z.array(z.string().min(1)).default([]),
      publishedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      featuredOrder: z.number().int().positive().optional(),
      source: z
        .object({
          github: z.url().optional(),
          originalReport: z.string().optional(),
        })
        .default({}),
      visual: z
        .object({
          accent: z.string().optional(),
          mode: z.enum(['light', 'dark', 'adaptive']).default('adaptive'),
          motionLevel: z.enum(['quiet', 'featured', 'signature']).default('quiet'),
        })
        .prefault({}),
    })
    .superRefine((value, ctx) => {
      if (value.publication === 'published' && !value.indexId) {
        ctx.addIssue({
          code: 'custom',
          path: ['indexId'],
          message: 'Published work must have a permanent Living Index ID.',
        });
      }

      if (value.curation === 'featured' && value.visibility !== 'public') {
        ctx.addIssue({
          code: 'custom',
          path: ['curation'],
          message: 'Featured work must be public.',
        });
      }
    }),
});

const phases = defineCollection({
  loader: glob({ base: './src/content/phases', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    phaseId,
    title: z.string().min(1),
    summary: z.string().min(1),
    start: month,
    end: month.nullable().optional(),
    status: z.enum(['active', 'closed']),
    location: z.string().optional(),
  }),
});

export const collections = { work, phases };
