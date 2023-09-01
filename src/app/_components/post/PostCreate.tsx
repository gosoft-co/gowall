"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { API } from 'aws-amplify'
import { createPost } from '@/graphql/mutations'
import { CreatePostMutation } from '@/API'

import { Amplify } from 'aws-amplify'
import awsExports from '@/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })


const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  story: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(500, {
      message: "Title must not be longer than 30 characters.",
    }),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
  title: "",
  story: ""
}

export default function postCreate() {
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(form: FormValues) {
    try {
      await API.graphql({
        query: createPost,
        variables: {
          input: {
            ...form
          }
        }
      }) as { data: CreatePostMutation }

    } catch (errors) {
      console.error(errors)
      //throw new Error(errors[0].message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <input
          type="text"
          placeholder='Escribe una publicación...'
          className="border radius p-2 w-full"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Título de la publicación</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="story"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Publicación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Que quieres escribir...?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Crear</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
