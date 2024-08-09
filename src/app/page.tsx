import { connectDB } from "../util/database";
// TypeScript 파일을 임포트할 때는 확장자를 생략하는 것이 관례

export default async function Home() {
  let client = await connectDB;
  const db = client.db('forum');

  let result = await db.collection('post').find().toArray();

  return (
    <main>
      {result[0].title}
      {result[0].content}
    </main>
  );
}
