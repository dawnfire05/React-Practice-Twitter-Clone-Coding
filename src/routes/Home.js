import { useState } from "react";
import {db} from "fbase"
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [nTweet, setNTweet] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(db, "nTweets"), {
            text: nTweet,
            createdAt: Date.now()
        })
        setNTweet("");
    };

    const onChange = (event) =>{
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNTweet(value);
    };

    return (
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
    )
};

export default Home;