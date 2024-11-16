"use server";

import { DJANGO_API_ENDPOINT } from "@/config/defaults";
import { NextResponse } from "next/server";
import ApiProxy from "@/app/api/proxy";

const DJANGO_API_BUSINESS_PROFILE_URL = `${DJANGO_API_ENDPOINT}/business/profile`;
const DJANGO_API_BUSINESS_UPDATE_PROFILE_IMAGE_URL = `${DJANGO_API_ENDPOINT}/business/profile`
const DJANGO_API_BUSINESS_UPDATE_PROFILE_URL = `${DJANGO_API_ENDPOINT}/business/business_updated`

interface ErrorResponse {
    error: string;
}

export async function GET(request: Request) {
    try {
        const { data, status }: { data: any; status: number } = await ApiProxy.get(DJANGO_API_BUSINESS_PROFILE_URL, true);
        return NextResponse.json<any>(data, { status });
    } catch (error) {
        console.error("Error fetching business:", error);
        return NextResponse.json<ErrorResponse>({ error: "Failed to fetch business" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const endpoint = DJANGO_API_BUSINESS_UPDATE_PROFILE_IMAGE_URL;

    // Create FormData from the incoming request's form data
    const formData = await request.formData();
    // const file = formData.get('profile_image') as File;
    const file: File | null  = formData.get('file') as File;
    console.log("Form data:", formData);
    console.log("File:", file);

    try {
        // Send FormData to Django API using ApiProxy
        const { data, status }: { data: any; status: number } = await ApiProxy.post(endpoint, formData, true);
        
        return NextResponse.json(data, { status });
    } catch (error) {
        console.error("Error updating business:", error);
        return NextResponse.json({ error: "Failed to update business" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const endpoint = DJANGO_API_BUSINESS_UPDATE_PROFILE_URL;

    const requestData = await request.json();

    try {
        const { data, status }: { data: any; status: number } = await ApiProxy.put(endpoint, requestData, true);
        return NextResponse.json<any>(data, { status });
    } catch (error) {
        console.error("Error updating business:", error);
        return NextResponse.json<ErrorResponse>({ error: "Failed to update business" }, { status: 500 });
    }
}
