/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import StaticAuth from "@/app/_components/StaticAuth/StaticAuth";
import axios from "axios";
import { useFormik } from "formik";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { redirect, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

interface userOptions {
    username: string,
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    rePassword: string,
}

export default function register() {
    const router = useRouter();



    
    const [Error , setError] = useState(null)

    const validationSchema = Yup.object({
        firstName: Yup.string().required("firstname is required"),
        lastName: Yup.string().required("lastName is required"),
        username: Yup.string().required("username is required"),
        phone: Yup.string()
            .required("phone is required")
            .matches(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                "phone must be valid"
            ),
        email: Yup.string()
            .required("email is required")
            .email("email must be valid"),
        password: Yup.string()
            .required("password is required")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "password must contain uppercase letter , number , lower case letter  and atleast 8 chars"
            ),
        rePassword: Yup.string()
            .required("rePassword is required")
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .oneOf([Yup.ref("password")], "password dont match"),
    });

    async function onSubmit(values: userOptions) {
        try {

            const options = {
                url: 'https://exam.elevateegy.com/api/v1/auth/signup',
                method: 'POST',
                data: values
            }
            console.log(values);

            const res = await axios.request(options)
            console.log(res);
            
            if (res.data.message == 'success') {
                router.push('/login')
            }
        } catch (error:any) {
            setError(error.response.data.message)
            console.log(Error);
            
        }

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit,
    });

    return (
        <>
            <div className="grid grid-cols-12">
                <StaticAuth />

                <div className=" col-span-12 sm:col-span-12 md:col-span-6 p-10">
                    <div className="flex md:justify-end justify-center md:pe-10">
                        <select>
                            <option value="">English</option>
                            <option value="">Atabic</option>
                        </select>
                        <Link
                            href={"/register"}
                            className="text-primary border border-[#E0E0E9] rounded-[15px] px-8 py-1 text-[20px]"
                        >
                            Register
                        </Link>
                        <Link
                            href={"/login"}
                            className="text-primary px-8 py-1 text-[20px]"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="flex justify-center items-start h-full flex-col md:ps-10">
                        <div className="gap-8 w-full lg:w-[65%] md:ps-10">
                            <h3 className="font-semibold text-[25px] my-5">Sign up</h3>
                            {Error ? <p className="text-red-600">{Error}</p> : ''}

                            <form onSubmit={formik.handleSubmit} className="mx-auto">
                                <div className="w-full flex flex-col items-center">

                                    <div className=" w-full mb-6">
                                        <input
                                            type="text"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName &&
                                            <p className='text-red-600'>{formik.errors.firstName}</p>
                                        }

                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="text"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.lastName && formik.errors.lastName &&
                                            <p className='text-red-600'>{formik.errors.lastName}</p>
                                        }
                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="text"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="username"
                                            name="username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.username && formik.errors.username &&
                                            <p className='text-red-600'>{formik.errors.username}</p>
                                        }
                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="tel"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="Phone"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.phone && formik.errors.phone &&
                                            <p className='text-red-600'>{formik.errors.phone}</p>
                                        }
                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="email"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="Email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email &&
                                            <p className='text-red-600'>{formik.errors.email}</p>
                                        }
                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="password"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="Password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                        {formik.touched.password && formik.errors.password &&
                                            <p className='text-red-600'>{formik.errors.password}</p>
                                        }
                                    </div>
                                    <div className=" w-full mb-6">
                                        <input
                                            type="password"
                                            className="h-[55px] p-2 rounded-[10px] border-2 w-full shadow-sm bg-[#f9f9f9]"
                                            placeholder="Confirm Password"
                                            name="rePassword"
                                            value={formik.values.rePassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.rePassword && formik.errors.rePassword &&
                                            <p className='text-red-600'>{formik.errors.rePassword}</p>
                                        }
                                    </div>

                                    <p>
                                        Already have an account ?{" "}
                                        <Link href={"/login"} className="text-primary">
                                            login
                                        </Link>
                                    </p>
                                    <button type="submit" className="bg-primary text-white my-4 py-3 rounded-full w-full">
                                        Create Account
                                    </button>
                                </div>
                            </form>

                            <div className=" flex gap-3 items-center justify-center mt-8">
                                <div className="h-[1px] bg-[#E7E7E7] w-24"></div>
                                <p> or Continue with</p>
                                <div className=" h-[1px] bg-[#E7E7E7] w-24"></div>
                            </div>
                            <div className="flex mt-3 gap-5 justify-center">
                                <div className="flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt="google"
                                        src={"/GoogleLogo.png"}
                                    />
                                </div>
                                <div className="flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt="google"
                                        src={"/TwitterLogo.png"}
                                    />
                                </div>
                                <div className="flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt="google"
                                        src={"/FacebookLogo.png"}
                                    />
                                </div>
                                <div className="flex justify-center items-center hover:shadow-lg border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt="google"
                                        src={"/AppleLogo.png"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
