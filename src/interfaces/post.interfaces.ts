export interface Post {
  _id: string;
  title: string;
  content?: string;
  image: string;
  creator: { _id: string; username: string; image?: string };
  createdAt: string;
}
