import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ENDPOINTS } from "../../api/api_constants";
import { useGetById, usePatch } from "../../hooks/useBaseEndpointQueries";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

function Teams() {

    
    
    return (
        <div className="relative flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white duration-300 ease-in-out">
            <Sidebar />
            <main>

            </main>
        </div>
    );
}

export default Teams;