import { requireAdmin } from "@/lib/admin-auth";
import { getCMSContent } from "@/lib/cms";
import CmsEditor from "./_components/CmsEditor";

export default async function CMSPage() {
  await requireAdmin();
  const content = await getCMSContent();
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-1">Content Management</h1>
      <p className="text-slate-400 text-sm mb-8">
        Edits save instantly to the database and revalidate the public site.
      </p>
      <CmsEditor initialContent={content} />
    </div>
  );
}
