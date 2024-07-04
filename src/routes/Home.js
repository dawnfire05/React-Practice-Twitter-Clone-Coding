import { useEffect, useState } from "react";
import {db} from "fbase"
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Home = ({userObj}) => {
    const [nTweet, setNTweet] = useState("");
    const [nTweets, setNTweets ] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(db, "nTweets"), {
            text: nTweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setNTweet("");
    };


    useEffect(()=> {
        const q = collection(db, "nTweets");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNTweets(docs)
        });
        return() => unsubscribe();
    });

    const onChange = (event) =>{
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNTweet(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value = {nTweet}
                    onChange={onChange}
                    type = "text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nTweets.map((nTweet)=>(
                    <div key ={nTweet.id}>
                        <h4>{nTweet.text}</h4>
                    </div>
                ))}
            </div>
        </>

    )
};

export default Home;