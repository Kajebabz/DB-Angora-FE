import { GetUserProfile } from "@/services/AngoraDbService";
import { cookies } from "next/headers";
import UserProfile from "./userProfile";

interface PageProps {
    params: Promise<{ userId: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
    const { userId } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const userProfile = await GetUserProfile(String(accessToken?.value), userId);

    return <UserProfile userProfile={userProfile} />;
}
