const NTweet = ({nTweetObj, isOwner}) => {
    return(
        <div>
            <h4>{nTweetObj.text}</h4>
            {isOwner && (
                <>
                    <button>Delete NTweet</button>
                    <button>Edit NTweet</button>
                </>
            )}

        </div>
    )
}

export default NTweet;