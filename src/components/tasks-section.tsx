"use client";

import Checkbox from "@/components/checkbox";
import CreateTaskDialog from "@/components/create-task-dialog";
import DeleteTaskDialog from "@/components/delete-task-dialog";
import { Trash } from "@/components/icons";
import { useHydrationZustand } from "@/hooks/use-store-hydratation";
import useStore from "@/hooks/useStore";
import { useTaskStore } from "@/store/task.store";
import { ETaskStatus } from "@/types/Task";
import { useMemo, useState } from "react";
import Spinner from "./spinner";

const TasksSections = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const isHydrated = useHydrationZustand(useTaskStore);
  const tasks = useStore(useTaskStore, (state) => state.tasks);
  const actions = useStore(useTaskStore, (state) => state.actions);

  const PENDING_TASKS = useMemo(
    () => tasks.filter((task) => task.status === ETaskStatus.Pending),
    [tasks]
  );
  const COMPLETE_TASKS = useMemo(
    () => tasks.filter((task) => task.status === ETaskStatus.Complete),
    [tasks]
  );

  function createTaskFn() {
    actions.addTask(taskTitle);
    setTaskTitle("");
  }

  function removeSingleTask(id: string) {
    actions.removeTask(id);
  }

  function completeTask(id: string) {
    actions.completeTask(id);
  }

  return (
    <section className="section">
      <div className="section-content">
        <p>Suas tarefas de hoje</p>
        {!isHydrated ? (
          <Spinner />
        ) : PENDING_TASKS.length ? (
          <ul>
            {PENDING_TASKS.map((task) => (
              <li key={task.id}>
                <div>
                  <Checkbox onChange={() => completeTask(task.id)} />
                  <span>{task.title}</span>
                </div>
                <DeleteTaskDialog
                  handleRemove={() => removeSingleTask(task.id)}
                >
                  <button>
                    <Trash />
                  </button>
                </DeleteTaskDialog>
              </li>
            ))}
          </ul>
        ) : (
          <p className="section-empty">Nenhuma tarefa pendente.</p>
        )}
        <p>Tarefas finalizadas</p>
        {!isHydrated ? (
          <Spinner />
        ) : COMPLETE_TASKS.length ? (
          <>
            <ul>
              {COMPLETE_TASKS.map((task) => (
                <li key={task.id} className="task-complete">
                  <div>
                    <Checkbox
                      disabled
                      defaultChecked={task.status === ETaskStatus.Complete}
                    />
                    <span>{task.title}</span>
                  </div>
                  <DeleteTaskDialog
                    handleRemove={() => removeSingleTask(task.id)}
                  >
                    <button>
                      <Trash />
                    </button>
                  </DeleteTaskDialog>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="section-empty">Nenhuma tarefa finalizada.</p>
        )}

        <CreateTaskDialog
          setTitle={setTaskTitle}
          value={taskTitle}
          handleCreate={createTaskFn}
        >
          <button className="button-primary">Adicionar nova tarefa</button>
        </CreateTaskDialog>
      </div>
    </section>
  );
};

export default TasksSections;
