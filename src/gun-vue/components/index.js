import "virtual:windi.css";
import "./styles/index.css";
import "./styles/transitions.css";

// ACCOUNT

export { default as AccountProfile } from "./account/Profile.vue";
export { default as AccountAvatar } from "./account/Avatar.vue";
export { default as AccountBadge } from "./account/Badge.vue";
export { default as AccountHome } from "./account/Home.vue";
export { default as AccountStars } from "./account/Stars.vue";
export { default as AccountReactions } from "./account/Reactions.vue";

// LINKs

export { default as AccountMateButton } from "./account/mate/Button.vue";
export { default as AccountMateList } from "./account/mate/List.vue";

// USER

export { default as UserCredentials } from "./user/Credentials.vue";
export { default as UserPassphrase } from "./user/Pass.vue";
export { default as UserAuth } from "./user/Auth.vue";
export { default as UserLogin } from "./user/Login.vue";
export { default as UserHome } from "./user/Home.vue";
export { default as UserIcon } from "./user/Icon.vue";
export { default as UserPanel } from "./user/Panel.vue";
export { default as UserProfile } from "./user/Profile.vue";
export { default as UserGraph } from "./user/Graph.vue";
export { default as UserProfileField } from "./user/profile/Field.vue";

export { default as RoomProfile } from "./room/Profile.vue";

//SPACE

export { default as SpacePlane } from "./space/Plane.vue";
export { default as SpaceGuest } from "./space/Guest.vue";
export { default as SpaceArrow } from "./space/Arrow.vue";

// POSTS

export { default as PostCard } from "./post/Card.vue";
export { default as PostForm } from "./post/Form.vue";
export { default as PostList } from "./post/List.vue";
export { default as PostPage } from "./post/Page.vue";
export { default as PostGraph } from "./post/Graph.vue";


export { default as PostActionStar } from "./post/action/Star.vue";
export { default as PostActionUpdate } from "./post/action/Update.vue";
export { default as PostActionBan } from "./post/action/Ban.vue";

export { default as ReactionTabs } from "./reaction/Tabs.vue";

//CHAT

export { default as ChatTopics } from "./chat/Topics.vue";
export { default as ChatRoom } from "./chat/Room.vue";
export { default as ChatMessage } from "./chat/Message.vue";
export { default as ChatPrivate } from "./chat/private/Index.vue";
export { default as ChatPrivateCount } from "./chat/private/Count.vue";

// DICTIONARY

export { default as DictDefCard } from './dict/def/Card.vue'
export { default as DictDefList } from './dict/def/List.vue'
export { default as DictDefPage } from './dict/def/Page.vue'
export { default as DictWordCard } from './dict/word/Card.vue'
export { default as DictWordList } from './dict/word/List.vue'
export { default as DictWordPage } from './dict/word/Page.vue'
export { default as DictLinkList } from './dict/link/List.vue'
export { default as DictLinkButton } from './dict/link/Button.vue'
export { default as DictPanel } from './dict/Panel.vue'


// FORMS

export { default as FormLink } from "./form/Link.vue";
export { default as FormPicture } from "./form/Picture.vue";
export { default as FormText } from "./form/Text.vue";
export { default as FormYoutube } from "./form/Youtube.vue";

// UTILS

export { default as LogTree } from "./log/Tree.vue";

export { default as QrShow } from "./qr/Show.vue";
export { default as QrLoad } from "./qr/Load.vue";

export { default as EmbedYoutube } from "./embed/Youtube.vue";

export { default as UiModal } from "./ui/Modal.vue";
export { default as UiLayer } from "./ui/Layer.vue";

export { default as UtilPulse } from "./util/Pulse.vue";
export { default as UtilGraph } from "./util/Graph.vue";
export { default as UtilShare } from "./util/Share.vue";
export { default as Utiltools } from "./util/Tools.vue";
export { default as UtilRelay } from "./util/Relay.vue";

export * from "@composables";
export { default as FormIpfs } from "./form/Ipfs.vue";
export { default as EmbedIpfs } from "./embed/Ipfs.vue";
