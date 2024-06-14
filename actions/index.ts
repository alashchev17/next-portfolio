/* eslint-disable no-console */
'use server'

import { users } from '@/database/users'
import { sdk } from '@/lib/client'

export const login = async (values: {
  email: string
  password: string
}): Promise<
  | {
      message: string
      field: 'email' | 'password'
    }
  | undefined
> => {
  const currentUser = users.find((user) => user.email === values.email.trim().toLowerCase())
  if (!currentUser) {
    return Promise.resolve({
      message: 'User not found',
      field: 'email',
    })
  }

  if (currentUser.password !== values.password) {
    return Promise.resolve({
      message: 'Invalid password',
      field: 'password',
    })
  }

  return Promise.resolve(undefined)
}

export const addSkillset = async (
  formData: FormData
): Promise<{ message: string; field: 'title' | 'description' | 'image' } | undefined> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as File

  const assetResponse = await sdk.createAsset({ fileName: image.name })

  if (assetResponse.errors) {
    return Promise.resolve({
      message: 'Some error occurred while uploading this image. Try other image or contact support',
      field: 'image',
    })
  }

  const formDataToUpload = new FormData()

  formDataToUpload.append('X-Amz-Date', assetResponse.data.createAsset?.upload?.requestPostData?.date as string)
  formDataToUpload.append('key', assetResponse.data.createAsset?.upload?.requestPostData?.key as string)
  formDataToUpload.append('X-Amz-Signature', assetResponse.data.createAsset?.upload?.requestPostData?.signature as string)
  formDataToUpload.append('X-Amz-Algorithm', assetResponse.data.createAsset?.upload?.requestPostData?.algorithm as string)
  formDataToUpload.append('policy', assetResponse.data.createAsset?.upload?.requestPostData?.policy as string)
  formDataToUpload.append('X-Amz-Credential', assetResponse.data.createAsset?.upload?.requestPostData?.credential as string)
  formDataToUpload.append('X-Amz-Security-Token', assetResponse.data.createAsset?.upload?.requestPostData?.securityToken as string)
  formDataToUpload.append('file', image as File)

  const uploadResponse = await fetch(assetResponse.data.createAsset?.upload?.requestPostData?.url as string, {
    method: 'POST',
    body: formDataToUpload,
  })

  if (!uploadResponse.ok) {
    await sdk.deleteAsset({ assetId: assetResponse.data.createAsset?.id as string })
    return Promise.resolve({
      message: 'Some error occured while uploading this image. Try other image or contact support.',
      field: 'image',
    })
  }

  // Create Skillset with its Asset

  const createSkillsetResponse = await sdk.createSkillset({
    skillsetName: title,
    skillsetDescription: description,
    assetId: assetResponse.data?.createAsset?.id as string,
  })

  // Publish Skillset and its Asset

  try {
    await sdk.publishSkillset({ skillsetId: createSkillsetResponse.data?.createSkillset?.id as string })
  } catch (e) {
    // deleting draft asset and skillset if publish failed
    await sdk.deleteAsset({ assetId: assetResponse.data.createAsset?.id as string })
    await sdk.deleteSkillset({ skillsetId: createSkillsetResponse.data.createSkillset?.id as string })

    return Promise.resolve({
      message: 'Some error occurred while publishing this skillset. Try again or contact support',
      field: 'image',
    })
  }

  try {
    await sdk.publishAsset({ assetId: assetResponse.data.createAsset?.id as string })
  } catch (e) {
    // deleting draft asset and skillset if publish failed
    await sdk.deleteAsset({ assetId: assetResponse.data.createAsset?.id as string })
    await sdk.deleteSkillset({ skillsetId: createSkillsetResponse.data.createSkillset?.id as string })

    return Promise.resolve({
      message: 'Some error occurred while publishing image for this skillset. Try again or contact support',
      field: 'image',
    })
  }

  return Promise.resolve(undefined)
}
