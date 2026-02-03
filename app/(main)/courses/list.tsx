"use client";

import { useEffect, useTransition } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { upsertUserProgress } from "@/actions/user-progress";
import { courses, userProgress } from "@/db/schema";

import { Card } from "./card";

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // ✅ Si solo hay un curso, redirigir automáticamente
  useEffect(() => {
    if (courses.length === 1) {
      const singleCourseId = courses[0].id;

      // Si el curso ya está activo, ir directamente a /learn
      if (singleCourseId === activeCourseId) {
        router.push("/learn");
        return;
      }

      // Si no está activo, seleccionarlo y redirigir
      upsertUserProgress(singleCourseId)
        .then(() => router.push("/learn"))
        .catch(() => toast.error("Something went wrong."));
    }
  }, [courses, activeCourseId, router]);

  // ✅ Si solo hay un curso, no renderizar nada (se redirige automáticamente)
  if (courses.length === 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );

  function onClick(id: number) {
    if (pending) return;

    if (id === activeCourseId) return router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong."));
    });
  }
};