import { BoostsWidget } from '@/components/boostsWidget';
import { SkinsWidget } from '@/components/skinsWidget';

export default function Shop() {
  return (
    <div className="flex flex-col gap-2">
      <BoostsWidget />
      <SkinsWidget />
    </div>
  );
}
