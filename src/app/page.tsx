'use client';
import { useEffect, useRef, useState } from 'react'
import { Button, Container } from "@/components";
import Webcam from "react-webcam";

const videoConstraints = {
  height: 1080,
  width: 1920,
  aspectRatio: 0.5625,
  facingMode: "environment"
}

export default function Home() {

  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const public_id = process.env.CLOUDINARY_PUBLIC_ID!;
  const api_key = process.env.CLOUDINARY_API_KEY!;
  const api_secret = process.env.CLOUDINARY_API_SECRET!;

  const [imageSrc, setImageSrc] = useState<File | null>();
  const [url, setUrl] = useState('');
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (!imageSrc) return;
    (async function run() {

      const formData = new FormData();
      formData.append('file', imageSrc);
      formData.append('upload_preset', upload_preset);
      // formData.append('public_id', public_id);
      formData.append('api_key', api_key);
      formData.append('api_secret', api_secret);

      console.log(cloud_name);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzib8jnnl/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setUrl(data.url);
        console.log('Upload successful:', data);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    })();
    console.log(imageSrc);

  }, [imageSrc]);



  return (
    <main className="py-4 layout h-dvh">
      <Container>
        <input
          type="file"
          accept="image/*"
          capture='user'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageSrc(file);
            }
          }}
        />
        {
          imageSrc && (
            <img src={URL.createObjectURL(imageSrc)} alt='Image' className='max-h-52 w-auto' />
          )
        }

      </Container>
    </main>
  );
}
