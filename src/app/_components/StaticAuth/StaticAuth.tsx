import Image from 'next/image'
import React from 'react'

export default function StaticAuth() {
    return (
        <>
            <div className=' bg-bgSecondary col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 py-10 px-10  md:rounded-tr-[100px] md:rounded-br-[100px] rounded-br-[50px] rounded-bl-[50px]  shadow-2xl'>
                <h2 className='text-5xl font-bold'>Welcome to</h2>
                <h1 className='text-5xl font-bold text-primaryDark my-5'>Elevate</h1>
                <p className='font-medium text-lg'>Quidem autem voluptatibus qui quaerat aspernatur <br /> architecto natus</p>

                <Image width={408} height={434.59} src={'/bro.png'} alt={"bro.png"} />
            </div>
        </>
    )
}
