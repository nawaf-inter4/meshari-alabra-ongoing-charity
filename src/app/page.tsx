import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to default language
  redirect("/ar");
}
