import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export const instant = false;

export default function Home() {
  permanentRedirect(`/${siteConfig.identity.defaultLocale}`);
}
