import { HomeMenu } from '@/components/homeMenu';
import { NumberCard } from '@/components/numberCard';
import { ProgressWidget } from '@/components/progressWidget';
import { StateCard } from '@/components/stateCard';
import { StreakWidget } from '@/components/streakWidget';

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap gap-x-12">
        <ProgressWidget />
        <StreakWidget />
      </div>
      <HomeMenu />
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        <NumberCard />
        <StateCard />
      </div>
    </main>
  );
}
