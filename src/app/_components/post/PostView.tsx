import { Post } from '@/API'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


import {
  CircleIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import { format, parseISO } from 'date-fns'

type IProps = {
  post: Post
}

export default function PostView({ post }: IProps) {
  return (
    <Card className="w-full">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {post.story}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            #nuevo-evento
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
          <div>{format(parseISO(post?.createdAt || ''), 'LLLL, yyyy')}</div>
        </div>
      </CardContent>
    </Card>
  )
}
