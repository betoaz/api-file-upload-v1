import fs from 'fs'
import path from 'path'
import { v4 as randomID } from 'uuid'
import sharp from 'sharp'
import mime from 'mime'
import type { Maybe, ImgUploadInput } from '../types/graphql/codegen/resolvers.js'
import logger from '@/utils/logger.js'

export type FileInfo = {
  filename: string
  mimetype: string
  encode: string
}
export type ImgInfo = FileInfo & {
  description?: Maybe<string>
}

export const dirname = path.join(process.cwd(), 'uploads')

export const createDirectory = (path: string): void => {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

export const getImageInfo = async (
  { file, description }: ImgUploadInput,
): Promise<Maybe<ImgInfo>> => {
  const { name, encode } = file
  const ext = name.split('.').pop()?.toLowerCase()
  if (!ext) return null

  const id = randomID()
  const outputPath = path.join(dirname, `${id}.${ext}`)
  const mimetype = mime.getType(outputPath)
  if (!mimetype) return null

  const imgMimetypes = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg']
  if (!imgMimetypes.includes(mimetype)) return null

  try {
    createDirectory(dirname)
    fs.writeFileSync(outputPath, encode, { encoding: 'base64' })
    const imageProcessor = sharp(outputPath)
    const img = imageProcessor.resize(160, 192).webp()
    const newOutputPath = path.join(dirname, `${id}.webp`)

    await img.toFile(newOutputPath)
    const buffer = fs.readFileSync(newOutputPath)

    fs.rmSync(outputPath, { force: true })
    fs.rmSync(newOutputPath, { force: true })

    const info: ImgInfo = {
      filename: `${name.split('.')[0]}.webp`,
      mimetype: 'image/webp',
      encode: buffer.toString('base64'),
      description,
    }
    return info
  } catch (error) {
    const err = error as Error
    logger.error('getImageInfo: %s', err.message)
  }

  return null
}
