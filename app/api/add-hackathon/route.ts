import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

export async function POST(req:NextRequest){
    const formData = await req.formData();

    const name= formData.get('name') as string;
    const location= formData.get('location') as string;
    const date= formData.get('date') as string;
    const type= formData.get('type') as string;
    const prize= formData.get('prize') as string;
    const image= formData.get('image') as File| null
    const link= formData.get('link') as string


    if(!name || !location || !date || !type || !prize || !image || !link){
        return NextResponse.json({error: 'Missing required fields.'}, {status: 400});
    }

    let image_url= null

    if(image){
        const fileExt = image.name.split('.').pop();
        const fileName= `hackathons/${Date.now()}.${fileExt}`;

        const {data,error}= await supabase.storage
        .from('hackathon-images').upload(fileName, image,{
            contentType: image.type,
        });

        if(error){
            console.error('Upload error: ',error.message);
            return NextResponse.json({error: 'Image upload failed.'},{status: 500});
        }

        const{data: publicUrlData} = supabase.storage.from('hackathon-images').getPublicUrl(fileName);

        image_url= publicUrlData?.publicUrl || null;
    }

    const {error: insertError}= await supabase.from('hackathons').insert([{name,location, date, type, prize, image_url, link}]);

    if(insertError){
        return NextResponse.json({error: insertError.message}, {status: 500})
    }

    return NextResponse.json({message: "Successfully Uploaded"},{status:200})

}