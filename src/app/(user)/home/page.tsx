import { AlarmCard } from '@/components/alarmCard';
import { CountCard } from '@/components/countCard';
import { HomeMenu } from '@/components/homeMenu';
import { ProgressWidget } from '@/components/progressWidget';
import { StreakWidget } from '@/components/streakWidget';
import { TimerCard } from '@/components/timerCard';

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap gap-x-12">
        <ProgressWidget />
        <StreakWidget />
      </div>
      <HomeMenu />
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        <AlarmCard />
        <TimerCard />
        <CountCard />
      </div>
    </main>
  );
}
