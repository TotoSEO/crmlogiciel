/**
 * Content collections — crm-logiciel.fr
 *
 * `pages` : les pages éditoriales du lancement (Comprendre / Choisir / Utiliser
 * + méthodologie + accueil). Le nom de fichier Markdown = le slug de la page.
 *
 * `avis`, `comparatifs`, `secteurs` : réservées pour la phase de contenu
 * ultérieure. Déclarées dès maintenant (structure plate prête), laissées vides.
 *
 * La durée de lecture n'est PAS dans le frontmatter : elle est calculée au build
 * à partir du nombre de mots (voir src/lib/reading-time.ts).
 */

import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';
import { DEFAULT_AUTHOR } from './config/site';

const clusterEnum = z.enum(['comprendre', 'choisir', 'utiliser', 'transverse']);
const typeEnum = z.enum(['pilier', 'satellite', 'methodologie', 'accueil']);
const schemaTypeEnum = z.enum(['Article', 'FAQPage', 'WebSite', 'WebPage']);

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    /** <title> SEO (cible 50-62 caractères), distinct du H1. */
    title: z.string(),
    /** Meta description (cible 130-150 caractères). */
    metaDescription: z.string(),
    /** Titre H1, distinct du <title>. */
    h1: z.string(),
    /** Extrait affiché dans le hero (1-2 phrases). */
    excerpt: z.string(),
    cluster: clusterEnum,
    type: typeEnum,
    author: z.string().default(DEFAULT_AUTHOR.name),
    datePublished: z.coerce.date(),
    /** Défaut : identique à la date de publication si absente. */
    dateModified: z.coerce.date().optional(),
    /** Image à la une (hero droite + OpenGraph). */
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    schemaType: schemaTypeEnum.default('Article'),
    /** Encart « En bref » : 3 à 5 puces. */
    enBref: z.array(z.string()).min(3).max(5).optional(),
    /** FAQ en accordéon (génère aussi le JSON-LD FAQPage). */
    faq: z.array(faqItem).optional(),
    /** Exclure de l'indexation (pages techniques / brouillons). */
    draft: z.boolean().default(false),
  }),
});

/* Collections différées — schéma minimal, aucune entrée au lancement. */
const deferredSchema = z.object({
  title: z.string(),
  metaDescription: z.string().optional(),
  h1: z.string().optional(),
  datePublished: z.coerce.date().optional(),
  dateModified: z.coerce.date().optional(),
  draft: z.boolean().default(false),
});

const avis = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/avis' }),
  schema: deferredSchema,
});

const comparatifs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparatifs' }),
  schema: deferredSchema,
});

const secteurs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/secteurs' }),
  schema: deferredSchema,
});

export const collections = { pages, avis, comparatifs, secteurs };
