import { API } from 'aws-amplify'
import { ListPostsQuery, Post } from '@/API'
import PostCreate from './_components/post/PostCreate'
import PostView from './_components/post/PostView'

import { listPosts } from '@/graphql/queries'

async function getPosts(): Promise<Post[]> {
  try {
    const postsResponse = await API.graphql({ query: listPosts }) as { data: ListPostsQuery }
    return (postsResponse.data.listPosts?.items || []) as Post[]
  } catch (err) {
    console.log(err);
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostCreate />
      {posts.map((post, idx) => (
        <PostView
          key={idx}
          post={post}
        />
      ))}
    </main>
  )
}
