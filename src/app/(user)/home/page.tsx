import { HomeList } from '@/components/homeList';
import { NpcWidget } from '@/components/npcWidget';
import { ProgressWidget } from '@/components/progressWidget';
import { StreakWidget } from '@/components/streakWidget';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-wrap gap-x-12 justify-stretch">
        <ProgressWidget />
        <StreakWidget />
        <NpcWidget />
      </div>
      <HomeList />
    </div>
  );
}
