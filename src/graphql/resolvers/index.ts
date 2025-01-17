import type { Resolvers } from '@/types/graphql/codegen/resolvers.js'
import { NonEmptyStringResolver } from 'graphql-scalars'
import { makeRes } from '@/utils/helper.js'
import { Code } from '@/types/graphql/codegen/resolvers.js'
import { getImageInfo } from '@/utils/handleFile.js'

const resolvers: Resolvers = {
  NonEmptyString: NonEmptyStringResolver,
  Mutation: {
    async uploadPersonPic(
      parent,
      { id, pic },
      {
        token,
        getPersonPic,
        addPersonPic,
        deleteImage,
      },
    ) {
      if (!token)
        return makeRes(false, Code.Error, 'Usuario no autenticado: Credenciales de acceso no proporcionadas.')

      const imgInfo = await getImageInfo(pic)
      if (!imgInfo)
        return makeRes(false, Code.Error, 'La foto tiene un formato desconocido.')

      const prevPic = await getPersonPic(id, token)
      const newPic = await addPersonPic(id, imgInfo, token)
      if (!newPic) return makeRes(false, Code.Error, 'La foto no se logró guardar.')

      if (prevPic) deleteImage(prevPic.id, token)
      return makeRes(true, Code.Success, 'Se guardó la foto', { uploaded: newPic })
    },
  },
}

export default resolvers
