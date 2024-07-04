import { useEffect, useState } from "react";
import {db} from "fbase"
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [nTweet, setNTweet] = useState("");
    const [nTweets, setNTweets ] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(db, "nTweets"), {
            text: nTweet,
            createdAt: Date.now()
        })
        setNTweet("");
    };

    const getNTweets = async () => {
        const querySnapshot = await getDocs(collection(db, "nTweets"));
            querySnapshot.forEach((doc) => {
                const nTweetObject = {...doc.data(), id: doc.id};
                setNTweets((prev)=>[nTweetObject, ...prev])
            }); 
    };

    console.log(nTweets);

    useEffect(()=> {
        getNTweets();
    }, []);

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