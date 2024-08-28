'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@radix-ui/themes';
const UploadPage = () => {
  return (
    <CldUploadWidget uploadPreset="fqhyhvby">
  {({ open }) => {
    return (
      <Button  onClick={() => open()}>
        Upload an Image
      </Button>
    );
  }}
</CldUploadWidget>
  )
}

export default UploadPage