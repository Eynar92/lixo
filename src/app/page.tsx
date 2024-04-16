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

  const [imageSrc, setImageSrc] = useState();
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


      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzib8jnnl/image/upload`, {
          method: 'POST',
          body: formData
        });

        // const response = await axios.post(`https://api.cloudinary.com/v1_1/dzib8jnnl/image/upload`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data', // Asegura que el tipo de contenido sea multipart/form-data
        //   },
        //   params: {
        //     upload_preset: upload_preset,
        //     public_id: public_id,
        //     api_key: api_key,
        //   },
        // });

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

  }, [imageSrc]);

  const handleOnCapture = () => {
    const image = webcamRef.current?.getScreenshot();
    image && setImageSrc(image);
  }

  const handleResetImage = () => {
    setImageSrc(null)
  }

  const handleSaveImage = async () => {
    const response = await fetch('/api/cloudinary/upload', {
      method: 'GET',
      // body: JSON.stringify({
      //   imageSrc
      // })
    })

    console.log(response.json);

  }

  return (
    <main className="py-4 layout h-dvh">
      <Container>
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageSrc(e.target.files[0])}
        /> */}
        <div className="w-full sm:w-[500px] mt-0 mx-auto mb-8">
          <div className="relative aspect-auto bg-black">
            <button
              className='absolute top-0 right-0 bg-gray-100/50 size-6 text-center rounded-full'
              onClick={handleResetImage}
            >
              X
            </button>
            <div className="m-auto">
              {
                imageSrc ? (
                  <img src={imageSrc} alt="Image" className="block w-full h-auto" />
                ) : (
                  <Webcam
                    ref={webcamRef}
                    screenshotQuality={1}
                    videoConstraints={videoConstraints}
                  />
                )
              }
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[500px] mx-auto">
          <ul className="flex justify-between">
            <li>
              <Button
                onClick={handleOnCapture}
              >
                Tomar Foto
              </Button>
            </li>
            <li>
              <Button
                className="bg-green-100 text-green-700 hover:bg-green-200"
                onClick={handleSaveImage}
              >
                Guardar Foto
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </main>
  );
}
