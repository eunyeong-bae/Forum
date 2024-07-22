import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import styles from '../page.module.css';
import Link from "next/link";

interface Node {
    _id: ObjectId;
    title?: string;
    content?: string[];
}

export default async function List(){
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').find().toArray();
    
    const renderNode = (node: Node) => {
        return (
            <Link href={`/detail/${node._id.toString()}`} prefetch={false}>
                <div className={styles['list-item']} key={node._id.toString()}>
                    <h4>{node.title}</h4>
                    { node.content && (
                        <ol>
                            {node.content.map((item, idx) => (
                                <li key={node._id.toString()+idx}>{item}</li>
                            ))}
                        </ol>
                    )}
                </div>
            </Link>
        )
    };

    return (
        <div className="list-bg">
            {result.map(node => renderNode(node))}
        </div>
    )
};