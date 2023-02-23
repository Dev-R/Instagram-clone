<template>
    <div class="bg-black">
        <section class="container max-w-full mx-auto text-center">
            <div class="pt-5 grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div class="xl:col-span-2 col-span-1 bg-black md:block hidden space-y-12 relative h-screen sticky top-0 border-r border-gray-900">
                    <!-- A -->
                    <div class="flex flex-col space-y-4 flex-nowrap sticky top-0">
                        <!-- A -->
                        <div class="p-4 rounded-lg flex cursor-pointer xl:justify-start justify-center">

                            <!-- Large Icon -->
                            <svg aria-label="Instagram" class="xl:block hidden" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                height="29" role="img" viewBox="32 4 113 32" width="103">
                                <path clip-rule="evenodd"
                                    d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                                    fill="currentColor" fill-rule="evenodd">
                                </path>
                            </svg>

                            <!-- Small Icon -->
                            <svg aria-label="Instagram" class="xl:hidden block" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path
                                    d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z">
                                </path>
                            </svg>        

                        </div>
                        <!-- B -->
                        <div class="p-1 flex flex-col space-y-2">
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Home" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z">
                                    </path>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-bold text-white">
                                    Home
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Search" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"></path>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Search
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Explore" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <polygon fill="none"
                                        points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"></polygon>
                                    <polygon fill-rule="evenodd"
                                        points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                                    <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Explore
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Reels" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                                        x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line>
                                    <path
                                        d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                                        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"></path>
                                    <path
                                        d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                                        fill-rule="evenodd"></path>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Reels
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Direct" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                    height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22"
                                        x2="9.218" y1="3" y2="10.083"></line>
                                    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                        stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Messages
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="Notifications" class="group-hover:scale-110" color="rgb(245, 245, 245)"
                                    fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                                    </path>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Notifications
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <svg aria-label="New post" class="group-hover:scale-110" color="rgb(245, 245, 245)"
                                    fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                                        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"></path>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                                </svg>
                                <span class="xl:block hidden font-sans text-md font-light text-white">
                                    Create
                                </span>
                            </div>
                            <div class="group cursor-pointer rounded-full flex space-x-4 hover:bg-slate-1000 hover:delay-100 p-3 xl:justify-start justify-center">
                                <img src="http://via.placeholder.com/26x26" class="w-6 h-6 rounded-full shadow-lg">
                                <span class="xl:block hidden font-sans text-md font-light text-white">
                                    Profile
                                </span>
                            </div>
                        </div>
                        <!-- Temp-solution -->
                        <div class="pt-10 invisible">
                            A
                        </div>
                        <!-- C -->
                        <div class="cursor-pointer pt-10 rounded-full flex space-x-4 absolute inset-x-0 -bottom-80 ">
                            <svg aria-label="Settings" class="group-hover:scale-110" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)"
                                height="24" role="img" viewBox="0 0 24 24" width="24">
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line>
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line>
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line>
                            </svg>
                            <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    More
                            </span>
                        </div>
                    </div>
                    
                </div>

                <!-- Center: Posts -->
                <div class="lg:col-span-6 lg:grid md:col-span-6 md:col-start-4 col-span-12 bg-black">
 
                    <div class="md:h-[85px] md:w-[470px] flex flex-col space-y-4 flex-nowrap lg:w-[470px] justify-self-end lg:mr-[64px]">

                        <!-- Stories -->
                        <div class="mb-6 flex snap-x space-x-2 justify-evenly">


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/cat">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    RabiRx
                                </span>
                            </div>
                            
                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/dog">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    Mohaed
                                </span>
                            </div>


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/car">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    Alex
                                </span>
                            </div>


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/snow">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    iiSaloomz
                                </span>
                            </div>

                            <!-- <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/bottle">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    TalalAz
                                </span>
                            </div>


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/mouse">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    Mustaffa
                                </span>
                            </div> -->




                        </div>

                        <!-- Posters -->
                        <div class="p-4 rounded-lg flex justify-start flex-col justify-start justify-center bg-gray-500 shadow-lg  space-y-4">
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>1</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>2</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>3</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>4</span>
                            </div>

                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>5</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>6</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>7</span>
                            </div>
                            <div class="p-4 rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg space-x-2">
                                <img src="http://via.placeholder.com/26x26">
                                <span>8</span>
                            </div>        
                        </div>
                    </div>
                </div>

                <!-- Right bar: Suggestions -->
                <div class="col-span-4 bg-black lg:block hidden w-80">
                    <div class="flex flex-col space-y-4 flex-nowrap top-0 w-80">
                        
                        <!-- A -->
                        <div class="rounded-lg flex items-center space-x-2">
                            <div class="flex-inital">
                                <img src="https://loremflickr.com/56/56" class="w-14 h-14 rounded-full">
                            </div>
                            <div class="flex-inital ">
                                <span class="font-sans text-sm font-semibold text-white">
                                    hot_souce_56
                                </span>
                            </div>
                            <div class="flex-inital grow grid">
                                <span class="font-sans text-xs text-sky-500 justify-self-end">
                                    Switch
                                </span>
                            </div>
                        </div>

                        <!-- B.1 -->
                        <div class="rounded-lg flex items-center space-x-2">
                            <div class="flex-inital">
                                <span class="font-sans text-sm font-semibold text-gray-400">
                                    Suggestions for you
                                </span>
                            </div>
                            <div class="flex-inital grow grid">
                                <span class="font-sans text-xs text-white justify-self-end">
                                    See All
                                </span>
                            </div>
                        </div>

                        <!-- B.2 -->
                        <div class="flex flex-col">

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">
                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/cat" class="w-8 h-8 rounded-full">
                                </div>
                                <div class="flex flex-inital flex-col">
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        CS50
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Followed by brianyu28 + 2 more
                                    </span>
                                </div>
                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>
                            </div>

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">
                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/dog" class="w-8 h-8 rounded-full">
                                </div>
                                <div class="flex flex-inital flex-col">
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        yasir.qadhi
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Popular
                                    </span>
                                </div>
                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>
                            </div>

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">
                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/cat" class="w-8 h-8 rounded-full">
                                </div>
                                <div class="flex flex-inital flex-col">
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        drhaifaayounis
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Followed by imamomarsuleiman
                                    </span>
                                </div>
                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- C -->
                        <div class="flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 self-start flex-wrap">
                            <li class="list-none">About</li>
                            <li>Help</li>
                            <li>Press</li>
                            <li>API</li>
                            <li>Jobs</li>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>Locations</li>
                            <li>Language</li>
                        </div>

                        <!-- D -->
                        <div class="flex font-sans text-xs font-semibold text-gray-500 self-start">
                            <span>
                                © 2023 INSTAGRAM FROM META
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        onMounted(() => {
            // console.log('Mounted Home')
        })

        return {}
    }
})
</script>



<style>

</style>