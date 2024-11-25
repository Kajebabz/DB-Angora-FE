import { GetRabbitProfile } from "@/services/AngoraDbService";
import { Rabbit_ChildPreviewDTO } from "@/types/backendTypes";
import { cookies } from "next/headers";

export default async function page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const rabbitProfile = await GetRabbitProfile(String(accessToken?.value));

    return (
        <div>
            <h1>Parent Rabbit</h1>
            <div>
                <p><strong>Nickname:</strong> {rabbitProfile.nickName}</p>
                <p><strong>Ear Comb ID:</strong> {rabbitProfile.earCombId}</p>
                <p><strong>Race:</strong> {rabbitProfile.race}</p>
                <p><strong>Color:</strong> {rabbitProfile.color}</p>
                <p><strong>Date of Birth:</strong> {new Date(rabbitProfile.dateOfBirth).toLocaleDateString()}</p>
                <br></br>
                {/* Add more fields as needed */}
            </div>

            <h2>Children</h2>
            <ul>
                {rabbitProfile.children?.$values?.map((child: Rabbit_ChildPreviewDTO) => (
                    <li key={child.earCombId}>
                        <p><strong>Nickname:</strong> {child.nickName}</p>
                        <p><strong>Ear Comb ID:</strong> {child.earCombId}</p>
                        <p><strong>Gender:</strong> {child.gender}</p>
                        <p><strong>Color:</strong> {child.color}</p>
                        <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                        <br></br>
                    </li>
                ))}
            </ul>
        </div>
    );
}
