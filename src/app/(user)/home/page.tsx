import { NpcWidget } from '@/components/npcWidget';
import { NumberCard } from '@/components/numberCard';
import { ProgressWidget } from '@/components/progressWidget';
import { StateCard } from '@/components/stateCard';
import { StreakWidget } from '@/components/streakWidget';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-wrap gap-x-12 justify-stretch">
        <ProgressWidget />
        <StreakWidget />
        <NpcWidget />
      </div>
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        <NumberCard />
        <StateCard />
      </div>
    </div>
  );
}
