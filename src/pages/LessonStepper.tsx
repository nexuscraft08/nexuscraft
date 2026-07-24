import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface LessonStepperProps {
  lessonId: string;
  lessonTitle: string;
  lessonDescription: string;
  trackTitle: string;
  trackColor: string;
  videoUrl: string;
  resourcePdfUrl?: string | null;
  quizQuestions?: any;
  learningObjectives?: string[];
  onComplete: (score: number, passed: boolean) => void;
  onClose: () => void;
  onVideoCompleted: () => void;
  onFinishLesson: () => void;
}

export function LessonStepper({
  lessonTitle,
  lessonDescription,
  videoUrl,
  resourcePdfUrl,
  onComplete,
  onClose,
  onVideoCompleted,
  onFinishLesson,
}: LessonStepperProps) {

  const [completed, setCompleted] = useState(false);

  const completeVideo = () => {
    setCompleted(true);
    onVideoCompleted();
  };


  const finish = () => {
    onComplete(100, true);
    onFinishLesson();
  };


  return (
    <Card>

      <CardHeader className="flex flex-row justify-between">
        <CardTitle>
          {lessonTitle}
        </CardTitle>

        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-4 w-4"/>
        </Button>

      </CardHeader>


      <CardContent className="space-y-5">

        <p className="text-muted-foreground">
          {lessonDescription}
        </p>


        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={videoUrl.replace(
              "watch?v=",
              "embed/"
            )}
            title={lessonTitle}
            allowFullScreen
          />
        </div>


        {resourcePdfUrl && (
          <a
            href={resourcePdfUrl}
            target="_blank"
            className="text-primary underline"
          >
            Download Resource PDF
          </a>
        )}


        {!completed ? (

          <Button onClick={completeVideo}>
            Mark Video Complete
          </Button>

        ) : (

          <Button
            onClick={finish}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4"/>
            Finish Lesson
          </Button>

        )}

      </CardContent>

    </Card>
  );
}