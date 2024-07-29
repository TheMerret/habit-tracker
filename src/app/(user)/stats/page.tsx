import { DateStat } from '@/components/dateStat';
import { PeriodsStat } from '@/components/periodsStat';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Statistics() {
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Статистика по периодам</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <PeriodsStat />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Статистика по датам</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 w-max">
          <DateStat />
        </CardContent>
      </Card>
    </div>
  );
}
