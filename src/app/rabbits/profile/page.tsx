// src/app/rabbits/profile/page.tsx
import { GetRabbitProfile } from "@/services/AngoraDbService";
import { cookies } from "next/headers";
import RabbitProfile from "./rabbitProfile";

export default async function RabbitProfilePage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const rabbitProfile = await GetRabbitProfile(String(accessToken?.value));

    return <RabbitProfile rabbitProfile={rabbitProfile} />;
}