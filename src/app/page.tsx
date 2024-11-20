import { GetRaces } from "@/services/AngoraDbService";

const races = await GetRaces();

export default function Home() {
  return (
    <div className="">
      <h1>HEJ OG VELKOMMEN TIL DB WABBIT</h1>
      <ul>
        {races.map((race: string) => (
          <li key={race}>
            {race}
          </li>
        ))}
      </ul>
    </div>
  );
}