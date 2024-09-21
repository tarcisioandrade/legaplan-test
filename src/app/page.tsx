import { Logo } from "@/components/icons";
import TasksSections from "@/components/tasks-section";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <Logo />
        <strong>Bem-vindo de volta, Marcus</strong>
        <p>
          {new Date().toLocaleDateString("pt-BR", {
            dateStyle: "full",
          })}
        </p>
      </header>
      <TasksSections />
    </main>
  );
}
