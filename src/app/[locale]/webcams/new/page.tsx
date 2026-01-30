import { createWebcam } from "../action";
import WebcamForm from "../webcam-form";

export default async function NewWebcamPage() {
  return (
    <main className="flex flex-col items-center p-8">
      <WebcamForm action={createWebcam} />
    </main>
  );
}
