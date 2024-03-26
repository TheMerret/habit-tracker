import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EditCard } from '@/components/editCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TrashCard } from '@/components/trashCard';
import { HabitsList } from '@/components/habitsList';

export default function Habits() {
  return (
    <div className="flex flex-col gap-y-3">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Отслеживаемые</TabsTrigger>
          <TabsTrigger value="trash">Корзина</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Добавить</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/habits/templates" legacyBehavior passHref>
                    Выбрать шаблон
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/habits/new" legacyBehavior passHref>
                    Создать новую привычку
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TabsContent value="active">
          <HabitsList
            view="active"
            className="flex flex-wrap gap-x-16 gap-y-6"
          />
        </TabsContent>
        <TabsContent value="trash">
          <HabitsList
            view="trash"
            className="flex flex-wrap gap-x-16 gap-y-6"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
