'use server'

import { users } from '@/database/users'
import { sdk } from '@/lib/client'
import { revalidatePath } from 'next/cache'

import type { CreateProjectMutation } from '@/generated/graphql'

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

export const updateSkillset = async (
  formData: FormData,
  skillsetId: string
): Promise<{
  message?: string
  field?: 'title' | 'description'
  newData?: { title: string; description: string }
}> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  // Updating skillset data
  try {
    await sdk.updateSkillset({
      skillsetId,
      skillsetName: title,
      skillsetDescription: description,
    })
  } catch (e) {
    return Promise.resolve({
      message: 'Some error occurred while updating this skillset. Try again or contact support',
      field: 'title',
    })
  }

  // Publishing current skillset

  try {
    await sdk.publishSkillset({ skillsetId })
  } catch (e) {
    return Promise.resolve({
      message: 'Some error occurred while publishing this skillset. Try again or contact support',
      field: 'title',
    })
  }

  revalidatePath(`/dashboard/skills/edit/${skillsetId}`)
  return Promise.resolve({
    newData: { title, description },
  })
}

export const addProject = async (
  formData: FormData
): Promise<{ message: string; field: 'title' | 'description' | 'details' | 'link' | 'image' } | undefined> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const details = formData.get('details') as string
  const link = formData.get('link') as string
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

  // Creating a new project based on received formData from form and its Asset

  let createProjectResponseData = {} as NonNullable<CreateProjectMutation['createProject']>

  try {
    const createProjectResponse = await sdk.createProject({
      projectName: title,
      projectDescription: description,
      projectDetails: details,
      projectLink: link,
      assetId: assetResponse.data?.createAsset?.id as string,
    })
    if (createProjectResponse.data.createProject) {
      createProjectResponseData = createProjectResponse.data.createProject
    }
  } catch (e) {
    return Promise.resolve({
      message: 'Some error occurred while creating this project. Try again or contact support',
      field: 'image',
    })
  }

  // Publish Project and its Asset

  if (createProjectResponseData) {
    try {
      await sdk.publishProject({ projectId: createProjectResponseData.id as string })
    } catch (e) {
      // deleting draft asset and project if publish failed
      await sdk.deleteAsset({ assetId: assetResponse.data.createAsset?.id as string })
      await sdk.deleteProject({ projectId: createProjectResponseData?.id as string })

      return Promise.resolve({
        message: 'Some error occurred while publishing this project. Try again or contact support',
        field: 'image',
      })
    }
  }

  if (createProjectResponseData) {
    try {
      await sdk.publishAsset({ assetId: assetResponse.data.createAsset?.id as string })
    } catch (e) {
      // deleting draft asset and skillset if publish failed
      await sdk.deleteAsset({ assetId: assetResponse.data.createAsset?.id as string })
      await sdk.deleteProject({ projectId: createProjectResponseData?.id as string })

      return Promise.resolve({
        message: 'Some error occurred while publishing image for this project. Try again or contact support',
        field: 'image',
      })
    }

    return Promise.resolve(undefined)
  }
}

export const updateProject = async (
  formData: FormData,
  projectId: string
): Promise<{
  message?: string
  field?: 'title' | 'description' | 'details' | 'link'
  newData?: { title: string; description: string; details: string; link: string }
}> => {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const details = formData.get('details') as string
  const link = formData.get('link') as string

  // Updating project data
  try {
    await sdk.updateProject({
      projectId,
      projectName: title,
      projectDescription: description,
      projectDetails: details,
      projectLink: link,
    })
  } catch (e) {
    return Promise.resolve({
      message: 'Some error occurred while updating this project. Try again or contact support',
      field: 'title',
    })
  }

  // Publishing current project

  try {
    await sdk.publishProject({ projectId })
  } catch (e) {
    return Promise.resolve({
      message: 'Some error occurred while publishing this project. Try again or contact support',
      field: 'title',
    })
  }

  revalidatePath(`/dashboard/projects/edit/${projectId}`)
  return Promise.resolve({
    newData: { title, description, details, link },
  })
}
