import { IconType } from 'react-icons';
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiAmazonaws,
  SiFlask,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiVite,
  SiSupabase,
  SiRedis,
  SiStripe,
  SiShopify,
  SiOpenai,
  SiSentry,
  SiPaypal,
  SiAlpinedotjs,
  SiMongodb,
  SiDocker,
  SiGraphql,
  SiFirebase,
  SiVercel,
} from 'react-icons/si';

/**
 * Maps the technology names written in case-study markdown to icons.
 * Keys are lowercased and stripped of separators so "Next.js", "next js" and
 * "nextjs" all resolve to the same entry.
 */
const ICONS: Record<string, IconType> = {
  laravel: SiLaravel,
  react: SiReact,
  reactnative: SiReact,
  reactcontext: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  aws: SiAmazonaws,
  awss3: SiAmazonaws,
  awslightsail: SiAmazonaws,
  lightsail: SiAmazonaws,
  flask: SiFlask,
  python: SiPython,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  vite: SiVite,
  supabase: SiSupabase,
  redis: SiRedis,
  stripe: SiStripe,
  shopifysdk: SiShopify,
  shopify: SiShopify,
  openaigpt4: SiOpenai,
  openai: SiOpenai,
  dalle: SiOpenai,
  sentry: SiSentry,
  paypalapi: SiPaypal,
  paypal: SiPaypal,
  alpinejs: SiAlpinedotjs,
  docker: SiDocker,
  graphql: SiGraphql,
  firebase: SiFirebase,
  vercel: SiVercel,
  neonpostgres: SiPostgresql,
  upstashredis: SiRedis,
  supabasestorage: SiSupabase,
};

const normalize = (tech: string) =>
  tech.toLowerCase().replace(/[^a-z0-9]/g, '');

export function getTechIcon(tech: string): IconType | undefined {
  return ICONS[normalize(tech)];
}

export interface TechWithIcon {
  name: string;
  Icon: IconType;
}

/** Returns only the technologies that have a matching icon, preserving order. */
export function getTechIcons(technologies: string[]): TechWithIcon[] {
  return technologies.reduce<TechWithIcon[]>((acc, name) => {
    const Icon = getTechIcon(name);
    if (Icon && !acc.some((entry) => entry.Icon === Icon)) {
      acc.push({ name, Icon });
    }
    return acc;
  }, []);
}
