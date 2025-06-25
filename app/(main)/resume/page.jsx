import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const ResumePage = async () => {
  const resume = await getResume();

  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
};

export default ResumePage;
