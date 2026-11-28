import { notFound } from 'next/navigation';
import CitrusPage from '@/components/CitrusPage';
import { citrusPages } from '@/lib/seoContent';
import { pageMetadata } from '@/lib/seo.mjs';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(citrusPages).map(citrus => ({ citrus })); }
export async function generateMetadata({ params }) {
  const { citrus } = await params;
  const content = citrusPages[citrus];
  if (!content) notFound();
  const metadata = pageMetadata({ title: content.title, description: content.description, path: `/${citrus}` });
  return content.legacy ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}
export default async function Page({ params }) {
  const { citrus } = await params;
  const content = citrusPages[citrus];
  if (!content) notFound();
  return <CitrusPage slug={citrus} content={content}/>;
}
