'use client';
// ** Hooks && Tools
import { Suspense } from 'react';
// ** Page
import Home from './Home';


function Page() {
    return (
        <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#17191D] text-[#E3E5E8]">
                Loading workflow...
            </div>
        }>
            <Home />
        </Suspense>
    );
}

export default Page;