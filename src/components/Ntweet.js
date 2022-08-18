const Nweet = ({ nweet, isOwner }) => {
  return (
    <div>
      <h4>{nweet.text}</h4>
      {isOwner && (
        <>
          <button>Delete nweet</button>
          <button>Edit nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
