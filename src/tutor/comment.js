function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img src={props.author.avatarUrl}
             alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div class="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img src={props.user.avatar} alt={props.user.name}/>
  )
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user}></Avatar>
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}
