export enum ActionTypes {
    GetToken = "GET_MY_ACCESS_TOKEN",
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
    Login = "Login",
    Me = "ME_GET_USERDATA",
    MePosts = "ME_GET_POSTS",
    AddPost = "ADD_NEW_POST",
    DeletePost = "DELETE_MY_POST",
    Check = "CHECK_FOR_CONNECTION",
    Logout = "LOGOUT_ME",
    NewsLine = "GET_NEWSLINE",
    MyNewsLine = "GET_MY_OWN_NEWSLINE",
    User = "GET_USER_DATA",
    Subscribe = "MAKE_SUBSCRIBE",
    Unfollow = "MAKE_UNFOLLOW",
    RequestList = "GET_REQUEST_LIST",
    AcceptOrDeclineRequest = "ACCEPT_OR_DECLINE_REQUEST",
    SetAvatar = "SET_NEW_AVATAR",
    SetParam = "SET_NEW_PARAMETER",
    Following = "FOLLOWING_LIST",
    ClearFollowing = "CLEAR_FOLLOWING_LIST",
    U2UMessages = "GET_MY_WITH_COMPANION_MESSAGES",
    U2UMessagesPage = "GET_MY_WITH_COMPANION_MESSAGES_PAGINATION",
    AddFakeMessage = 'ADD_NEW_MESSAGE',
    ClearMessages = 'CLEAR_ALL_MESSAGES',
    SetNewStatus = "SET_NEW_MESSAGE_STATUS",
    SetAllReadMessages = "SET_ABSOLUTE_ALL_MESSAGES_AS_READ",
    LikePost = "LIKE_POST_OR_UNLIKE_POST",
    LikeSinglePost = "LIKE_POST_OR_UNLIKE_SINGLE_POST",
    LikeMyPosts = "LIKE_MY_POSTS",
    LikeUserPosts = "LIKE_USER_POSTS",
    GetPost = "GET_POST_WITH_LIKES_AND_SUBSCRIPTION",
    SearchUser = "SEARCH_USER_BY_NAME",
    ClearComments = "CLEAR_ALL_COMMENTS",
    //Comments
    GetComments = "GET_COMMENTS_BY_POST_HASH",
    CreateComment = "CREATE_COMMENT",
    UpdateComment = "UPDATE_COMMENT",
    RemoveComment = "REMOVE_COMMENT",
    //Messages
    RemoveMessage = "REMOVE_ONE_MESSAGE",
    RemoveLotMessages = "REMOVE_SOME_MESSAGES",
}


export interface Action {
    type: string;
    payload?: any;
    statusCode?: number;
}


export interface ClassicPayload {
    statusCode: number;
    statusMessage: string;
    data?: any;
    pages?: number;
}


export interface initialState {
    statusCode: number;
    statusMessage: string;
    data: any;
}