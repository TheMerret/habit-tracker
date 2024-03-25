import { FunctionComponent } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, Crosshair2Icon, CubeIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { habitsActions } from '@/redux/features/habits';
import { useRouter } from 'next/navigation';
import { selectHabitById } from '@/redux/features/habits/selectors';
import { habitFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface BaseCardProps {
  habitTitle: string;
  emoji: string;
  period: 'daily' | 'weekly' | 'monthly';
  category: string;
  target?: number;
}

interface TemplateCardProps
  extends BaseCardProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const TemplateCard: FunctionComponent<TemplateCardProps> = function ({
  habitTitle,
  emoji,
  period,
  category,
  target,
  ...props
}) {
  const periodText =
    period === 'daily'
      ? 'Ежедневно'
      : period == 'monthly'
        ? 'Ежемесячно'
        : 'Еженедельно';
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Card
      {...props}
      className={cn(
        'max-w-72 hover:bg-zinc-50 cursor-pointer transition-transform transform hover:scale-105',
        props.className
      )}
      onClick={() => {
        dispatch(
          habitsActions.addHabit({
            emoji,
            title: habitTitle,
            period,
            category,
            targetValue: target,
            addDate: new Date(new Date().toDateString()).toISOString(),
            active: true,
            notificationEnabled: false,
          })
        );
        router.push('/habits');
      }}
    >
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">{emoji}</div>
        </div>
      </CardHeader>
      <CardContent>
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {habitTitle}
        </span>
      </CardContent>
      <CardFooter>
        <div className="flex items-center flex-wrap gap-2">
          <Badge>
            <CubeIcon />
            <span>{category}</span>
          </Badge>
          <Badge>
            <ClockIcon />
            <span>{periodText}</span>
          </Badge>
          {target ? (
            <Badge>
              <Crosshair2Icon />
              <span>Цель - {target}</span>
            </Badge>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};
