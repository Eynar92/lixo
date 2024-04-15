import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req: Request) {

    // const image = req.body.get('image');

    // if (!image) {
    //     return NextResponse.error(new Error('No se proporcionó ninguna imagen'), { status: 400 });
    // }

    // const results = await cloudinary.uploader.upload(image);

    // return NextResponse.json({ ...results, status: 200 })
}