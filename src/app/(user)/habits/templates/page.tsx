import { TemplateList } from '@/components/templateList';

export default function Templates() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap justify-between"></div>
      <TemplateList />
    </div>
  );
}
