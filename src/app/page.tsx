import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  return (
    <>
      <header>
        <nav className="p-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Трекер Привычек
          </h1>
        </nav>
      </header>
      <main className="flex flex-wrap-reverse justify-between p-5">
        <article className="flex flex-col items-start gap-6 max-w-2xl">
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Создай привычку, следи за прогрессом, достигай цели!
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            “Трекер Привычек” - это ваш личный помощник в формировании полезных
            привычек и отслеживании вашего ежедневного прогресса.
          </p>
          <Button asChild className="flex-none">
            <Link href={'/home'}>Начать</Link>
          </Button>
        </article>
        <Image src={'/img/habits.png'} width={453} height={434} alt=""></Image>
      </main>
    </>
  );
}
