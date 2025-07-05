import { DtoLugar } from "../../../tips-viajeros/entities/DtoLugar"

export interface BlogPostList {
  id: string
  nombre: string
  name_route: string
  summary: string
  author: string
  date: string
  imageUrl: string
  category: string
  tags: { value: string }[]
  readTime: string
  rating: string
  ratingMP: string
  views: string
  featured: boolean
  status: string
  created_at: string
  lugarId: string
  lugarDesc: string
}


export class BlogPostDto {
  id: string
  nombre: string
  name_route: string
  summary: string
  content: string
  author: string
  date: string
  imageUrl: string
  category: string
  tags: { value: string }[]
  readTime: string
  rating: number
  ratingMP: number
  views: string
  featured: boolean
  fotos: { value: string }[]
  tips: { value: string }[]
  highlights: { value: string }[]
  status: string
  created_at: string
  lugarId: string
  lugar: DtoLugar
}
